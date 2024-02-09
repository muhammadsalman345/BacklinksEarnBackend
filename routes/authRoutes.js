// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controlers/UsersControllers');

router.post('/signup', userController.signup);
router.post('/verify-otp', userController.verifyOTP);

module.exports = router;
