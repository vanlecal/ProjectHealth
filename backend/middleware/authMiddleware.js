const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;   // <-- always use "userId"
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};



module.exports = protect;




const protectPatient = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Your loginUser signs { userId: user._id }
    req.userId = decoded.userId || decoded.id; // Support both formats

    if (!req.userId) {
      return res.status(401).json({ message: 'Invalid token payload — missing userId' });
    }

    next();
  } catch (err) {
    console.error('Auth error:', err.message);
    return res.status(401).json({ message: 'Token verification failed' });
  }
};

module.exports = protectPatient;
