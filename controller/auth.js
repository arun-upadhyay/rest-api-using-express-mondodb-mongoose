/**
 *
 * @type {{JsonWebTokenError: function(*=, *=): void, TokenExpiredError: function(*=, *): void, sign: function(*=, *=, *=, *=): (undefined|undefined), verify: function(*=, *=, *=, *=): (void), decode: function(*=, *=): (null|{payload: *, signature: *, header: *}), NotBeforeError: function(*=, *): void}}
 */
const JWT = require('jsonwebtoken');
const {JWT_SECRET} = require('../config')

module.exports = {
    signIn: user => {
        return JWT.sign({
                iss: 'postcode',
                sub: user._id,
                iat: new Date().getTime(),
                exp: Math.floor(Date.now() / 1000) + (60 * 60) // expire in 1 hour
            }, JWT_SECRET
        )
    },
    verifyToken: verifyToken = (token) => {
        JWT.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return false;
            }
            console.log(user);
            return user;
        })
    },
    authenticateToken: function (req, res, next) {
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

}