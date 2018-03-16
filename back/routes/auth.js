const router = require("express").Router();
const controller = require("../controllers/auth.controller");
const passport = require("passport");

router.post('/signup', controller.signUp);
router.post('/login', passport.authenticate('local'), controller.login);
router.post('/logout', controller.logout);
router.get('/loggedin', controller.loggedin);

module.exports = router;