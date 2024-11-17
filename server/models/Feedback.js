import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  comment: { type: String, required: true },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model('Feedback', feedbackSchema);