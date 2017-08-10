const router = require('express').Router();


/* ADD YOUR ROUTES HERE */
const login = require('./login.route');
const signUp = require('./signUp.route');
const splash = require('./splash.route');
const stripe = require('./stripe.route');

module.exports = router;
