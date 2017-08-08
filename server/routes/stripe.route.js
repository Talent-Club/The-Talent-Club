// REST ACTIONS performed on RESOURCES

const router = require('express').Router();
const db = require('../models');

//GET: /api/
router.get('/', function (req, res) {
  db.Stripe.findAll().then(function (stripes) {
    res.json(stripes);
  });
});

router.get('/:id', function (req, res) {
  db.Stripe.findById(req.params.id).then(function (stripe) {
    if (stripe === null) {
      res.sendStatus(404);
    } else {
      res.json(stripe);
    }
  });
});

//Get Emergency Contacts by stripeId
router.get('/:id/emergencyContact', function (req, res) {
  db.EmergencyContact.findAll({
    where: {
      stripeId: req.params.id
    }
  }).then(function (emergencyContacts) {
    if (emergencyContacts === null) {
      res.sendStatus(404);
    } else {
      res.json(emergencyContacts);
    }
  });
});

//POST: /api/stripes
router.post('/', function (req, res) {
  const newStripe = new db.Stripe(req.body);

  newStripe.save().then(function (stripe) {
    res.status(201).json(stripe);
  });
});

// UPDATE
router.put('/:id', function (req, res) {
  db.Stripe.findById(req.params.id).then(function (stripe) {
    stripe.update(req.body).then(function (stripe) {
      res.json(stripe);
    });
  });
});

// DELETE
router.delete('/:id', function (req, res) {
  db.Stripe.findById(req.params.id).then(function (stripe) {
    if (stripe === null) {
      res.sendStatus(404);
    } else {
      stripe.destroy().then(function () {
        res.status(204).json(stripe);
      });
    }
  });
});


module.exports = router;
