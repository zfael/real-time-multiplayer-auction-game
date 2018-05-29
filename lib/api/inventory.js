/** Module responsible to handle with inventory routes */
module.exports = function () {
	var controller = require('../controller/inventoryController');
	var express = require('express');
    var router = express.Router();

    /**
     * function that gets the inventory of a user
     * @param {Object} req - http request
     * @param {Object} res - http response
     * @param {Object} next - next middleware
     */
    var getAllByUser = function(req, res, next) {
        controller
            .getAllByUser(req.params)
            .then(function(inventories) {
                res.json(inventories);
            })
            .catch(function(err) {
                res.status(400).send({
                    message: err.message
                });
            });
    };

	router.get('/user/:id',  getAllByUser);

	return router;
};