'use strict';

var q = require('q');
var config = require('config');
var models = require('../models');
var userController = require('./userController');

/**
 * function that will query database in order to return the inventory of user
 * @param {Object} payload - request params
 */
var getAllByUser = function (payload) {

    var findObject = {
        attributes: [
            "quantity"
        ],
        order: [
            ['itemId', 'ASC']
        ],
        where: {
            userId: payload.id
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
    };

    return models
        .inventory
        .findAll(findObject);
};

/**
 * function that will update the information of seller and buyer
 * @param {Object} auction  - auction information
 */
var updateProfiles = function (auction) {
    return updateSeller(auction)
        .then(function () {
            return updateWinner(auction);
        })
        .then(function() {
            return userController.updateProfiles(auction);
        });
};

/**
 * function that will update seller information into the database
 * @param {Object} auction - auction information
 */
function updateSeller(auction) {
    return models
        .inventory
        .find({ where: { userId: auction.userId, itemId: auction.item.id } })
        .then(function (project) {
            if (project) {
                return project.updateAttributes({
                    quantity: (project.quantity - auction.quantity)
                });
            } else {
                return q.resolve();
            }
        });
}

/**
 * function that will update buyer information into the database
 * @param {Object} auction - auction information
 */
function updateWinner(auction) {
    return models
        .inventory
        .find({ where: { userId: auction.winningUser, itemId: auction.item.id } })
        .then(function (project) {
            if (project) {
                return project.updateAttributes({
                    quantity: (project.quantity + auction.quantity)
                });
            } else {
                return q.resolve();
            }
        });
}

module.exports = {
    getAllByUser: getAllByUser,
    updateProfiles: updateProfiles
};