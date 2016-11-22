const users = require('express').Router();

var validate = require('express-jsonschema').validate,
    validScheme = require('../helper/validjsonscheme'),
    UserModel = require('../models/users'),
    config = require('../config');

var userId = null;

// Middleware
users.param('id', function (req, res, next, id) {

    userId = req.params.id;

    UserModel.findById(userId, function (err, user) {

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
            UserModel.deleteById(userId, function (err) {
                if (err) {
                    res.status(400).json({
                        "status": "error",
                        "message": err.message
                    })
                } else {
                    res.json({
                        "status": "ok"
                    })
                }
            })
        }
    );

// Rating
users.route('/:id/ratings')
    .get(function (req, res) {

        UserModel.loadRatings(userId, function (err, ratings) {
            if (err) {
                res.status(400).json({
                    "status": "error",
                    "message": err.message
                })
            } else {
                res.send(ratings);
            }
        });

    })
    .post(validate({body: validScheme.postRating}), function (req, res) {

        UserModel.saveRatingFromJson(userId, req.body, function (err, rating) {
            if (err) {
                res.status(400).json({
                    "status": "error",
                    "message": err.message
                })
            } else {
                console.log(rating);
                res.json({
                    "status": "ok"
                })
            }
        });

    });


module.exports = users;