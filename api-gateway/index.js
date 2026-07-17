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
// Added pathPrefix and pathRewrite to physically strip the URL
const createProxyOptions = (targetUrl, pathPrefix, serviceName) => ({
  target: targetUrl,
  changeOrigin: true,
  secure: false, 
  pathRewrite: {
    [`^${pathPrefix}`]: '', // CRITICAL: This changes /api/auth/send-code to just /send-code
  },
  onProxyReq: (proxyReq, req, res) => {
    // This log will now show exactly what is being forwarded
    console.log(`[Gateway] Routing to ${serviceName}: ${req.method} ${req.originalUrl} -> ${proxyReq.path}`);
  },
  onError: (err, req, res) => {
    console.error(`[Gateway] Error routing to ${serviceName}:`, err.message);
    res.status(502).json({ error: `Failed to connect to ${serviceName} Service.` });
  }
});

// --- Microservice Routing ---

// 1. Auth Service Route (Strips /api/auth)
app.use('/api/auth', createProxyMiddleware(
  createProxyOptions('https://creator-s-desk-auth-service.onrender.com', '/api/auth', 'Auth')
));

// 2. Product Service Route (Strips /api/products)
app.use('/api/products', createProxyMiddleware(
  createProxyOptions('https://creator-s-desk-product-service.onrender.com', '/api/products', 'Products')
));

// 3. Order Service Route (Strips /api/orders)
app.use('/api/orders', createProxyMiddleware(
  createProxyOptions('https://creator-s-desk-order-service.onrender.com', '/api/orders', 'Orders')
));

// Health Check for the Gateway itself
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'API Gateway is online and routing traffic.' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🔀 API Gateway running on port ${PORT}`);
});