const router = require('express').Router();
const Posts = require('../models/posts');
const auth = require('../controller/auth.js')


/**
 * Get all posts
 */
router.get('/', auth.authenticateToken, (req, res) => {
    Posts.find()
        .then(records => {
            res.send(records)
        }).catch(err => {
        res.status(500).send({
            message: `${err.message} occurred while fetching records`
        })
    })
})

/**
 * Get post by id
 */
router.get('/:_id', auth.authenticateToken, (req, res) => {
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
/**
 * Add a new post.
 *
 */
router.post('/', auth.authenticateToken, function (req, res) {
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

/**
 *  Update record by Id
 */

router.put('/', auth.authenticateToken, function (req, res) {
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

/**
 *  Delete post by id
 */
router.delete('/', auth.authenticateToken, function (req, res) {
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


module.exports = router;