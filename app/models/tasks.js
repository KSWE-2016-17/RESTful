var TinyTaskDB = require("tinytaskdb");

exports.findById = function (id, cb) {
    TinyTaskDB.Task.findOne({'_id': id}, function (err, task) {
        cb(err, task);
    });
};

exports.findAll = function (cb) {
    TinyTaskDB.Task.find({}, function (err, users) {
        cb(err, users)
    });
};

exports.saveFromJson = function (body, cb) {

    console.log(body);
    cb(null);

};

exports.findPosition = function (id, cb) {

    cb(null, json({
        'lat': 50.232423424234,
        'lng': 42.342849203492
    }));

};