const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../controlers/UsersControllers');

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the folder where uploaded files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Set the file name to be unique
  },
});

const upload = multer({ storage: storage });

router.post('/signup', upload.single('profile_picture'), userController.signup);
router.post('/verify-otp', userController.verifyOTP);

module.exports = router;
