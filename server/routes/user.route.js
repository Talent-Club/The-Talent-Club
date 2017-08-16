const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Promise = require('bluebird');
const db = require('../models/member.model');
const requiresAuth = require('../lib/requiresAuth');

router.post('/login', login);

module.exports = router;

// function register(req, res, next) {
//     if(!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
//         res.status(400).json({ errors: ['Please enter all required fields']});
//     } else {
//         const newMember = new db({
//             firstName: req.body.firstName,
//             lastName: req.body.lastName,
//             email: req.body.email,
//             password: req.body.password,
//         });

//         newMember
//             .save()
//             .then(() => res.json({ message: 'Successfully registered new member' }))
//             .catch(err => {
//                 if(err.code && err.code === 11000) {
//                     res.status(400).send({ 'errors': ['Email already registered'] });
//                 } else {
//                     next(err);
//                 }
//             });
//     }
// }

function login(req, res, next) {
    let promiseA = Member.findOne({ email: req.body.email }).exec();
    let promiseB = promiseA.then(member => member.comparePassword(req.body.password));

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
