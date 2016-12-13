var users = {};
module.exports = function (io) {

    io.on('connection', function (socket) {

        socket.on('new user', function (authId, cb) {
            if (authId in users) {
                cb(false);
            } else {
                cb(true);
                socket.authId = authId;
                users[socket.authId] = socket;
            }
        });

        function validMessage(data) {
            return !(
                data.message == undefined
                || data.to == undefined
                || data.topic == undefined
            )
        }

        socket.on('send message', function (data, cb) {
            if (validMessage(data)) {
                if (data.to in users) {

                    if (data.to == socket.authId) {
                        if (cb != undefined)
                            cb("Error! Cant write with yourself!")
                    } else {

                        users[data.to].emit('new message', {
                            topic: data.topic,
                            message: data.message,
                            from: socket.authId
                        });

                    }
                } else {
                    if (cb != undefined)
                        cb('Error! User is currently not available')
                }
            } else {
                if (cb != undefined)
                    cb('Error! Message is invalid!')
            }
        });

        socket.on('disconnect', function (data) {
            if (!socket.authId) return;
            delete users[socket.authId];
        });

    });
};