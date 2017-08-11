// REST ACTIONS performed on RESOURCES

const router = require('express').Router();
const db = require('../models');

//GET: /api/
router.get('/', function (req, res) {
  db.SignUp.findAll().then(function (signUps) {
    res.json(signUps);
  });
});

router.get('/:id', function (req, res) {
  db.SignUp.findById(req.params.id).then(function (signUp) {
    if (signUp === null) {
      res.sendStatus(404);
    } else {
      res.json(signUp);
    }
  });
});

//Get Emergency Contacts by signUpId
router.get('/:id/emergencyContact', function (req, res) {
  db.EmergencyContact.findAll({
    where: {
      signUpId: req.params.id
    }
  }).then(function (emergencyContacts) {
    if (emergencyContacts === null) {
      res.sendStatus(404);
    } else {
      res.json(emergencyContacts);
    }
  });
});

//POST: /api/signUps
router.post('/', function (req, res) {
  const newSignUp = new db.SignUp(req.body);

  newSignUp.save().then(function (signUp) {
    res.status(201).json(signUp);
  });
});

// UPDATE
router.put('/:id', function (req, res) {
  db.SignUp.findById(req.params.id).then(function (signUp) {
    signUp.update(req.body).then(function (signUp) {
      res.json(signUp);
    });
  });
});

// DELETE
router.delete('/:id', function (req, res) {
  db.SignUp.findById(req.params.id).then(function (signUp) {
    if (signUp === null) {
      res.sendStatus(404);
    } else {
      signUp.destroy().then(function () {
        res.status(204).json(signUp);
      });
    }
  });
});


module.exports = router;
