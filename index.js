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

var todoSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    type: {
        type: String
    }
}, {collection: 'todos'})

var todos = connection.model('todos', todoSchema);

const port = 3000

app.get('/', (req, res) => res.send(`Supported endpoint = /todos, /todos/:id', methods = GET, PUT, DELETE, POST`))

// get all todos
app.get('/todos', (req, res) => {
    todos.find()
        .then(records => {
            res.send(records)
        }).catch(err => {
        res.status(500).send({
            message: `${err.message} occurred while fetching records`
        })
    })

})


app.get('/todos/:id', (req, res) => {
    todos.findById(req.params.id)
        .then(record => {
            if (!record) {
                return res.status(404).send({
                    message: "Record not found. Invalid _id = ".req.params.id
                })
            }
            return res.send(record);
        }).catch(err => {
        return res.status(500).send({
            message: `${res.message} occurred while fetching record with _id ` + req.params.id
        })
    })
})

// saving data
app.post('/todos', function (req, res) {
    const newTodo = new todos({
        'id': req.body.id,
        'type': req.body.type
    })
    newTodo.save()
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
app.put('/todos', function (req, res) {
    let _id = req.body._id;
    todos.findByIdAndUpdate(_id, {
        id: req.body.id,
        type: req.body.type
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

app.delete('/todos', function (req, res) {
    let _id = req.body._id;
    todos.findByIdAndRemove(_id, {useFindAndModify: false})
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
