const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    console.log(req.headers.authorization)
    const token = req.headers.authorization?.split(' ')[1];
    
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = auth; 