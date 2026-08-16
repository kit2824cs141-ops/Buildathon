// Auth Middleware
const { auth } = require('../config/firebase');

const verifyToken = async (req, res, next) => {
  // TODO: Implement token verification
  next();
};

module.exports = { verifyToken };
