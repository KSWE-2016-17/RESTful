var TinyTaskDB  = require("tinytaskdb"),
    mapper      = require('./mapper');

exports.findById = function (id, cb) {
    TinyTaskDB.Task.findOne({'_id': id}, function (err, task) {
        cb(err, mapper.convertTaskToJsonResponse(task));
    });
};

exports.findAll = function (cb) {
    TinyTaskDB.Task.find({}, function (err, tasks) {
        var taskMap = {};

        tasks.forEach(function (task) {
            taskMap[task._id] = mapper.convertTaskToJsonResponse(task);
        });

        cb(err, taskMap)
    });
};

exports.filterBy = function (filter, cb) {

    // TODO filter

    TinyTaskDB.Task.find({}, function (err, tasks) {
        var taskMap = {};

        tasks.forEach(function (task) {
            taskMap[task._id] = mapper.convertTaskToJsonResponse(task);
        });

        cb(err, taskMap)
    });
};


exports.saveFromJson = function (userid, json, cb) {

    TinyTaskDB.Task.findOne().sort('-_id').exec(function (err, item) {

        if (err) return cb(err, null);

        var id = (err) ? 1 : ++item._id;

        var newTask = new TinyTaskDB.Task({
            _id: id,
            createdBy: userid,
            assignedTo: null,
            name: json.name,
            description: json.description,
            payment: json.payment,
            position: {
                latitude: json.position.latitude,
                longitude: json.position.longitude
            },
            starts: json.starts
        });

        newTask.save(function (err, model) {
            if (err) return cb(err, null);
            return cb(err, model._id);
        });

    });

};

exports.deleteById = function (id, cb) {
    TinyTaskDB.Task.findByIdAndRemove(id, cb);
};

exports.updateFromJson = function (taskid, json, cb) {

    TinyTaskDB.Task.findOneAndUpdate(
        {'_id': taskid},
        {$set: json},
        function (err, task) {
            if (err) return cb(err, null);
            return cb(err, task);
        });
};


exports.findPosition = function (id, cb) {

    TinyTaskDB.Task.findOne({'_id': id}, function (err, task) {
        if (err) {
            cb(err, null);
        } else {
            cb(err, {
                'lat': task.position.latitude,
                'lng': task.position.longitude
            });
        }
    });

};

exports.findApplications = function (id, cb) {

    TinyTaskDB.Task.findOne({'_id': id}, function (err, task) {
        if (err) {
            cb(err, null);
        } else {

            var applicationMap = {};

            applicationMap["results"] = task.applications.length;
            applicationMap["applications"] = [];
            task.applications.forEach(function (application) {
                applicationMap["applications"].push(mapper.convertApplicationToJsonResponse(application))
            });

            cb(err, applicationMap);
        }
    });

};