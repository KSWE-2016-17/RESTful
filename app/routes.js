var TinyTaskDB = require("tinytaskdb");

module.exports = function (app, passport) {

    app.get('/', function (req, res) {
        res.render('index.ejs');
    });


    app.get('/login',
        passport.authenticate('auth0', {}), function (req, res) {
            res.redirect("/");
        }
    );

    app.post('/login',
        passport.authenticate('auth0', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        })
    );

    app.get('/login/callback',
        passport.authenticate('auth0', {failureRedirect: '/login'}),
        function (req, res) {
            if (!req.user) {
                throw new Error('user null');
            }
            res.redirect("/");
        }
    );

    app.get('/users', function (req, res) {
        TinyTaskDB.User.find({}, function (err, users) {
            var userMap = {};

            users.forEach(function (user) {
                userMap[user._id] = user;
            });

            res.send(userMap);
        });
    });

    app.get('/users/:id', isLoggedIn, function (req, res) {
            var userId = req.params.id;
            TinyTaskDB.User.findOne({'_id': userId}, function (err, user) {

                if (err)
                    return done(err);

                res.send(user);

            });
        }
    );


    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
