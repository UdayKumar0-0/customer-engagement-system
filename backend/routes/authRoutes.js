const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const Event = require('../models/Event');

router.post('/signup', async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Check if user exists
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ message: "User already exists" });
  
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create user
      user = new User({
        name,
        email,
        password: hashedPassword
      });
  
      await user.save();

      // 🔥 SIGNUP EVENT TRACKING
const signupEvent = new Event({
  userId: user._id,
  eventType: "signup",
  metadata: {
    email: user.email
  }
});

await signupEvent.save();
  
      res.status(201).json({ message: "User registered successfully" });
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find user
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "User not found" });
  
      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
      // 🔥 EVENT TRACKING (KEY PART)
      const loginEvent = new Event({
        userId: user._id,
        eventType: "login",
        metadata: {
          email: user.email
        }
      });
  
      await loginEvent.save();
  
      res.status(200).json({ 
        message: "Login successful",
        user: {
          name: user.name,
          email: user.email
        }
      });
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  module.exports = router;