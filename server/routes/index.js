const router = require('express').Router();


/* ADD YOUR ROUTES HERE */

router.use('/user', require('./user.route'));

router.use('/login', require('./login.route'));

router.use('/signup', require('./signUp.route'));
router.use('/splash', require('./splash.route'));
router.use('/stripe', require('./stripe.route'));
router.use('/sendgrid', require('./sendGrid.route'));


module.exports = router;
