const connection = require('mongoose').createConnection('mongodb://127.0.0.1/heroku_cddmrvc8',
    {useNewUrlParser: true, useUnifiedTopology: true});
module.exports = connection;