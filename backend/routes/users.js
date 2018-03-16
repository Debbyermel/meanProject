var express = require('express');
var router = express.Router();
const User = require("../models/User");
const passport = require("passport");

router.post('/signup', (req,res,next)=>{
  console.log(req.body)
  User.register(req.body, req.body.password, (err, account)=>{
    if(err) return res.send(err);
    return res.json(account);
  });
});

router.post('/login', passport.authenticate('local'), (req, res)=>{
  return res.json(req.user);
});


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
