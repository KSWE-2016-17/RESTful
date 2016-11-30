module.exports = {
    'mongodb': 'mongodb://192.168.11.130/tinytask',
    'auth': {
        'domain': process.env.AUTH_DOMAIN || '',
        'clientID': process.env.AUTH_CLIENT_ID || '',
        'clientSecret': process.env.AUTH_CLIENT_SECRET || ''
    },
    'tasks': {
        'defaultRadius': 10,
        'maxRadius': 20
    }
};