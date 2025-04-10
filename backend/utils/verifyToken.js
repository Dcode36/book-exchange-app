const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) return res.status(403).json({ message: 'No token provided' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid or expired token' });

    req.user = decoded; // Store user data in request object
    next();
  });
};
