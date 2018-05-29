"use strict";

/**
 * Model for users table
 * @param {Object} sequelize instance
 * @param {*} DataTypes 
 */
module.exports = function (sequelize, DataTypes) {
    var Model = sequelize.define("users", {
        userName: {
            type: DataTypes.STRING(30),
            primaryKey: true
        },
        coins: {
            type: DataTypes.DOUBLE,
            allowNull: false
        }
    });
    
    return Model;
};