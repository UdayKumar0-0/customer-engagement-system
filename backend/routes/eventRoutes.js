const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// POST /api/events
router.post('/', async (req, res) => {
  try {
    const { userId, eventType, metadata } = req.body;

    const newEvent = new Event({
      userId,
      eventType,
      metadata
    });

    await newEvent.save();

    res.status(201).json({ message: "Event saved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const events = await Event.find()
      .populate('userId', 'name email') // 🔥 important
      .sort({ timestamp: -1 });

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;                   