const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.cmedzom.mongodb.net/', {
      useNewUrlParser: true, // Use this line if you are using Mongoose version older than 6.x
      useUnifiedTopology: true, // Use this line if you are using Mongoose version older than 6.x
      useCreateIndex: true, // Use this line to enable the new index creation mechanism
      useFindAndModify: false, // Use this line to use the new findOneAndUpdate method instead of findAndModify
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectDB;
