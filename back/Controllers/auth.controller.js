const User = require('../Models/User');

exports.signUp = (req,res,next)=>{
    User.register(req.body, req.body.password, (err, account)=>{
        if(err) return res.status(500).send(err);
        return res.status(201).json(account);
    });
}

exports.login = (req,res,next)=>{
    res.status(200).json(req.user);
}

exports.logout = (req, res, next) => {
    req.logout();
    res.status(200).json({ message: 'Success' });
  }

exports.loggedin = (req, res, next) => {
    if (req.isAuthenticated()) {
      res.status(200).json(req.user);
      return;
    }
  
    res.status(403).json({ message: 'Unauthorized' });
  }