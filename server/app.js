require("dotenv").config();
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

// app.use('/api', require('./routes'));
app.use('/api/signup', require('./routes/signUp.route'));
app.use('/api/splash', require('./routes/splash.route.js'));
app.use('/api/stripe', require('./routes/stripe.route.js'));
app.use('/api/login', require('./routes/user.route.js'));


app.use(function(err, req, res, next) {
    if(err) {
        logger.log('error', err);
        return res.status(500).send({ errors: ['Oops! Something went wrong on our end.']});
    }

    next();
});

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/../dist/index.html`);
});

module.exports = app;
