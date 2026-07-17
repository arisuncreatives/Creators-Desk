import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createProxyMiddleware } from 'http-proxy-middleware';

dotenv.config();
const app = express();

// Global Middleware
// STRICT CORS: Only allowing local testing and the live Vercel frontend
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://creator-s-desk.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true 
}));

// --- Microservice Routing ---

// 1. Auth Service Route
app.use('/api/auth', createProxyMiddleware({
  // UPDATED: Now points to the Docker container name instead of localhost
  target: process.env.AUTH_SERVICE_URL || 'https://creator-s-desk-auth-service.onrender.com',
  changeOrigin: true,
  pathRewrite: {
    '^/': '/api/auth/' 
  },
  onProxyReq: (proxyReq, req, res) => {
    console.log(`[Gateway] Routing to Auth: ${req.method} ${req.originalUrl}`);
  }
}));

// 2. Product Service Route
app.use('/api/products', createProxyMiddleware({
  // UPDATED: Now points to the Docker container name instead of localhost
  target: process.env.PRODUCT_SERVICE_URL || 'https://creator-s-desk-product-service.onrender.com',
  changeOrigin: true,
  pathRewrite: {
    '^/': '/api/products/' 
  },
  onProxyReq: (proxyReq, req, res) => {
    console.log(`[Gateway] Routing to Products: ${req.method} ${req.originalUrl}`);
  }
}));

// 3. Order Service Route 
app.use('/api/orders', createProxyMiddleware({
  // UPDATED: Now points to the Docker container name instead of localhost
  target: process.env.ORDER_SERVICE_URL || 'https://creator-s-desk-order-service.onrender.com',
  changeOrigin: true,
  pathRewrite: {
    '^/': '/api/orders/' 
  },
  onProxyReq: (proxyReq, req, res) => {
    console.log(`[Gateway] Routing to Orders: ${req.method} ${req.originalUrl}`);
  }
}));

// Health Check for the Gateway itself
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'API Gateway is online and routing traffic.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🔀 API Gateway running on port ${PORT}`);
});