var express     = require('express'),
    app         = express(),
    config      = require('./app/config.js');

var port        = process.env.PORT || 8080,
    mongodb     = process.env.MONGO_DB || config.mongodb,
    mongoose    = require('mongoose'),
    logger      = require('morgan'),
    bodyParser  = require('body-parser'),
    jwt         = require('express-jwt'),
    routes      = require('./app/routes');

// database
mongoose.Promise = global.Promise;
mongoose.connect(mongodb);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// set json pretty format: 2 in development, 0 in production
app.set('json spaces', 2);

// authentication
app.use(jwt({
    audience:   config.auth.clientID,
    issuer:     'https://' + config.auth.domain + '/',
    secret:     new Buffer(config.auth.clientSecret, 'base64')
}));
app.use(require("./app/middlewares/authusercheck"));

// routes
app.use('/', routes);

// error handling
app.use(require("./app/middlewares/errors"));

app.listen(port);
console.log('listen to port ' + port);