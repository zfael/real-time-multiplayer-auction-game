'use strict';

var q = require('q');
var config = require('config');
var models = require('../models');

/**
 * function that will check user's information into the database
 * @param {Object} payload - user information
 */
var login = function (payload) {

    return models
        .users
        .findOrCreate({
            where: {
                userName: payload.userName
            },
            defaults: {
                userName: payload.userName,
                coins: config.user.initialCoin
            }
        })
        .spread(function(user, created) {

            if (created) {
                return [user, initialItems(user)];
            } else {
                return q.resolve([user]);
            }            
        });
};

/**
 * function that will insert initial items of a new user
 * @param {Object} user  - information
 */
function initialItems(user) {

    var promises = config.user.initialItems.map(function(item) {
        return models.inventory.create({
            userId: user.userName,
            itemId: item.code,
            quantity: item.quantity
        });
    });

    return q.all(promises);
}

/**
 * function that will update the user information when a auction ends.
 * @param {Object} auction  - information
 */
var updateProfiles = function(auction) {
    return updateSeller(auction)
        .then(function() {
            return updateWinner(auction);
        })
        .then(function() {
            return auction;
        });
};

/**
 * function that will update the seller information when a auction ends
 * @param {Object} auction - information
 */
function updateSeller(auction) {
    return models
        .users
        .find({ where: { userName: auction.userId } })
        .then(function(project) {
            if (project) {
                return project.updateAttributes({
                    coins: (project.coins + auction.winningBid)
                });
            } else {
                return q.resolve();
            }
        });
}

/**
 * function that will update the buyer information when a auction ends
 * @param {Object} auction - information
 */
function updateWinner(auction) {
    return models
        .users
        .find({ where: { userName: auction.winningUser } })
        .then(function(project) {
            if (project) {
                return project.updateAttributes({
                    coins: (project.coins - auction.winningBid)
                });
            } else {
                return q.resolve();
            }
        });
}

module.exports = {
    login: login,
    updateProfiles: updateProfiles
};