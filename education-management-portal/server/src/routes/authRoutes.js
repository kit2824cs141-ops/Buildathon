// authRoutes.js — /api/auth
const express  = require('express');
const router   = express.Router();

const { register, login, getMe, updateMe } = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

// Public
router.post('/register', register);
router.post('/login',    login);

// Protected
router.get('/me',  verifyToken, getMe);
router.put('/me',  verifyToken, updateMe);

module.exports = router;
