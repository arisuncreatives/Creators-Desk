import http from 'http';

const PORT = process.env.PORT || 5004;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'Cart service is under construction.' }));
});

server.listen(PORT, () => {
  console.log(`🛒 Cart Service running on port ${PORT}`);
});