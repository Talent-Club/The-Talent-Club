const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

var mongodbUri = 'mongodb://Keaton:talentclub1@ds133670.mlab.com:33670/talent-club';
mongoose.connect(mongodbUri, { useMongoClient: true });

const Member = mongoose.model('Member', {
  firstName: String,
  lastName: String,
  email: String,
  username: String,
  password: String,
  isMember: Boolean,
  phoneNumber: String,
  jobTitle: String,
  hasPaid: Boolean,
  socialNetworks: [
      { name: String,
          url: String }
    ]
});

app.use(express.static(path.resolve('dist')));
app.use(bodyParser.json());
app.use('/api', require('./routes'));

app.post('/talent-club', function (req, res) {
  console.log(req.body);
  const newMember = new Member(req.body);
  
   newMember.save(function(err) {
       if(err) {
           res.send('an error has occured: ' + err)
       } else {
           res.send('Yes')
       }
  });
});

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/../dist/index.html`);
});

module.exports = app;
