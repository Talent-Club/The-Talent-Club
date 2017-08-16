const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const logger = require('./lib/logger');
const gzip = require('compression');

const app = express();

const db = require('./models/member.model');

var mongodbUri = 'mongodb://Keaton:talentclub1@ds133670.mlab.com:33670/talent-club';
mongoose.connect(mongodbUri, { useMongoClient: true });


app.use(express.static(path.resolve('dist')));
app.use(bodyParser.json());
app.use(passport.initialize());

require('./config/passport')(passport);

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
