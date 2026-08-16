// studentRoutes.js — /api/student  (all routes require student login)
const express  = require('express');
const router   = express.Router();

const ctrl               = require('../controllers/studentController');
const { verifyToken }    = require('../middleware/authMiddleware');
const { checkRole }      = require('../middleware/roleMiddleware');

// All student routes are protected + role-gated
router.use(verifyToken);
router.use(checkRole('student', 'admin')); // admin can also access for testing

/* ─── Profile ─────────── */
router.get('/profile', ctrl.getProfile);

/* ─── Courses ─────────── */
router.get('/courses',                    ctrl.getCourses);
router.get('/courses/:courseId',          ctrl.getCourseDetails);
router.post('/courses/:courseId/enroll',  ctrl.enrollInCourse);
router.get('/my-courses',                 ctrl.getMyCourses);

/* ─── Assignments ──────── */
router.get('/assignments',                         ctrl.getAssignments);
router.get('/assignments/:assignmentId',           ctrl.getAssignmentById);
router.post('/assignments/:assignmentId/submit',   ctrl.submitAssignment);

/* ─── Attendance ───────── */
router.get('/attendance',              ctrl.getAttendance);
router.get('/attendance/:courseId',    ctrl.getAttendanceByCourse);

/* ─── Grades & Exams ───── */
router.get('/grades',              ctrl.getGrades);
router.get('/grades/:courseId',    ctrl.getGradesByCourse);
router.get('/exams',               ctrl.getExams);

/* ─── Progress ─────────── */
router.get('/progress',            ctrl.getProgress);
router.post('/progress/compute',   ctrl.computeProgress);

/* ─── AI Insights ──────── */
router.get('/insights',                              ctrl.getInsights);
router.post('/insights/analyze',                     ctrl.triggerAnalysis);
router.patch('/insights/alerts/:alertId/read',       ctrl.markAlertRead);

/* ─── Reports ──────────── */
router.get('/reports',              ctrl.getReports);
router.post('/reports/generate',    ctrl.generateReport);

module.exports = router;
