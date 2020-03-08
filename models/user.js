const mongoose = require('mongoose');
const connection = require('../conn/connection');
/**
 * User model
 */
const User = connection.model('User', new mongoose.Schema({
        username: {
            type: String
        },
        password: {
            type: String
        }
    }, {collection: 'User'})
);


module.exports = User;
