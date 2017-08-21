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

function signUpEmail (email, userId) {

    var fromEmail = new helper.Email(appEmail);
    var toEmail = new helper.Email(myEmail);
    var subject = 'A new application has been submitted!';
    var content = new helper.Content('text/html', ' ');
    var mail = new helper.Mail(fromEmail, subject, toEmail, content);
    mail.setTemplateId(newAppTemp);

    var personalization = new helper.Personalization();
    personalization.addTo(toEmail);
    personalization.addSubstitution({ '%name%':'Casey'});
    personalization.addSubstitution({ '%Weblink%':'https://www.linkedin.com/in/casey-ledbetter-bb4010110/'});
    personalization.addSubstitution({ '%email%':'email.com'});
    
    mail.addPersonalization(personalization);



    var sg = require('sendgrid')(sendGridAPI);
    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
    });

    sg.API(request, function (error, response) {
        if (error) {
            console.log(error);
        }
        console.log('Email is on the way');
        res.send('ok');
    });
};

module.exports = router;
