// express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// add mongoose
var mongoose = require('mongoose');
//Set up default mongoose connection
var connection = mongoose.createConnection('mongodb://127.0.0.1/api_service',
    {useNewUrlParser: true, useUnifiedTopology: true})

var schema = mongoose.Schema;

var Post = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    }
}, {collection: 'Post'})

var Posts = connection.model('Post', Post);

const port = 3000

app.get('/', (req, res) => res.send(`Supported endpoint = /posts, /posts/:id', methods = GET, PUT, DELETE, POST`))

// get all posts
app.get('/posts', (req, res) => {
    Posts.find()
        .then(records => {
            res.send(records)
        }).catch(err => {
        res.status(500).send({
            message: `${err.message} occurred while fetching records`
        })
    })

})


app.get('/posts/:_id', (req, res) => {
    Posts.findById(req.params._id)
        .then(record => {
            if (!record) {
                return res.status(404).send({
                    message: "Record not found. Invalid _id = ".req.params._id
                })
            }
            return res.send(record);
        }).catch(err => {
        return res.status(500).send({
            message: `${err.message} occurred while fetching record with _id ` + req.params._id
        })
    })
})

// saving data
app.post('/posts', function (req, res) {
    const post = new Posts({
        'title': req.body.text,
        'description': req.body.description
    })
    post.save()
        .then(record => {
            res.send({
                message: "Data saved",
                record: record
            })
        }).catch(err => {
        res.send({
            message: `${err.message} occurred while saving data`
        })
    })
    res.send("Save successfully :)")
})

// update record by Id
app.put('/posts', function (req, res) {
    let _id = req.body._id;
    Posts.findByIdAndUpdate(_id, {
        title: req.body.title,
        description: req.body.description
    }, {useFindAndModify: false})
        .then(record => {
            if (!record) {
                return res.status(404).send({message: `Record not found with _id = ${_id}`})
            }
            return res.send({message: `Record updated for _id = ${_id}`})
        })
        .catch(err => {
            return res.status(500).send({message: `${err.message} occurred while updating record with _id = ${_id}`})
        })
})

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
                message: `Record deleted with _id = ${_id}`
            })
        }).catch((err) => {
        return res.status(500).send({
            message: `${err.message} occurred while deleting record with _id = ${_id}`
        })
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
