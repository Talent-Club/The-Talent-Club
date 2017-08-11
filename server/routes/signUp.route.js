// REST ACTIONS performed on RESOURCES

const router = require('express').Router();
const db = require('../models/member.model');

//GET: /api/
router.post('/', function (req, res) {
  console.log(req.body);
  const newMember = new db(req.body);
  
   newMember.save(function(err) {
       if(err) {
           res.send('an error has occured: ' + err)
       } else {
           res.send('Yes')
       }
  });
});

module.exports = router;
