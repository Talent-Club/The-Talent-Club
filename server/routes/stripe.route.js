const router = require('express').Router();
const requiresAuth = require('../lib/requiresAuth');
const db = require('../models/member.model');
const stripe = require('stripe')(process.env.STRIPE_TEST_KEY);

router.route('/:stripeToken')
            .post(requiresAuth(), addOrder);

module.exports = router;

//////////////

function addOrder(req, res, next) {
    stripe
        .charges
        .create({
            amount: req.body.retailPrice * 100,
            currency: 'usd',
            source: req.params.stripeToken,
            description: 'Talent-club'
        })
        .then(function(charge) {
            const newOrder = new Order({
                member: req.member,
                stripeCharge: charge
            });

            return newOrder.save();  
        })
        .then(product => res.json(product))
        .catch(next);
}
