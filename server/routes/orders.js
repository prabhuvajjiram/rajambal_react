import express from 'express';
import Order from '../models/Order.js';
import { sendOrderConfirmation } from '../utils/email.js';

const router = express.Router();

// Create order
router.post('/', async (req, res) => {
  try {
    const order = new Order({
      items: req.body.items,
      total: req.body.total,
      customer: {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address
      }
    });

    await order.save();
    await sendOrderConfirmation(order);
    
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('items.product').sort({ created_at: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update order status
router.patch('/:id/status', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;