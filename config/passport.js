var Auth0Strategy = require('passport-auth0').Strategy;
var TinyTaskDB = require("tinytaskdb");

var configAuth = require('./auth');

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        TinyTaskDB.User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use('auth0', new Auth0Strategy(
        {
            domain: configAuth.auth0.domain,
            clientID: configAuth.auth0.clientID,
            clientSecret: configAuth.auth0.clientSecret,
            callbackURL: configAuth.auth0.callbackURL
        },
        function (accessToken, refreshToken, extraParams, profile, done) {

            // accessToken is the token to call Auth0 API (not needed in the most cases)
            // extraParams.id_token has the JSON Web Token
            // profile has all the information from the user

            // asynchronous
            process.nextTick(function () {

                var userId = profile.id;
                var picture = profile.picture;
                var displayName = profile.nickname;

                TinyTaskDB.User.findOne({'_id': userId}, function (err, user) {

                    if (err)
                        return done(err);

                    if (!user) {

                        var newUser = new TinyTaskDB.User({
                            _id: userId,
                            token: accessToken,
                            displayName: displayName,
                            picture: picture,
                            address: ""
                        });

                        newUser.save(function (err) {
                            if (err) return done(err);
                            return done(null, newUser);
                        });

                    }
                });


            });

            return done(null, profile);
        })
    );
};
