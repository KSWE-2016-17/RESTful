const routes = require('express').Router();

routes.use('/users', require('./users'));
routes.use('/tasks', require('./tasks'));

routes.get('/', function (req, res) {
    res.status(200).json({message: 'Connected!'});
});

module.exports = routes;