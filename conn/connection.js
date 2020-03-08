const connection = require('mongoose').createConnection('mongodb://127.0.0.1/api_service',
    {useNewUrlParser: true, useUnifiedTopology: true});
module.exports = connection;