import express from 'express';
import Feedback from '../models/Feedback.js';

const router = express.Router();

// Submit feedback
router.post('/', async (req, res) => {
  try {
    const feedback = new Feedback({
      name: req.body.name,
      comment: req.body.comment
    });
    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all active feedback
router.get('/', async (req, res) => {
  try {
    const feedback = await Feedback.find({ status: 'active' })
      .sort({ created_at: -1 });
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;