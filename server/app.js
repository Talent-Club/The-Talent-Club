const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_TEST_KEY);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');


const app = express();

const db = require('./models/member.model');

var mongodbUri = 'mongodb://Keaton:talentclub1@ds133670.mlab.com:33670/talent-club';
mongoose.connect(mongodbUri, { useMongoClient: true });


app.use(express.static(path.resolve('dist')));
app.use(bodyParser.json());
app.use('/api', require('./routes'));


app.post('/talent-club', function (req, res) {
  console.log(req.body);
  const newMember = new db(req.body);

  
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
