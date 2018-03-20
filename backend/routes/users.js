const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const passport = require("passport");
const multer = require("multer");
const uploads = multer({dest: 'public/uploads'});

/* GET users list */
router.get('/', function(req, res, next) {
  User.find()
  .then(users=>res.send(users))
  .catch(e => res.send(e));
});


/* GET Single list */
router.get('/:id', function(req, res, next) {
  User.findById(req.params.id)
      .then(singleUser => res.json(singleUser))
})


/* Update User with Picture */
router.patch('/update/:id', uploads.single('profilePic'), (req,res)=>{
  if(req.file){
    console.log("nunca sucedo!");
    const profilePic = 'http://localhost:3000/uploads/'+req.file.filename;
    req.body['avatar'] = profilePic;
  }
  //console.log(req.body, req.user); 
  //remember the login id useless and fuzzy
  User.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .then(user=>res.send(user))
  .catch(e=>res.send(e));
});


/* Update User */
router.patch('/:id', (req,res)=>{
  User.findOneAndUpdate(req.params.id, req.body, {new:true})
  .then(user=>res.json(user))
  .catch(e=>res.send(e));
});


/* SignUp Router */
router.post('/signup', (req,res,next)=>{
  console.log(req.body)
  User.register(req.body, req.body.password, (err, account)=>{
    if(err) return res.send(err);
    return res.json(account);
  });
});

/* Login Router */
router.post('/login', passport.authenticate('local'), (req, res)=>{
  return res.json(req.user);
});


/* Logout Router */
router.post('/logout', (req, res)=>{
   req.logout();
   res.status(200).json({msg: "success"})
});


/* Delete User Router */
 router.delete('/:id', (req,res,next)=>{
  User.findByIdAndRemove(req.params.id)
  .then(items=>res.status(200).json(items))
  .catch(e=>res.status(500).send(e));
});


module.exports = router;
