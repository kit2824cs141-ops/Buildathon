// adminRoutes.js — /api/admin  (admin only)
const express  = require('express');
const router   = express.Router();

const ctrl             = require('../controllers/adminController');
const { verifyToken }  = require('../middleware/authMiddleware');
const { checkRole }    = require('../middleware/roleMiddleware');

// All admin routes require a valid token + admin role
router.use(verifyToken);
router.use(checkRole('admin'));

/* ─── Users ────────────── */
router.get('/users',                     ctrl.getAllUsers);
router.get('/users/role/:role',          ctrl.getUsersByRole);
router.get('/users/:uid',                ctrl.getUserById);
router.put('/users/:uid',                ctrl.updateUser);
router.delete('/users/:uid',             ctrl.deleteUser);
router.patch('/users/:uid/role',         ctrl.setUserRole);

/* ─── Courses ──────────── */
router.get('/courses',                   ctrl.getAllCourses);
router.post('/courses',                  ctrl.createCourse);
router.put('/courses/:courseId',         ctrl.updateCourse);
router.delete('/courses/:courseId',      ctrl.deleteCourse);

/* ─── Classes ──────────── */
router.get('/classes',                   ctrl.getAllClasses);
router.post('/classes',                  ctrl.createClass);
router.put('/classes/:classId',          ctrl.updateClass);
router.delete('/classes/:classId',       ctrl.deleteClass);

/* ─── Exams ─────────────── */
router.get('/exams',                     ctrl.getAllExams);
router.delete('/exams/:examId',          ctrl.deleteExam);

/* ─── AI Insights ──────── */
router.get('/insights',                           ctrl.getAllInsights);
router.get('/insights/:studentId',                ctrl.getStudentInsights);
router.post('/insights/:studentId/analyze',       ctrl.analyzeStudent);

/* ─── Announcements ─────── */
router.get('/announcements',             ctrl.getAnnouncements);
router.post('/announcements',            ctrl.createAnnouncement);

/* ─── Reports ──────────── */
router.get('/reports/student/:studentId',               ctrl.getStudentReports);
router.post('/reports/student/:studentId/generate',     ctrl.generateStudentReport);
router.get('/reports/class/:classId',                   ctrl.getClassReports);
router.post('/reports/class/:classId/generate',         ctrl.generateClassReport);

/* ─── Contact Queries ───── */
router.get('/contact-queries',           ctrl.getContactQueries);

module.exports = router;
