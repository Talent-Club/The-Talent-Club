const router = require('express').Router();
const requiresAuth = require('../lib/requiresAuth');
const Member = require('../models/member.model');
const stripe = require('stripe')(process.env.STRIPE_TEST_KEY);

router.route('/:memberId/:stripeToken')
            .post(addOrder);

module.exports = router;

//////////////

function addOrder(req, res) {
    stripe
        .charges
        .create({
            amount: 9999,
            currency: 'usd',
            source: req.params.stripeToken,
            description: 'Talent-club'
        })
        .then(() => {
            console.log(req.params.memberId);

            return Member
                .findById(req.params.memberId)
                .then(function(member) {
                    member.hasPaid = true;

                    return member.save();
                });
        })
        .then(order => res.sendStatus(200))
        .catch(function(error) {
            console.log(error);

            return res.sendStatus(500);
        });
}

