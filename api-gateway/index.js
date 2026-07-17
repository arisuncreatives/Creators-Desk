const createProxyOptions = (targetUrl, pathPrefix, serviceName) => ({
  target: targetUrl,
  changeOrigin: true,
  secure: false, 
  pathRewrite: {
    [`^${pathPrefix}`]: '',
  },
  // Flattened: These must be top-level keys
  onProxyReq: (proxyReq, req, res) => {
    console.log(`[Gateway] Routing to ${serviceName}: ${req.method} ${req.originalUrl} -> ${proxyReq.path}`);
  },
  onError: (err, req, res) => {
    console.error(`[Gateway] Error routing to ${serviceName}:`, err.message);
    res.status(502).json({ error: `Failed to connect to ${serviceName} Service.` });
  }
});