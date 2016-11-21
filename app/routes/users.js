const users     = require('express').Router();

var validate    = require('express-jsonschema').validate,
    validScheme = require('../helper/validjsonscheme'),
    UserModel   = require('../models/users');

// Middleware
users.param('id', function (req, res, next, id) {

    var userId = req.params.id;

    UserModel.findById("582c5174a954ee04b3feaebe", function (err, user) {

        if (err) {
            next(err);
        } else if (user) {
            res.locals.user = user;
            next();
        } else {
            next(new Error('failed to load user'));
        }

    });

});

// Users
users.route('/')
    .get(function (req, res) {
        UserModel.findAll(function (err, users) {
            res.send(users);
        });
    });

// User
users.route('/:id')
    .get(function (req, res) {
            res.send(res.locals.user)
        }
    )
    .delete(function (req, res) {
            res.send("User Delete");
        }
    );

// Rating
users.route('/:id/rating')
    .get(function (req, res) {
        res.send("Rating: userId = " + res.locals.user._id);
    })
    .post(validate({body: validScheme.postRating}), function (req, res) {

        UserModel.saveRatingFromJson(req.body, function (err) {
            res.send("Rating Post")
        });

    })
    .delete(function (req, res) {
        res.send("Rating Delete")
    });


module.exports = users;