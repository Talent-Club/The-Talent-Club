const router = require('express').Router();
const db = require('../models/member.model');


//GET: /api/
router.get('/', function (req, res) {
  db.find({}).then(function (members) {
    res.json(members);
  });
});

router.get('/:id', (req, res) => {
  db.findOne({
    '_id': req.params.id
  }, 'firstName lastName jobTitle email socialNetworks', function (err, member) {
    res.json(member);
    signUpEmail(member);
  });
});

//POST: /api/members
router.post('/', function (req, res) {
  const newMember = new db(req.body);

  newMember.save().then(function (member) {
    res.status(201).json(member);
  });
});

// UPDATE
router.put('/:id', function (req, res) {
  db.findById(req.params.id).then(function (member) {
    member.update(req.body).then(function () {
      res.sendStatus(204);
    });
  });
});

// DELETE
router.delete('/:id', function (req, res) {
  db.findById(req.params.id).then(function (member) {
    if (member === null) {
      res.sendStatus(404);
    } else {
      member.destroy().then(function () {
        res.json(member);
      });
    }
  });
});


module.exports = router;
