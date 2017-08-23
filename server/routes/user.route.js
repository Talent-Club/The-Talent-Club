const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Promise = require('bluebird');
const db = require('../models/member.model');
const requiresAuth = require('../lib/requiresAuth');

router.post('/', login);

module.exports = router;


function login(req, res, next) {
    let promiseA = db.findOne({ email: req.body.email }).exec();
    let promiseB = promiseA.then(member => member && member.comparePassword(req.body.password));

    Promise
        .all([
            promiseA,
            promiseB
        ])
        .then(([member, isMatch]) => {
            if(isMatch) {
                res.json({
                    token: jwt.sign({
                        sub: member._id
                    }, process.env.AUTHKEY, { expiresIn: '365 days' })
                });
            } else {
                res.status(400).json({
                    errors: ['Email or password incorrect']
                });
            }
        })
        .catch(next);
}
