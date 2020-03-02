const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const passport = require('passport')

let auth = passport.authenticate('jwt-user')

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/register', userController.register)



module.exports = router;
