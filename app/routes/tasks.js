const tasks     = require('express').Router();
var TinyTaskDB  = require("tinytaskdb"),
    config      = require("../config.js");

// Middleware
tasks.param('id', function (req, res, next, id) {

    var taskId = req.params.id;

    TinyTaskDB.Task.findOne({'_id': taskId}, function (err, task) {

        if (err) {
            next(err);
        } else if (task) {
            res.locals.task = task;
            next();
        } else {
            next(new Error('failed to load task'));
        }

    });

});

// Tasks
tasks.route('/')
    .get(function (req, res) {

        // Filter
        var radius = req.query.radius || config.tasks.defaultRadius;
        if (radius > config.tasks.maxRadius) {
            radius = config.tasks.maxRadius;
        }

        var startzeit = req.query.startzeit || null;

        TinyTaskDB.Task.find({}, function (err, task) {
            var taskMap = {};

            task.forEach(function (task) {
                taskMap[task._id] = task;
            });

            res.send(taskMap);
        });

    });

// Task
tasks.route('/:id')
    .get(function (req, res) {
        res.send(res.locals.task);
    });

// Position
tasks.route('/:id/position')
    .get(function (req, res) {
        res.json({
            'lat': 50.232423424234,
            'lng': 42.342849203492
        });
    });

// Applications
tasks.route('/:id/applications')
    .get(function (req, res) {
        res.send(res.locals.task);
    });


module.exports = tasks;