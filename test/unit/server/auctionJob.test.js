var q = require('q');
var config = require('config');
var chai = require('chai');
var sinon = require('sinon');
var sandboxed = require('sandboxed-module');

var sandbox = sinon.sandbox.create();
var expect = chai.expect;
var mod;

var auctionControllerStub = {};
var ioStub = {};

describe('Auction Job', function () {

    beforeEach(function () {

        auctionControllerStub.getActive = sandbox.stub();
        auctionControllerStub.updateProfiles = sandbox.stub();

        ioStub.emit = sandbox.stub();

        //setting to 1 iteration;
        config.job.totalIterarion = 1;

        mod = sandboxed.require('../../../lib/auctionJob.js', {
            requires: {
                './controller/auctionController': auctionControllerStub,
                'config': config
            }
        })(ioStub);
    });

    afterEach(function () {
        sandbox.reset();
        sandbox.restore();
    });

    it('mod should not be undefined', function () {
        expect(mod).to.be.an('object');
    });

    it('mod should have correct exported functions', function () {
        expect(mod.start).to.be.an('function');
        expect(mod.stop).to.be.an('function');
        expect(mod.job).to.be.an('function');
    });


    it('should execute the whole job if there is no active auction', function () {
        return mod.job()
            .then(function (result) {
                expect(result).to.be.equal('no active auction');
                expect(auctionControllerStub.getActive.calledOnce).to.be.equal(true);
                expect(auctionControllerStub.updateProfiles.callCount).to.be.equal(0);
                expect(ioStub.emit.callCount).to.be.equal(0);
            });
    });

    it('should execute the job normally if there is active auction', function () {

        auctionControllerStub.updateProfiles.returns(q.resolve());
        auctionControllerStub.getActive.returns({
            winningBid: 50
        });

        return mod.job()
            .then(function (result) {

                expect(auctionControllerStub.getActive.calledTwice).to.be.equal(true);
                expect(auctionControllerStub.updateProfiles.calledOnce).to.be.equal(false);

                expect(ioStub.emit.callCount).to.be.equal(1);
                expect(ioStub.emit.firstCall.calledWith('updateAuction', {
                    auction: {
                        winningBid: 50
                    },
                    time: 1
                })).to.be.equal(true);
            });
    });

    it('should update the profiles when auction ends and also notify front', function () {
        auctionControllerStub.updateProfiles.returns(q.resolve({
            test: 'test'
        }));
        auctionControllerStub.getActive.returns({
            winningBid: 50
        });

        return mod.job()
            .then(function() {
                return mod.job();
            })
            .then(function(result) {
                expect(auctionControllerStub.getActive.callCount).to.be.equal(3);
                expect(auctionControllerStub.updateProfiles.calledOnce).to.be.equal(true);
                
                expect(ioStub.emit.callCount).to.be.equal(3);
                expect(ioStub.emit.getCall(2).calledWith('winner', {test:'test'})).to.be.equal(true);
            });
    });
});