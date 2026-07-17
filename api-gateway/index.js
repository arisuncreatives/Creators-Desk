import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createProxyMiddleware } from 'http-proxy-middleware';

dotenv.config();
const app = express();

// Global Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://creator-s-desk.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true 
}));

// --- Universal Proxy Configuration ---
const createProxyOptions = (targetUrl, serviceName) => ({
  target: targetUrl,
  changeOrigin: true,
  secure: false, // Fixes Render internal network SSL blocks
  onProxyReq: (proxyReq, req, res) => {
    console.log(`[Gateway] Routing to ${serviceName}: ${req.method} ${req.originalUrl}`);
  },
  onError: (err, req, res) => {
    console.error(`[Gateway] Error routing to ${serviceName}:`, err.message);
    res.status(502).json({ error: `Failed to connect to ${serviceName} Service.` });
  }
});

// --- Microservice Routing ---
// Note: restorePath has been removed. The proxy handles the paths naturally.

// 1. Auth Service Route
app.use('/api/auth', createProxyMiddleware(
  createProxyOptions(process.env.AUTH_SERVICE_URL || 'https://creator-s-desk-auth-service.onrender.com', 'Auth')
));

// 2. Product Service Route
app.use('/api/products', createProxyMiddleware(
  createProxyOptions(process.env.PRODUCT_SERVICE_URL || 'https://creator-s-desk-product-service.onrender.com', 'Products')
));

// 3. Order Service Route 
app.use('/api/orders', createProxyMiddleware(
  createProxyOptions(process.env.ORDER_SERVICE_URL || 'https://creator-s-desk-order-service.onrender.com', 'Orders')
));

// Health Check for the Gateway itself
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'API Gateway is online and routing traffic.' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🔀 API Gateway running on port ${PORT}`);
});