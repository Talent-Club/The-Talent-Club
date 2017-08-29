// REST ACTIONS performed on RESOURCES

const q = require('q');
const router = require('express').Router();
const db = require('../models/member.model');
var helper = require('sendgrid').mail;
const sendGridAPI = process.env.SENDGRID_API_KEY;

const myEmail = process.env.MYEMAIL;
const newAppTemp = process.env.NEWAPP_TEMPLATE;
const appEmail = process.env.APP_EMAIL;

// const email = process.env.EMAIL; 
const requiresAuth = require('../lib/requiresAuth');
const jwt = require('jsonwebtoken');
const Promise = require('bluebird');


function signUpEmail(newMember) {
    var fromEmail = new helper.Email(appEmail);
    var toEmail = new helper.Email(myEmail);
    var subject = 'A new application has been submitted!';
    var content = new helper.Content('text/html', ' ');
    var mail = new helper.Mail(fromEmail, subject, toEmail, content);
    mail.setTemplateId(newAppTemp);

    var personalization = new helper.Personalization();
    personalization.addTo(toEmail);
    personalization.addSubstitution({
        '%name%': newMember.firstName
    });
    personalization.addSubstitution({
        '%url%': newMember.linkedIn
    });
    personalization.addSubstitution({
        '%email%': newMember.email
    });

    mail.addPersonalization(personalization);

    var sg = require('sendgrid')(sendGridAPI);
    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
    });

    return new Promise((resolve, reject) => {
        sg.API(request, function (err, res) {
            if (res.statusCode === 202 || res.statusCode === 200) {
                resolve('Sendgrid sent email');
            } else {
                reject(JSON.stringify(res));
            }
        });
    });
};

router.post('/', function register(req, res) {
    
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
        res.status(400).json({
            errors: ['Please enter all required fields']
        });
    } else {
        const newMember = new db({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            linkedIn: req.body.linkedIn,
            password: req.body.password,
            isMember: false,
        });
        
        newMember
            .save()
            .then(signUpEmail)
            .then(() => res.json({
                message: 'Successfully registered new user'
            }))
            .catch(err => {
                console.error(err);
                res.status(400).send({
                    'errors': ['Email already registered']
                });
            });
            console.log(newMember);
    }
});

router.get('/:id', (req, res) => {
    db.findOne({
        '_id': req.params.id
    }, 'firstName lastName email linkedIn isMember', function (err, member) {
        res.json(member);
        signUpEmail(member);
    });
});

module.exports = router;
