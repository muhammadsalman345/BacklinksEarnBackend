// UsersControllers.js
const User = require('../models/usermodel');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate email
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      if (!existingUser.isVerified) {
        // If the user is not verified, delete the existing user
        await User.deleteOne({ email: existingUser.email });
      } else {
        return res.status(400).json({ message: 'User already exists' });
      }
    }

    // Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000);

    // Send OTP to user's email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mailchecker345@gmail.com',
        pass: 'qxtx yalq mcib letl',
      },
    });

    const mailOptions = {
      from: 'mailchecker345@gmail.com',
      to: email,
      subject: 'OTP for Signup',
      text: `Your OTP for signup is: ${otp}`,
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to send OTP' });
      } else {
        // Save user to the database after OTP is sent successfully
        const newUser = new User({
          username,
          email,
          password,
          otp,
        });

        await newUser.save();

        res.status(201).json({ message: 'OTP sent successfully' });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Check if the user with the given email and OTP exists
    const user = await User.findOne({ email, otp });

    if (user && !user.isVerified) {
      // Update user as verified
      await User.updateOne({ email }, { $set: { isVerified: true } });

      // Generate JWT token
      const token = jwt.sign({ email: user.email }, 'your_secret_key', { expiresIn: '30s' });

      res.status(200).json({ message: 'Email verification successful', token });
    } else if (user && user.isVerified) {
      res.status(200).json({ message: 'Email already verified' });
    } else {
      res.status(400).json({ message: 'Invalid OTP' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if the user is active
    if (!user.isVerified) {
      return res.status(401).json({ message: 'User is not active. Please verify your email.' });
    }

    // Check if the provided password matches the stored password
    if (password === user.password) {
      // Passwords match, create a JWT token
      const token = jwt.sign({ email: user.email }, 'your_secret_key', { expiresIn: '1h' });
      res.status(200).json({ message: 'User signed in successfully', token });
    } else {
      // Passwords do not match
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};