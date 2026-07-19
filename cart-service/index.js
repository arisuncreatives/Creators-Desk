import express from 'express';

const app = express();
const PORT = process.env.PORT || 5004;

// The health route for cron-job.org
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// The main cart route
app.get('/', (req, res) => {
  res.status(200).json({ status: 'Cart service is under construction.' });
});

// CRITICAL FIX: Bound to 0.0.0.0 for Render internal routing
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🛒 Cart Service running on port ${PORT}`);
});