const express  = require('express');
const router   = express.Router();
const mongoose = require("mongoose");
const User     = require("../models/User");
const Post     = require('../models/Post');

/* GET home page. */
router.post('/newPost', (req, res) => {
  // Check if post title was provided
  if (!req.body.title) {
    res.json({ success: false, message: 'Post title is required.' }); // Return error message
  } else {
    // Check if post body was provided
    if (!req.body.body) {
      res.json({ success: false, message: 'Post body is required.' }); // Return error message
    } else {
       // Create the post for insertion into db
         const post = new Post({
          title: req.body.title, // Title field
          body: req.body.body, // Body field
          author: req.body.author // CreatedBy field
         });

        // Save post into db
        post.save((err) => {
          // Check if error
          if (err) {
            // Check if error is a validation error
            if (err.errors) {
              // Check if validation error is in the title field
              if (err.errors.title) {
                res.json({ success: false, message: err.errors.title.message }); // Return error message
              } else {
                // Check if validation error is in the body field
                if (err.errors.body) {
                  res.json({ success: false, message: err.errors.body.message }); // Return error message
                } else {
                  res.json({ success: false, message: err }); // Return general error message
                }
              }
            } 
          } else {
            res.json({ success: true, message: 'Post saved!' }); // Return success message
          }
        }); 
      }// end of nested else
    } // end of else
}); // End of post router
  

router.get('/', (req, res) => {
  // Search db for all posts
  Post.find()
  .populate('author')
  .sort('-createdAt') // Sort post from newest to oldest
  .then(posts =>res.json(posts))
  .catch(e=>res.json(e)); 
});

module.exports = router;