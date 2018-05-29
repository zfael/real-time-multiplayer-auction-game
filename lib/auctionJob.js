var q = require('q');
var config = require('config');
var controller = require('./controller/auctionController');

/**
 * This module is responsible to handle the auction job which validade the auction reamaining time.
 * @param {Object} io - socket.io reference 
 */
module.exports = function (io) {
    var found = false;
    var iteration = config.job.totalIterarion;
    var intervalObj;
    var lastBid;

    /** function that will start the job */
    var start = function () {
        intervalObj = setInterval(job, config.job.tick);
    };

    /** function that stop the job */
    var stop = function () {
        clearInterval(intervalObj);
    };

    /** function that will be called by interval above */
    function job() {
        return checkIfExists()
            .then(function () {
                return controller.getActive();
            })
            .then(function (result) {
                io.emit('updateAuction', {
                    auction: result,
                    time: iteration
                });
                iteration--;

                if (iteration <= 10) {

                    //checking if current winning bit is geater than last winning bid
                    if (lastBid && result.winningBid > lastBid) {
                        //if so, update the time to 10
                        iteration = 10;
                    }
                }
                lastBid = result.winningBid;

                return updateProfiles();
            })
            .then(function () {

            })
            .catch(function () {
                iteration = config.job.totalIterarion;
                return "no active auction";
            });
    }

    /** function that will update the information on seller and buyer users. */
    function updateProfiles() {
        if (iteration < 0) {
            return controller.updateProfiles()
                .then(function (winner) {

                    //omit the winner to connected clients
                    io.emit('winner', winner);
                });
        }
    }

    /** function that checks if exists active auction */
    function checkIfExists() {

        var promise;

        if (found) {
            promise = q.resolve(true);
        } else {
            promise = controller.getActive();
        }

        return q.all([promise])
            .spread(function (result) {
                if (result) {
                    found = true;
                    return q.resolve();
                } else {
                    found = false;
                    return q.reject();
                }
            });
    }

    return {
        start: start,
        stop: stop,
        job: job
    };
};