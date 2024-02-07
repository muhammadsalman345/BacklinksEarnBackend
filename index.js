// app.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./bd/dbConnection');
const authRoutes = require('./routes/authRoutes');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
