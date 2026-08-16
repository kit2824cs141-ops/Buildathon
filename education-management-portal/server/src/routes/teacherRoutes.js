// teacherRoutes.js — /api/teacher  (all routes require teacher login)
const express  = require('express');
const router   = express.Router();

const ctrl             = require('../controllers/teacherController');
const { verifyToken }  = require('../middleware/authMiddleware');
const { checkRole }    = require('../middleware/roleMiddleware');

// All teacher routes are protected + role-gated
router.use(verifyToken);
router.use(checkRole('teacher', 'admin'));

/* ─── Profile ──────────── */
router.get('/profile', ctrl.getProfile);

/* ─── Courses ──────────── */
router.get('/courses',                                    ctrl.getMyCourses);
router.get('/courses/:courseId',                          ctrl.getCourseDetails);
router.post('/courses/:courseId/announcements',           ctrl.addAnnouncement);

/* ─── Assignments ──────── */
router.get('/assignments',                                          ctrl.getAssignments);   // ?courseId=
router.post('/assignments',                                         ctrl.createAssignment);
router.put('/assignments/:assignmentId',                            ctrl.updateAssignment);
router.delete('/assignments/:assignmentId',                         ctrl.deleteAssignment);
router.get('/assignments/:assignmentId/submissions',                ctrl.getSubmissions);
router.patch('/assignments/:assignmentId/submissions/:studentId/grade', ctrl.gradeSubmission);

/* ─── Attendance ───────── */
router.post('/attendance/:classId/:date',                     ctrl.markAttendance);
router.get('/attendance/:classId',                            ctrl.getClassAttendance);
router.get('/attendance/:classId/:date',                      ctrl.getAttendanceByDate);
router.patch('/attendance/:classId/:date/:studentId',         ctrl.updateStudentAttendance);

/* ─── Exams & Grades ───── */
router.get('/exams',                                    ctrl.getExams);               // ?courseId=
router.post('/exams',                                   ctrl.createExam);
router.post('/exams/:examId/results/:studentId',        ctrl.submitResult);
router.get('/exams/:examId/results',                    ctrl.getExamResults);

/* ─── Students ─────────── */
router.get('/students',                          ctrl.getStudents);
router.get('/students/:studentId/insights',      ctrl.getStudentInsights);

/* ─── Reports ──────────── */
router.get('/reports/class/:classId',               ctrl.getClassReports);
router.post('/reports/class/:classId/generate',     ctrl.generateClassReport);

module.exports = router;
