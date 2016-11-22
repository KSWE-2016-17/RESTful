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
    .get(function (req, res, next) {

        // Filter
        var radius = req.query.radius || config.tasks.defaultRadius;
        if (radius > config.tasks.maxRadius) {
            radius = config.tasks.maxRadius;
        }

        var startzeit = req.query.startzeit || null;

        TaskModel.filterBy({
            radius: radius,
            starttime: startzeit
        }, function (err, users) {
            if(err){
                next(err);
            }else {
                res.send(users);
            }
        });

    })
    .post(validate({body: validScheme.postTask}), function (req, res, next) {

        var userId = req.user.sub;

        TaskModel.saveFromJson(userId, req.body, function (err, id) {

            if (err) {
                next(err)
            } else {
                res.send({taskid: id})
            }

        });

    });

// Task
tasks.route('/:id')
    .get(function (req, res) {
        res.send(res.locals.task);
    })
    .put(validate({body: validScheme.putTask}), function (req, res, next) {

        TaskModel.updateFromJson(taskId, req.body, function (err, task) {
            if (err) {
                next(err);
            } else {
                res.json({
                    "status": "ok"
                });
            }
        });

    })
    .delete(function (req, res, next) {
        TaskModel.deleteById(taskId, function (err) {
            if (err) {
                next(err)
            } else {
                res.json({
                    "status": "ok"
                })
            }
        })
    });

// Position
tasks.route('/:id/position')
    .get(function (req, res, next) {
        TaskModel.findPosition(taskId, function (err, position) {
            if (err) {
                next(err);
            } else {
                res.send(position);
            }
        });
    });

// Applications
tasks.route('/:id/applications')
    .get(function (req, res, next) {
        TaskModel.findApplications(taskId, function (err, applications) {
            if (err) {
                next(err);
            } else {
                res.send(applications);
            }
        });
    });


module.exports = tasks;