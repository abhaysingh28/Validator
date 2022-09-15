var express = require('express');
var router = express.Router();

const { homepage, createuser, signup, signin} = require('../controllers/indexController');

router.get('/', homepage);



router.post('/createUser', createuser);

router.post('/signup', signup);

router.post('/signin', signin);


module.exports = router;