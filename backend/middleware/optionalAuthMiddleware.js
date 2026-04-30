const jwt = require('jsonwebtoken');
const User = require('../models/User');

const optionalProtect = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer ')
  ) {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');

    if (req.user && req.user.isSuspended) {
      req.user = null;
    }
  } catch (error) {
    req.user = null;
  }

  next();
};

module.exports = { optionalProtect };
