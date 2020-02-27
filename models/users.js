const mongoose = require('mongoose');

//Set up default mongoose connection
var connection = mongoose.createConnection('mongodb://127.0.0.1/api_service',
    {useNewUrlParser: true, useUnifiedTopology: true})

const Users = connection.model('user', new mongoose.Schema({
        username: {
            type: String
        },
        password: {
            type: String
        }
    }, {collection: 'User'})
);

module.exports = Users;
