import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from './models/Product.js'; // <-- Crucial: Needs the blueprint

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5002; 

// Database Connection
mongoose.connect(process.env.MONGO_URI_PRODUCTS)
  .then(() => console.log('✅ Product Service DB Connected'))
  .catch((err) => console.error('❌ Product DB Connection Error:', err));

// --- THE MISSING ROUTES ---

// 1. Get ALL Products (with optional category filter)
app.get('/api/products', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    
    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: 'Failed to fetch catalog' });
  }
});

// 2. Get a SINGLE Product by Slug
app.get('/api/products/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: 'Failed to fetch product details' });
  }
});

app.listen(PORT, () => {
  console.log(`📦 Product Service running on port ${PORT}`);
});