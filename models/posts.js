const mongoose = require('mongoose');

//Set up default mongoose connection
var connection = mongoose.createConnection('mongodb://127.0.0.1/api_service',
    {useNewUrlParser: true, useUnifiedTopology: true})

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
