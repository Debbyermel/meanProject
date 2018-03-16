const User = require('../Models/User');
exports.getUsers = function(req, res, next) {
  User.find()
  .then(users=>res.status(200).json(users)) // 200 ok
  .catch(e=>res.status(500).send(e));  //500 internal server error
};

exports.postUsers = (req,res,next)=> {
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    avatar: req.file.path
  });

  newUser.save((err) => {
        // Check if error occured
        if (err) {
          // Check if error is an error indicating duplicate account
          if (err.code === 11000) {
            res.json({ success: false, message: 'Username or e-mail already exists' }); // Return error
          } else {
            // Check if error is a validation error
            if (err.errors) {
              // Check if validation error is in the email field
              if (err.errors.email) {
                res.json({ success: false, message: err.errors.email.message }); // Return error
              } else {
                // Check if validation error is in the username field
                if (err.errors.username) {
                  res.json({ success: false, message: err.errors.username.message }); // Return error
                } else {
                  // Check if validation error is in the password field
                  if (err.errors.password) {
                    res.json({ success: false, message: err.errors.password.message }); // Return error
                  } else {
                    res.json({ success: false, message: err }); // Return any other error not already covered
                  }
                }
              }
            } else {
              res.json({ success: false, message: 'Could not save user. Error: ', err }); // Return error if not related to validation
            }
          }
        } else {
          res.json({ success: true, message: 'Acount registered!' }); // Return success
        }
      });
    }
