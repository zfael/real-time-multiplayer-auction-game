/** Module responsible to handle with auction routes */
module.exports = function () {
    var controller = require('../controller/auctionController');
    var express = require('express');
    var router = express.Router();

    var job = require('../auctionJob');

    /**
     * function that adds new auction
     * @param {Object} req - http request
     * @param {Object} res - http response
     * @param {Object} next - next middleware
     */
    var newAuction = function (req, res, next) {
        controller
            .newAuction(req.body)
            .then(function (auction) {
                res.json(auction);
            })
            .catch(function (err) {
                res.status(400).send({
                    message: err.message
                });
            });
    };

    /**
     * function that gets the active auction
     * @param {Object} req - http request
     * @param {Object} res - http response
     * @param {Object} next - next middleware
     */
    var getActive = function (req, res, next) {
        controller
            .getActive()
            .then(function (auction) {
                res.json(auction);
            })
            .catch(function (err) {
                res.status(400).send({
                    message: err.message
                });
            });
    };

    /**
     * function that enters a new bid
     * @param {Object} req - http request
     * @param {Object} res - http response
     * @param {Object} next - next middleware
     */
    var enterNewBid = function (req, res, next) {
        controller
            .enterNewBid(req.body)
            .then(function (auction) {
                res.json(auction);
            })
            .catch(function (err) {
                res.status(400).send({
                    message: err.message
                });
            });
    };

    router.post('/', newAuction);
    router.get('/active', getActive);
    router.put('/', enterNewBid);

    return router;
};