'use strict';

var q = require('q');
var config = require('config');
var models = require('../models');
var inventoryController = require('./inventoryController');

/**
 * Function that will check if there is a active auction and insert new auction if not exists
 * @param {Object} payload - Auction information
 */
var newAuction = function (payload) {

    return getActive()
        .then(function (project) {

            if (project) {
                return q.reject({
                    message: 'There is a auction in progress already.'
                });
            } else {
                return models
                    .auction
                    .create({
                        userId: payload.userName,
                        itemId: payload.itemId,
                        quantity: payload.quantity,
                        minBid: payload.minBid
                    });
            }
        })
        .then(function () {
            return getActive();
        });

};

/** function that will check if exists a active auction */
var getActive = function () {
    return models
        .auction
        .findOne({
            attributes: [
                "sequence",
                "userId",
                "quantity",
                "minBid",
                "winningBid",
                "winningUser",
                "active"
            ],
            where: {
                active: 1
            },
            include: [
                {
                    model: models.item,
                    as: 'item',
                    attributes: [
                        'id',
                        'description',
                        'imageUrl'
                    ]
                }
            ]
        });
};

/**
 * function that will update the database with new bid information
 * @param {Object} payload - bid information
 */
var enterNewBid = function (payload) {
    return getActive()
        .then(function (project) {

            if (project) {
                return project.updateAttributes({
                    winningUser: payload.winningUser,
                    winningBid: payload.winningBid
                });
            }
        });
};

/** function that will update the information of seller and buyer users */
var updateProfiles = function() {
    return getActive()
        .then(function(project) {
            if (project) {
                return project.updateAttributes({
                    active: false
                })
                .then(function() {
                    return inventoryController.updateProfiles(project);
                });
            } else {
                return q.resolve();
            }
        })
        .then(function(project) {
            return project;
        });
};

module.exports = {
    newAuction: newAuction,
    getActive: getActive,
    enterNewBid: enterNewBid,
    updateProfiles: updateProfiles
};