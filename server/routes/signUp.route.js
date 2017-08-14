// REST ACTIONS performed on RESOURCES

const router = require('express').Router();
const db = require('../models/member.model');
var helper = require('sendgrid').mail;
const sendGridAPI = process.env.SENDGRID_API_KEY;
const email = process.env.EMAIL;


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

module.exports = router;
