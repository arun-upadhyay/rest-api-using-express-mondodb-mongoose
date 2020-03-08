const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("tiny"));

<<<<<<< HEAD
//*** Database setup ****
const mongoose = require('mongoose');

var uristring =
    process.env.MONGODB_URI ||
    'mongodb://localhost/post_collections';

//Set up default mongoose connection
var connection = mongoose.createConnection(uristring,
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
// **** End of database setup ****

=======
>>>>>>> 0e432aff179322d08f412f720803b316746fb9e5
app.get('/', (req, res) => res.send(`Supported endpoint = /posts, /posts/:id', methods = GET, PUT, DELETE, POST`))

app.use('/user', require('./routes/user'));
app.use('/posts', require('./routes/posts'));

<<<<<<< HEAD
app.delete('/posts', function (req, res) {
    let _id = req.body._id;
    Posts.findByIdAndRemove(_id, {useFindAndModify: false})
        .then(record => {
            if (!record) {
                return res.status(404).send({
                    message: `Record not found with _id = ${_id}`
                })
            }
            return res.send({
                _id: `${_id}`,
                message: `Record deleted with _id = ${_id}`
            })
        }).catch((err) => {
        return res.status(500).send({
            message: `${err.message} occurred while deleting record with _id = ${_id}`
        })
    })
})
const port = process.env.PORT ||  3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
=======
const port = 3001;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
>>>>>>> 0e432aff179322d08f412f720803b316746fb9e5
