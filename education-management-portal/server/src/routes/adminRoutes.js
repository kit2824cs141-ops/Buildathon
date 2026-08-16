// adminRoutes.js — /api/admin  (admin only)
const express  = require('express');
const router   = express.Router();


// Stats Endpoint
router.get('/stats', adminController.getStats);

// Student Management Endpoints
router.get('/students', adminController.getStudents);
router.post('/students', adminController.addStudent);
router.delete('/students/:id', adminController.deleteStudent);

// Teacher Management Endpoints
router.get('/teachers', adminController.getTeachers);
router.post('/teachers', adminController.addTeacher);

// Course Management Endpoints
router.get('/courses', adminController.getCourses);
router.post('/courses', adminController.addCourse);

// Assignment & Exam Endpoints
router.get('/assignments', adminController.getAssignments);
router.get('/exams', adminController.getExams);

// AI Insights Endpoint
router.get('/ai-insights', adminController.getAIInsights);

const ctrl             = require('../controllers/adminController');
const { verifyToken }  = require('../middleware/authMiddleware');
const { checkRole }    = require('../middleware/roleMiddleware');

// All admin routes require a valid token + admin role
router.use(verifyToken);
router.use(checkRole('admin'));

/* ─── Stats ────────────── */
router.get('/stats',                     ctrl.getStats);

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
