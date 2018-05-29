var config = require('config');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

var http = require('http').Server(app)
var io = require('socket.io')(http);

var index = require('./routes/index');
var login = require('./routes/login');
var routeApi = require('./routes/routeApi')(io);

var models = require('./lib/models');

var job = require('./lib/auctionJob')(io);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', routeApi);
app.use('/login', login);
app.use('/', index);

app.use(express.static(path.join(__dirname, 'public')));

models
    .sequelize
    .sync()
    .then(function () {

        http.listen(config.port, function () {
            console.log('Express server running on port %d :)', this.address().port);

            //starting job
            job.start();
        });
    });

module.exports = app;