const router = require('express').Router();
const Users = require('../models/user');
const auth = require('../controller/auth.js')

router.get('/', function (req, res) {
    res.send('User endpoint');
});

/**
 *  Find user
 */
router.post('/find', function (req, res) {
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
/**
 * User create login and authentication
 */
router.post('/add', function (req, res) {
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

/**
 * verify the user token
 */
router.post('/user/verify', function (req, res) {
    const token = req.body.token
    JWT.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        return res.sendStatus(200);
    })
})

module.exports = router;