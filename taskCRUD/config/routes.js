const express = require('express');
const router = express.Router();

const { usersController } = require('../app/controllers/userController');
const { loginSigninController } = require('../app/controllers/loginSigninController');

router.use('/users',usersController );
router.use('/users/gateway',loginSigninController);

module.exports = {
    routes: router
}