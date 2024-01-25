const User = require('../models/usermodel');

exports.signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    console.log(req.body); // Yahan console pe data dekho

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ fullName, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
