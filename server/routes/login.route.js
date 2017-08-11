// REST ACTIONS performed on RESOURCES

const router = require('express').Router();
const db = require('../models/member.model');

//GET: /api/
router.get('/', function (req, res) {
  db.Login.findAll().then(function (logins) {
    res.json(logins);
  });
});

router.get('/:id', function (req, res) {
  db.Login.findById(req.params.id).then(function (login) {
    if (login === null) {
      res.sendStatus(404);
    } else {
      res.json(login);
    }
  });
});


router.get('/:id', function (req, res) {
  db.login.findAll({
    where: {
      loginId: req.params.id
    }
  }).then(function (login) {
    if (login === null) {
      res.sendStatus(404);
    } else {
      res.json(login);
    }
  });
});

//POST: /api/logins
router.post('/', function (req, res) {
  const newLogin = new db.Login(req.body);

  newLogin.save().then(function (login) {
    res.status(201).json(login);
  });
});

// UPDATE
router.put('/:id', function (req, res) {
  db.Login.findById(req.params.id).then(function (login) {
    login.update(req.body).then(function (login) {
      res.json(login);
    });
  });
});

// DELETE
router.delete('/:id', function (req, res) {
  db.Login.findById(req.params.id).then(function (login) {
    if (login === null) {
      res.sendStatus(404);
    } else {
      login.destroy().then(function () {
        res.status(204).json(login);
      });
    }
  });
});


module.exports = router;
