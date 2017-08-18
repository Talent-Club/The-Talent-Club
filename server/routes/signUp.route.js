// REST ACTIONS performed on RESOURCES

const router = require('express').Router();
const db = require('../models/member.model');
var helper = require('sendgrid').mail;
const sendGridAPI = process.env.SENDGRID_API_KEY;
const email = process.env.EMAIL;
const requiresAuth = require('../lib/requiresAuth');
const jwt = require('jsonwebtoken');
const Promise = require('bluebird');

router.get('/', function (req, res) {

    var fromEmail = new helper.Email('reply@talentclub.com');
    var toEmail = new helper.Email(email);
    var subject = 'A new application has been submitted!';
    var content = new helper.Content('text/plain', 'A new applicant wants to join the Talent Club!');
    var mail = new helper.Mail(fromEmail, subject, toEmail, content);

    var sg = require('sendgrid')(sendGridAPI);
    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
    });

    sg.API(request, function (error, response) {
        if (error) {
            console.log('Error response received');
        }
        console.log(response.statusCode);
        console.log(response.body);
        console.log(response.headers);
        res.send('ok')
    });
});

router.post('/', function register(req, res, next) {
        if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
            res.status(400).json({
                errors: ['Please enter all required fields']
            });
        } else {
            const newMember = new db({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
            });

            newMember
                .save()
                .then(() => res.json({
                    message: 'Successfully registered new user'
                }))
                .catch(err => {
                    if (err.code && err.code === 11000) {
                        res.status(400).send({
                            'errors': ['Email already registered']
                        });
                    } else {
                        next(err);
                    }
                });
        }
    }
);

module.exports = router;
