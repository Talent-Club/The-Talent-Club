const q = require('q');
const router = require('express').Router();
const Member = require('../models/member.model');
var helper = require('sendgrid').mail;
const sendGridAPI = process.env.SENDGRID_API_KEY;

const myEmail = process.env.MYEMAIL;
const appEmail = process.env.APP_EMAIL;
const congrats = process.env.CONGRATULATIONS_TEMPLATE;

function congratsEmail(member) {
  let defer = q.defer();
  
  var fromEmail = new helper.Email(appEmail);
  var toEmail = new helper.Email(member.email);
  var subject = 'You are in the Club!';
  var content = new helper.Content('text/html', ' ');
  var mail = new helper.Mail(fromEmail, subject, toEmail, content);
  mail.setTemplateId(congrats);

  var personalization = new helper.Personalization();
  personalization.addTo(toEmail);
  personalization.addSubstitution({
    '%name%': member.firstName
  });
  personalization.addSubstitution({
    '%memberId%': member._id
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
        defer.resolve('Sendgrid sent email');
      } else {
        defer.reject(JSON.stringify(res));
      }
    });
    return defer.promise;
  });
};

//GET: /api/
router.get('/', function (req, res) {
  Member.find({}).then(function (members) {
    res.json(members);
  });
});

router.get('/:id', (req, res) => {
  Member.findOne({
    '_id': req.params.id
  }, 'firstName lastName email linkedIn isMember', function (err, member) {
    res.json(member);
  });
});

// UPDATE
router.put('/:id', function (req, res) {
  Member.findByIdAndUpdate({
      '_id': req.params.id
    }, {
      $set: {
        isMember: true
      }
    }, {
      new: true
    },
    function (err, member) {
      if (err) return handleError(err);
      res.send(member);
      console.log(member);
      congratsEmail(member);
    });
});

// DELETE
router.delete('/:id', function (req, res) {
  Member.findByIdAndRemove({
    '_id': req.params.id
  }, function (err, member) {
    if (err) return handleError(err);
    res.send(member);
  });
});


module.exports = router;
