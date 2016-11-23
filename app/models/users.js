var TinyTaskDB  = require("tinytaskdb");
var mapper      = require("./mapper");

exports.findById = function (id, cb) {
    TinyTaskDB.User.findOne({'_id': id}, function (err, user) {
        if (!err && user) {
            cb(err, mapper.convertUserToJsonResponse(user))
        } else {
            cb(err, null);
        }
    });
};

exports.findAll = function (cb) {
    TinyTaskDB.User.find({}, function (err, tasks) {
        var taskMap = {};

        tasks.forEach(function (task) {
            taskMap[user._id] = mapper.convertUserToJsonResponse(task);
        });

        cb(err, taskMap);
    });
};

exports.deleteById = function (id, cb) {
    TinyTaskDB.User.findByIdAndRemove(id, cb);
};

exports.saveFromJson = function (body, cb) {

    console.log(body);
    cb(null);

};

exports.saveRatingFromJson = function (id, json, cb) {

    TinyTaskDB.Task.findById(json.taskid, function (err, task) {

        if(err) return cb(err, null);

        TinyTaskDB.User.findByIdAndUpdate(
            id, {
                $push: {
                    "ratings": {
                        task: json.taskid,
                        isExecutor: (task.assignedTo === id),
                        value: json.value,
                        comment: json.comment
                    }
                }
            },
            {
                safe: true, upsert: true, new: true
            },
            function (err, model) {
                if(err) return cb(err, null);
                return cb(err, model.ratings)
            }
        );
    });

};

exports.loadRatings = function (id, cb) {

    TinyTaskDB.User.findOne({'_id': id}, function (err, user) {

        if(err){
            cb(err, null)
        }else {

            var ratingMap = {};

            ratingMap["results"] = user.ratings.length;
            ratingMap["ratings"] = [];
            user.ratings.forEach(function (rating) {
                ratingMap["ratings"].push(mapper.convertUserRatingToJsonResponse(rating))
            });

            cb(err, ratingMap);

        }

    });

};