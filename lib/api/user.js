/** Module responsible to handle with user routes */
module.exports = function (io) {
	var userController = require('../controller/userController');
	var express = require('express');
    var router = express.Router();

    /**
     * function that login a user into the app
     * @param {Object} req - http request
     * @param {Object} res - http response
     * @param {Object} next - next middleware
     */
    var login = function(req, res, next) {
        userController
            .login(req.body)
            .spread(function(user) {
                io.emit('userLogged', req.body);
                res.json(user);
            })
            .catch(function(err) {
                res.status(400).send({
                    message: err.message
                });
            });
    };

	router.post('/login',  login);

	return router;
};