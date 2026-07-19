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
    'https://creators-desk.vercel.app'
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
  on: {
    proxyReq: (proxyReq, req, res) => {
      // This log will now show exactly what is being forwarded
      console.log(`[Gateway] Routing to ${serviceName}: ${req.method} ${req.originalUrl} -> ${proxyReq.path}`);
    },
    error: (err, req, res) => {
      console.error(`[Gateway] Error routing to ${serviceName}:`, err.message);
      res.status(502).json({ error: `Failed to connect to ${serviceName} Service.` });
    }
  }
});

// --- Microservice Routing ---

// 1. Auth Service Route (Strips /api/auth)
app.use('/api/auth', createProxyMiddleware(
  createProxyOptions('https://creators-desk-auth.onrender.com', '/api/auth', 'Auth')
));

// 2. Product Service Route (Strips /api/products)
app.use('/api/products', createProxyMiddleware(
  createProxyOptions('https://creators-desk-product.onrender.com', '/api/products', 'Products')
));

// 3. Order Service Route (Strips /api/orders)
app.use('/api/orders', createProxyMiddleware(
  createProxyOptions('https://creators-desk-order.onrender.com', '/api/orders', 'Orders')
));

// 4. Cart Service Route (Strips /api/cart)
app.use('/api/cart', createProxyMiddleware(
  createProxyOptions('https://creators-desk-cart.onrender.com', '/api/cart', 'Cart')
));

// Health Check for the Gateway itself
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'API Gateway is online and routing traffic.' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🔀 API Gateway running on port ${PORT}`);
});