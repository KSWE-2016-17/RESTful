var express = require('express'),
    cors = require('cors'),
    app = express(),
    http = require('http').Server(app),
    config = require('./app/config.js');

var port = process.env.PORT || 8080,
    chatPort = 3000,
    mongodb = process.env.MONGO_DB || config.mongodb,
    mongoose = require('mongoose'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    jwt = require('express-jwt'),
    routes = require('./app/routes'),
    io = require('socket.io')(http);

// enable all cors requests
app.use(cors());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// set json pretty format: 2 in development, 0 in production
app.set('json spaces', 2);

// authentication
app.use(jwt({
    audience: config.auth.clientID,
    issuer: 'https://' + config.auth.domain + '/',
    secret: new Buffer(config.auth.clientSecret, 'base64')
}));
app.use(require("./app/middlewares/authusercheck"));

// routes
app.use('/', routes);

// error handling
app.use(require("./app/middlewares/errors"));

// chat
require("./app/chat.js")(io);

// db connect and create server
mongoose.Promise = global.Promise;
mongoose.connect(mongodb, function (err) {
    if (err) {
        console.log('Unable to connect to Mongo.');
        process.exit(1)
    } else {

        app.listen(port);
        console.log('listen to port ' + port);

        http.listen(chatPort, function () {
            console.log('listening chat on *:' + chatPort);
        });

    }
});