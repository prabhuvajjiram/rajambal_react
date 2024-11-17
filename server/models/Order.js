import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number,
  color: String,
  price: Number
});

const orderSchema = new mongoose.Schema({
  items: [orderItemSchema],
  total: Number,
  customer: {
    name: String,
    email: String,
    phone: String,
    address: String
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'cancelled'],
    default: 'pending'
  },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model('Order', orderSchema);