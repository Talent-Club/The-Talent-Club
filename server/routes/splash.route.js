// REST ACTIONS performed on RESOURCES

const router = require('express').Router();
const db = require('../models');

//GET: /api/
router.get('/', function (req, res) {
  db.Splash.findAll().then(function (splashs) {
    res.json(splashs);
  });
});

router.get('/:id', function (req, res) {
  db.Splash.findById(req.params.id).then(function (splash) {
    if (splash === null) {
      res.sendStatus(404);
    } else {
      res.json(splash);
    }
  });
});

//Get Emergency Contacts by splashId
router.get('/:id/emergencyContact', function (req, res) {
  db.EmergencyContact.findAll({
    where: {
      splashId: req.params.id
    }
  }).then(function (emergencyContacts) {
    if (emergencyContacts === null) {
      res.sendStatus(404);
    } else {
      res.json(emergencyContacts);
    }
  });
});

//POST: /api/splashs
router.post('/', function (req, res) {
  const newSplash = new db.Splash(req.body);

  newSplash.save().then(function (splash) {
    res.status(201).json(splash);
  });
});

// UPDATE
router.put('/:id', function (req, res) {
  db.Splash.findById(req.params.id).then(function (splash) {
    splash.update(req.body).then(function (splash) {
      res.json(splash);
    });
  });
});

// DELETE
router.delete('/:id', function (req, res) {
  db.Splash.findById(req.params.id).then(function (splash) {
    if (splash === null) {
      res.sendStatus(404);
    } else {
      splash.destroy().then(function () {
        res.status(204).json(splash);
      });
    }
  });
});


module.exports = router;
