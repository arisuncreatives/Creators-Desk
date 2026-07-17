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

const PORT = process.env.PORT || 5003; // Running on 5003!

mongoose.connect(process.env.MONGO_URI_ORDERS)
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

app.listen(PORT, () => {
  console.log(`🛒 Order Service running on port ${PORT}`);
});