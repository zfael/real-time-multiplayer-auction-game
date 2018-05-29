"use strict";

/**
 * Model for auction table
 * @param {Object} sequelize instance
 * @param {*} DataTypes 
 */
module.exports = function (sequelize, DataTypes) {
    var Model = sequelize.define("auction", {
        sequence: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.STRING(30),
        },
        itemId: {
            type: DataTypes.INTEGER,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        minBid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        winningBid: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        winningUser: {
            type: DataTypes.STRING(30),
            allowNull: true
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1
        }
    });
    
    return Model;
};