const connection = require('mongoose').createConnection('mongodb://heroku_cddmrvc8:vu88vm1mj46pl18m2m1gn4knsv@ds249787.mlab.com:49787/heroku_cddmrvc8',
    {useNewUrlParser: true, useUnifiedTopology: true});
module.exports = connection;