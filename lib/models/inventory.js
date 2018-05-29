"use strict";

/**
 * Model for inventory table
 * @param {Object} sequelize instance
 * @param {*} DataTypes 
 */
module.exports = function (sequelize, DataTypes) {
    var Model = sequelize.define("inventory", {
        userId: {
            type: DataTypes.STRING(30),
            primaryKey: true
        },
        itemId: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    });
    
    return Model;
};