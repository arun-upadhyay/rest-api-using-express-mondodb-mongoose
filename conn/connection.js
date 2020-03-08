const URI = "mongodb://heroku_cddmrvc8:vu88vm1mj46pl18m2m1gn4knsv@ds249787.mlab.com:49787/heroku_cddmrvc8";
/**
 * For local machine
 * const URI =  "mongodb://127.0.0.1/api_service"
 */

const connection = require('mongoose').createConnection(URI,
    {useNewUrlParser: true, useUnifiedTopology: true});
module.exports = connection;