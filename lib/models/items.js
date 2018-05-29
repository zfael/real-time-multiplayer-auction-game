"use strict";

/**
 * Model for item table
 * @param {Object} sequelize instance
 * @param {*} DataTypes 
 */
module.exports = function (sequelize, DataTypes) {
    var Model = sequelize.define("item", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true            
        },
        description: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        imageUrl: {
            type: DataTypes.STRING(200),
            allowNull: false
        }
    });
    
    return Model;
};