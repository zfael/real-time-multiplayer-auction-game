var path = require('path');
var express = require('express');
var auth = require('../lib/auth');
var router = express.Router();

router.get('/', auth.login, function(req, res, next) {
  var viewPath = path.resolve(path.join(__dirname, '..', 'public', 'login.html'));
  res.sendFile(viewPath);
});

module.exports = router;