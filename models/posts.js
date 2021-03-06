const mongoose = require('mongoose');
const connection = require('../conn/connection');
/**
 * Posts model
 */
const Posts = connection.model('Post', new mongoose.Schema({
        title: {
            type: String
        },
        description: {
            type: String
        }
    }, {collection: 'Post'})
);

module.exports = Posts;
