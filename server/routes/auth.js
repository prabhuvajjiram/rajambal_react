import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check against environment variables
    if (
      username === process.env.ADMIN_USERNAME &&
      await bcrypt.compare(password, process.env.ADMIN_PASSWORD)
    ) {
      const token = jwt.sign(
        { username: process.env.ADMIN_USERNAME },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;