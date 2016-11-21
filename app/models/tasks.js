var TinyTaskDB = require("tinytaskdb");

exports.findById = function (id, cb) {
    TinyTaskDB.Task.findOne({'_id': "582c5174a954ee04b3feaebe"}, function (err, task) {
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