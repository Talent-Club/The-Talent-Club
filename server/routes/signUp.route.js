// REST ACTIONS performed on RESOURCES

const router = require('express').Router();
const db = require('../models/member.model');
var helper = require('sendgrid').mail;
const sendGridAPI = process.env.SENDGRID_API_KEY;

const myEmail = process.env.MYEMAIL;
const newAppTemp = process.env.NEWAPP_TEMPLATE;
const appEmail = process.env.APP_EMAIL;

router.post('/', function (req, res) {
    console.log(req.body);
    const newMember = new db(req.body);

    newMember.save(function (err) {
        if (err) {
            res.send('an error has occured: ' + err)
        } else {
            res.send('Yes')
        }
    });
});

// const email = process.env.EMAIL; 
const requiresAuth = require('../lib/requiresAuth');
const jwt = require('jsonwebtoken');
const Promise = require('bluebird');


function signUpEmail(member) {

    var fromEmail = new helper.Email(appEmail);
    var toEmail = new helper.Email(myEmail);
    var subject = 'A new application has been submitted!';
    var content = new helper.Content('text/html', ' ');
    var mail = new helper.Mail(fromEmail, subject, toEmail, content);
    mail.setTemplateId(newAppTemp);

    var personalization = new helper.Personalization();
    personalization.addTo(toEmail);
    personalization.addSubstitution({
        '%name%': member.firstName
    });
    personalization.addSubstitution({
        '%url%': member.socialNetworks[0].url
    });
    personalization.addSubstitution({
        '%email%': member.email
    });

    mail.addPersonalization(personalization);



    var sg = require('sendgrid')(sendGridAPI);
    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
    });

    sg.API(request, function (err, res) {
        if (err) {
            res.statusCode(400).send('Something happened, its not you its us.')
            console.log(err);
        } else {
            console.log('Email is on the way');
            res.status(200).send('ok');
        }
    });
};

router.post('/', function register(req, res, next) {
    console.log(req.body);
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
});

router.get('/:id', (req, res) => {
    db.findOne({
        '_id': req.params.id
    }, 'firstName lastName jobTitle email socialNetworks', function (err, member) {
        res.json(member);
        signUpEmail(member);        
    });

});
module.exports = router;
