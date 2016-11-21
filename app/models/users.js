var TinyTaskDB = require("tinytaskdb");
var UserMapper = require("./usersmapper");

exports.findById = function (id, cb) {
    TinyTaskDB.User.findOne({'_id': "582c5174a954ee04b3feaebe"}, function (err, user) {
        cb(err, UserMapper.convertUserToJsonResponse(user));
    });
};

exports.findAll = function (cb) {
    TinyTaskDB.User.find({}, function (err, users) {
        var userMap = {};

        users.forEach(function (user) {
            userMap[user._id] = UserMapper.convertUserToJsonResponse(user);
        });

        cb(err, userMap)
    });
};

exports.saveFromJson = function (body, cb) {

    console.log(body);
    cb(null);

};

exports.saveRatingFromJson = function (body, cb) {

    console.log(body);
    cb(null)
};