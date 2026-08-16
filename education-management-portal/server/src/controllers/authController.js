// authController.js — POST /api/auth/*
const { auth, db } = require('../config/firebase');
const userService  = require('../services/userService');

/**
 * POST /api/auth/register
 * Body: { idToken, name, role: 'student'|'teacher', rollNumber?, employeeId?, batch?, semester? }
 *
 * Called AFTER the client has created the Firebase Auth user and obtained idToken.
 * This endpoint creates the RTDB profile + sets a custom role claim.
 */
const register = async (req, res) => {
  try {
    const { idToken, name, role, rollNumber, employeeId, batch, semester } = req.body;

    if (!idToken || !name || !role) {
      return res.status(400).json({ success: false, message: 'idToken, name, and role are required' });
    }

    if (!['student', 'teacher'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Role must be student or teacher' });
    }

    // Verify the idToken and get uid
    const decoded  = await auth.verifyIdToken(idToken);
    const uid      = decoded.uid;
    const email    = decoded.email;

    // Build profile
    const profile = {
      name,
      email,
      role,
      photoURL:  decoded.picture || null,
      isActive:  true,
      createdAt: new Date().toISOString(),
    };

    await userService.createOrUpdateUser(uid, profile);

    // Role-specific info
    if (role === 'student') {
      await userService.updateStudentInfo(uid, {
        rollNumber: rollNumber || null,
        batch:      batch      || null,
        semester:   semester   || 1,
        enrolledCourses: {},
      });
    } else if (role === 'teacher') {
      await userService.updateTeacherInfo(uid, {
        employeeId:      employeeId || null,
        assignedCourses: {},
        assignedClasses: {},
      });
    }

    // Set custom role claim so middleware can fast-path role checks
    await userService.setUserRoleClaim(uid, role);

    return res.status(201).json({ success: true, message: 'User registered successfully', uid });
  } catch (error) {
    console.error('[AuthController] register error:', error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * POST /api/auth/login
 * Body: { idToken }
 *
 * Verifies token and returns the user's RTDB profile.
 */
const login = async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) return res.status(400).json({ success: false, message: 'idToken required' });

    const decoded  = await auth.verifyIdToken(idToken);
    const uid      = decoded.uid;

    const user = await userService.getUserById(uid);
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('[AuthController] login error:', error.message);
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

/**
 * GET /api/auth/me
 * Protected — reads the current user's profile from RTDB.
 */
const getMe = async (req, res) => {
  try {
    const user = await userService.getUserById(req.user.uid);
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};

/**
 * PUT /api/auth/me
 * Protected — update own profile (name, photoURL only).
 */
const updateMe = async (req, res) => {
  try {
    const { name, photoURL } = req.body;
    await db.ref(`users/${req.user.uid}/profile`).update({
      ...(name     && { name }),
      ...(photoURL && { photoURL }),
      updatedAt: new Date().toISOString(),
    });
    const user = await userService.getUserById(req.user.uid);
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { register, login, getMe, updateMe };
