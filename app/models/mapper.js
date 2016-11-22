var config = require("../config.js");

exports.convertUserToJsonResponse = function (user) {
    return {
        id:          user._id,
        displayName: user.displayName,
        email:       user.email,
        picture:     user.picture,
        address:     user.address,
        ratings:     config.apiDomain + "/" + user._id + "/ratings"
    }
};

exports.convertUserRatingToJsonResponse = function (rating) {
    return {
        task:       config.apiDomain + "/tasks/" + rating.task,
        isExecutor: rating.isExecutor,
        value:      rating.value,
        comment:    rating.comment
    }
};