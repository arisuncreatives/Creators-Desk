import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Order from './models/Order.js';
import { requireAuth } from './middleware/authMiddleware.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5003; 

// Database Connection with a local fallback for testing
mongoose.connect(process.env.MONGO_URI_ORDERS || 'mongodb://localhost:27017/creatorsdesk_orders')
  .then(() => console.log('✅ Order Service DB Connected'))
  .catch((err) => console.error('❌ Order DB Connection Error:', err));

// --- Routes ---

// 1. Create a New Order (Checkout)
app.post('/api/orders', requireAuth, async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const newOrder = await Order.create({
      userId: req.user.userId, // Pulled securely from the JWT token
      items,
      totalAmount,
      shippingAddress
    });

    res.status(201).json({ message: 'Order placed successfully!', orderId: newOrder._id });
  } catch (error) {
    console.error("Checkout Error:", error);
    res.status(500).json({ error: 'Failed to process order' });
  }
});

// 2. Get logged-in user's order history
app.get('/api/orders/me', requireAuth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order history' });
  }
});

// CRITICAL FIX: Ensure the service listens on 0.0.0.0 so Render's internal network can route to it
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🛒 Order Service running on port ${PORT}`);
});