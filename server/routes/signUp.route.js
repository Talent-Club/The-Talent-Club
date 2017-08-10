// REST ACTIONS performed on RESOURCES

const router = require('express').Router();
const Member = require('../models/member.model');

//GET: /api/
router.post('/talent-club', function (req, res) {
  console.log(req.body);
  const newMember = new Member(req.body);
  
   newMember.save(function(err) {
       if(err) {
           res.send('an error has occured: ' + err)
       } else {
           res.send('Yes')
       }
  });
});

module.exports = router;
