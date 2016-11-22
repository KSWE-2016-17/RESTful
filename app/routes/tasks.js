const tasks         = require('express').Router();
var TinyTaskDB      = require("tinytaskdb"),
    config          = require("../config.js"),
    TaskModel       = require('../models/tasks'),
    validate        = require('express-jsonschema').validate,
    validScheme     = require('../helper/validjsonscheme');

var taskId = null;

// Middleware
tasks.param('id', function (req, res, next, id) {

    taskId = req.params.id;

    TaskModel.findById(taskId, function (err, task) {
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

    })
    .post(validate({body: validScheme.postTask}), function (req, res) {



    });

// Task
tasks.route('/:id')
    .get(function (req, res) {
        res.send(res.locals.task);
    })
    .put(validate({body: validScheme.putTask}), function (req, res) {

    })
    .delete(function (req, res) {

    });

// Position
tasks.route('/:id/position')
    .get(function (req, res) {
        TaskModel.findPosition(taskId, function (err, position) {
            if (err) {

            } else {
                res.send(position);
            }
        });
    });

// Applications
tasks.route('/:id/applications')
    .get(function (req, res) {
        res.send(res.locals.task);
    });



module.exports = tasks;