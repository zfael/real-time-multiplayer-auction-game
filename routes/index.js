var path = require('path');
var express = require('express');
var auth = require('../lib/auth');
var router = express.Router();

/* GET home page. */
router.get('/', auth.login, function (req, res, next) {
  res.sendFile(path.resolve(path.join(__dirname, '..', 'public', 'index.html')));
});

module.exports = router;