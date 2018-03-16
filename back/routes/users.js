var express = require('express');
var router = express.Router();
const controller = require('../Controllers/users.controller');
var multer = require('multer');
var upload = multer({dest:`.public/uploads/`});

/* GET users listing. */
router.get('/', controller.getUsers);//using users controller
router.post('/', upload.single('img'), controller.postUsers); //it should be here???


module.exports = router;
 