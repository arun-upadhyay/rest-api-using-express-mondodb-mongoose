// express


const express = require('express');
const JWT = require('jsonwebtoken');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("tiny"));

//*** Database setup ****
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

const Users = connection.model('User', new mongoose.Schema({
        username: {
            type: String
        },
        password: {
            type: String
        }
    }, {collection: 'User'})
);


// **** End of database setup ****

app.get('/', (req, res) => res.send(`Supported endpoint = /posts, /posts/:id', methods = GET, PUT, DELETE, POST`))

// get all posts
app.get('/posts', authenticateToken, (req, res) => {
    Posts.find()
        .then(records => {
            res.send(records)
        }).catch(err => {
        res.status(500).send({
            message: `${err.message} occurred while fetching records`
        })
    })

})


app.get('/posts/:_id', authenticateToken, (req, res) => {


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
app.post('/posts', authenticateToken, function (req, res) {
    const post = new Posts({
        'title': req.body.title,
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

})

// update record by Id
app.put('/posts', authenticateToken, function (req, res) {
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

app.delete('/posts', authenticateToken, function (req, res) {
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

/**
 * User create login and authentication
 */
let auth = require('./controller/auth.js')
// saving data
app.post('/user/add', function (req, res) {
    console.log("data is here-------" + req.body.username + req.body.password)
    const user = new Users({
        'username': req.body.username,
        'password': req.body.password
    })
    user.save()
        .then(record => {
            res.send({
                id: record._id,
                token: auth.signIn(record)
            })
        }).catch(err => {
        res.send({
            message: `${err.message} occurred while saving data`
        })
    })

})

app.post('/user/find', function (req, res) {
    let data = {
        'username': req.body.username,
        'password': req.body.password
    }
    Users.findOne(data)
        .then(record => {
            if (!record) {
                return res.status(404).send({
                    id: '',
                    token: ''
                })
            }
            return res.send({
                id: record._id,
                token: auth.signIn(record)
            });
        }).catch(err => {
        return res.status(500).send({
            message: `${err.message} occurred while fetching record with _id ` + req.params._id
        })
    })

})

const {JWT_SECRET} = require('./config')
/**
 * verify the user token
 */
app.post('/user/verify', function (req, res) {
    const token = req.body.token
    JWT.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        return res.sendStatus(200);
    })
})

/**
 * Acts as middleware
 * @param req
 * @param res
 * @param next
 */
function authenticateToken(req, res, next) {
    //Bearer TOKEN
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        res.sendStatus(401);
    }
    JWT.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        res.user = user;
        next();
    })

}

const port = 3001;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
