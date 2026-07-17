import jwt from 'jsonwebtoken';

export const requireAuth = (req, res, next) => {
  // Grab the token from the headers (e.g., "Bearer eyJhbGci...")
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify the token using our secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_fallback_key');
    
    // Attach the user's ID to the request so the next function knows who they are
    req.user = decoded; 
    next(); // Pass control to the actual route
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token.' });
  }
};