var config = require("../config.js");

exports.convertUserToJsonResponse = function (user) {

    var api = config.apiDomain + "/" + user._id;

    return {
        id:          user._id,
        displayName: user.displayName,
        email:       user.email,
        picture:     user.picture,
        address:     user.address,
        ratings:     api + "/ratings"
    }
};

exports.convertUserRatingToJsonResponse = function (rating) {

    var api = config.apiDomain + "/tasks/";

    return {
        task:       api + rating.task,
        isExecutor: rating.isExecutor,
        value:      rating.value,
        comment:    rating.comment
    }
};

exports.convertTaskToJsonResponse = function(task){

    var api = config.apiDomain + "/tasks/" + task._id;

    return {
        _id:            task._id,
        createdBy:      task.createdBy,
        assignedTo:     task.assignedTo,
        name:           task.name,
        description:    task.description,
        payment:        task.payment,
        applications:   api + "/applications",
        starts:         task.starts,
        position:       api + "/position"
    }
};

exports.convertApplicationToJsonResponse = function(application){

    var api = config.apiDomain + "/users/";

    return {
        user:   api + application.user,
        comment: application.comment
    };

};