const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.cmedzom.mongodb.net/', {
      useCreateIndex: true, // Add this line to use the new index creation mechanism
      useFindAndModify: false, // Add this line to use the new findOneAndUpdate method instead of findAndModify
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectDB;


