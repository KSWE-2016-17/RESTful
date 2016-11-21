const users = require('express').Router();
var TinyTaskDB = require("tinytaskdb");

// Middleware
users.param('id', function (req, res, next, id) {

    var userId = req.params.id;

    TinyTaskDB.User.findOne({'_id': "582c5174a954ee04b3feaebe"}, function (err, user) {

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
        TinyTaskDB.User.find({}, function (err, users) {
            var userMap = {};

            users.forEach(function (user) {
                userMap[user._id] = user;
            });

            res.send(userMap);
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
    .post(function (req, res) {
        res.send("Rating Post")
    })
    .delete(function (req, res) {
        res.send("Rating Delete")
    });


module.exports = users;