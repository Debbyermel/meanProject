const express  = require('express');
const router   = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const Post     = require('../models/Post');

/* GET home page. */
router.post('/newPost', (req, res) => {
  // Check if blog title was provided
  if (!req.body.title) {
    res.json({ success: false, message: 'Blog title is required.' }); // Return error message
  } else {
    // Check if blog body was provided
    if (!req.body.body) {
      res.json({ success: false, message: 'Blog body is required.' }); // Return error message
    } else {
        // Create the blog object for insertion into database
        const post = new Post({
          title: req.body.title, // Title field
          body: req.body.body, // Body field
          //createdBy: req.body.createdBy // CreatedBy field
          //author: req.body.author
          author: req.user._id
        });

        // Save blog into database
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
            } else {
              res.json({ success: false, message: err }); // Return general error message
            }
          } else {
            res.json({ success: true, message: 'Blog saved!' }); // Return success message
          }
        }); 
      }
    }



  
    //return router;
});
  

router.get('/', (req, res) => {
  // Search database for all blog posts
  Post.find()
  .populate('author')
  .sort('-createdAt')
  .then(posts =>res.json(posts))
  .catch(e=>res.json(e)); // Sort blogs from newest to oldest
});



module.exports = router;