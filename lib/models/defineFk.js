"use strict";

var q = require('q');

var startHandler = function (sequelize) {

    return q.all([
        inventory(sequelize),
        auction(sequelize),
    ]);
};

function inventory(sequelize) {
    return q.fcall(function () {
        var inventory = sequelize.models.inventory;
        var item = sequelize.models.item;

        inventory.belongsTo(item, {as: 'item', foreignKey: 'itemId', targetKey: 'id'});

        return true;
    });
}

function auction(sequelize) {
    return q.fcall(function () {
        var auction = sequelize.models.auction;
        var item = sequelize.models.item;

        auction.belongsTo(item, {as: 'item', foreignKey: 'itemId', targetKey: 'id'});

        return true;
    });
}

module.exports = {
    start: startHandler
};