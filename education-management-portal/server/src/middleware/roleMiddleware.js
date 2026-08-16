// Role Middleware — gates routes by RTDB profile.role
const { db } = require('../config/firebase');

/**
 * checkRole(...roles)
 * Usage: router.get('/path', verifyToken, checkRole('admin'), handler)
 *
 * It reads /users/$uid/profile/role from RTDB and compares to allowed roles.
 * Falls back to req.user.role (custom claim) for speed when already set.
 */
const checkRole = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      if (!req.user || !req.user.uid) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }

      // Fast path: use custom claim if present
      if (req.user.role && allowedRoles.includes(req.user.role)) {
        return next();
      }

      // Slow path: read role from RTDB
      const snapshot = await db.ref(`users/${req.user.uid}/profile/role`).once('value');
      const role = snapshot.val();

      if (!role || !allowedRoles.includes(role)) {
        return res.status(403).json({
          success: false,
          message: `Access denied. Required role(s): ${allowedRoles.join(', ')}`,
        });
      }

      // Cache on req so downstream handlers can use it
      req.user.role = role;
      next();
    } catch (error) {
      console.error('[RoleMiddleware] Role check failed:', error.message);
      return res.status(500).json({ success: false, message: 'Role verification error' });
    }
  };
};

module.exports = { checkRole };
