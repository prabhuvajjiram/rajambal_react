import express from 'express';
import { sendContactEmail } from '../utils/email.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    await sendContactEmail({ name, email, subject, message });
    res.json({ message: 'Message received successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;