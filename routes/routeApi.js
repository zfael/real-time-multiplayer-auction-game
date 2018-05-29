module.exports = function (io) {
    var router = require('express').Router();
    var user = require('../lib/api/user')(io);
    var inventory = require('../lib/api/inventory')();
    var auction = require('../lib/api/auction')();

    router.use('/user', user);
    router.use('/inventory', inventory);
    router.use('/auction', auction);

    return router;
};