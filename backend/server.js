const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes import (ADD HERE)
const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/authRoutes');  // 👈 ADD THIS

console.log("Event Routes Loaded");

// ✅ DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ✅ Use routes (ADD HERE)
app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);   // 👈 ADD THIS

// ✅ Test route
app.get('/', (req, res) => {
  res.send("API is running");
});

// ✅ Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});