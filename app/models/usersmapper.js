var config = require("../config.js");

exports.convertUserToJsonResponse = function (user) {
    return {
        id: user._id,
        displayName: user.displayName,
        email: user.email,
        picture: user.picture,
        address: user.address,
        ratings: config.apiDomain + "/" + user._id + "/rating"
    }
};