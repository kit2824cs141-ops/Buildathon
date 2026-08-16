// Auth Middleware — verifies Firebase ID token from Authorization header
const { auth } = require('../config/firebase');

/**
 * verifyToken
 * Expects:  Authorization: Bearer <firebase_id_token>
 * Attaches: req.user = { uid, email, role, name }
 */
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const idToken = authHeader.split('Bearer ')[1];
    const decodedToken = await auth.verifyIdToken(idToken);

    // Attach decoded claims to request
    req.user = {
      uid:   decodedToken.uid,
      email: decodedToken.email,
      role:  decodedToken.role || null, // custom claim set by admin
      name:  decodedToken.name  || null,
    };

    next();
  } catch (error) {
    console.error('[AuthMiddleware] Token verification failed:', error.message);
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

module.exports = { verifyToken };
