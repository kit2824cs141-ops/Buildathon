// studentController.js — handles /api/student/* routes
const courseService      = require('../services/courseService');
const assignmentService  = require('../services/assignmentService');
const attendanceService  = require('../services/attendanceService');
const examService        = require('../services/examService');
const progressService    = require('../services/progressService');
const aiService          = require('../services/aiService');
const reportService      = require('../services/reportService');
const userService        = require('../services/userService');

/* ─── PROFILE ─────────────────────────────────────────────── */

/** GET /api/student/profile */
const getProfile = async (req, res) => {
  try {
    const user = await userService.getUserById(req.user.uid);
    res.json({ success: true, data: user });
  } catch (e) {
    res.status(404).json({ success: false, message: e.message });
  }
};

/* ─── COURSES ─────────────────────────────────────────────── */

/** GET /api/student/courses — returns all courses (public catalog) */
const getCourses = async (req, res) => {
  try {
    const courses = await courseService.getAllCourses();
    res.json({ success: true, data: courses });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/** GET /api/student/courses/:courseId */
const getCourseDetails = async (req, res) => {
  try {
    const course = await courseService.getCourseById(req.params.courseId);
    res.json({ success: true, data: course });
  } catch (e) {
    res.status(404).json({ success: false, message: e.message });
  }
};

/** POST /api/student/courses/:courseId/enroll */
const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId    = req.user.uid;
    await courseService.enrollStudent(courseId, studentId);
    await userService.enrollStudentInCourse(studentId, courseId);
    res.json({ success: true, message: 'Enrolled successfully' });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/** GET /api/student/my-courses */
const getMyCourses = async (req, res) => {
  try {
    const user = await userService.getUserById(req.user.uid);
    const enrolledIds = Object.keys(user.studentInfo?.enrolledCourses || {});
    const courses = await Promise.all(enrolledIds.map((id) => courseService.getCourseById(id)));
    res.json({ success: true, data: courses });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/* ─── ASSIGNMENTS ─────────────────────────────────────────── */

/** GET /api/student/assignments — all assignments for enrolled courses */
const getAssignments = async (req, res) => {
  try {
    const assignments = await assignmentService.getAllAssignments();
    res.json({ success: true, data: assignments });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/** GET /api/student/assignments/:assignmentId */
const getAssignmentById = async (req, res) => {
  try {
    const assignment = await assignmentService.getAssignmentById(req.params.assignmentId);
    const submission = await assignmentService.getStudentSubmission(req.params.assignmentId, req.user.uid);
    res.json({ success: true, data: { ...assignment, mySubmission: submission } });
  } catch (e) {
    res.status(404).json({ success: false, message: e.message });
  }
};

/** POST /api/student/assignments/:assignmentId/submit */
const submitAssignment = async (req, res) => {
  try {
    const { fileUrls, notes } = req.body;
    await assignmentService.submitAssignment(req.params.assignmentId, req.user.uid, { fileUrls, notes });
    res.json({ success: true, message: 'Assignment submitted' });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/* ─── ATTENDANCE ──────────────────────────────────────────── */

/** GET /api/student/attendance — attendance summary for all courses */
const getAttendance = async (req, res) => {
  try {
    const data = await attendanceService.getStudentAttendanceSummaries(req.user.uid);
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/** GET /api/student/attendance/:courseId */
const getAttendanceByCourse = async (req, res) => {
  try {
    const data = await attendanceService.getAttendanceSummary(req.user.uid, req.params.courseId);
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/* ─── GRADES / EXAMS ──────────────────────────────────────── */

/** GET /api/student/grades */
const getGrades = async (req, res) => {
  try {
    const data = await examService.getStudentGrades(req.user.uid);
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/** GET /api/student/grades/:courseId */
const getGradesByCourse = async (req, res) => {
  try {
    const data = await examService.getStudentGrades(req.user.uid, req.params.courseId);
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/** GET /api/student/exams */
const getExams = async (req, res) => {
  try {
    const data = await examService.getAllExams();
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/* ─── PROGRESS ────────────────────────────────────────────── */

/** GET /api/student/progress */
const getProgress = async (req, res) => {
  try {
    const data = await progressService.getStudentProgress(req.user.uid);
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/** POST /api/student/progress/compute — trigger progress recalculation */
const computeProgress = async (req, res) => {
  try {
    const data = await progressService.computeAndSaveProgress(req.user.uid);
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/* ─── AI INSIGHTS ─────────────────────────────────────────── */

/** GET /api/student/insights */
const getInsights = async (req, res) => {
  try {
    const data = await aiService.getStudentInsights(req.user.uid);
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/** POST /api/student/insights/analyze — trigger AI analysis */
const triggerAnalysis = async (req, res) => {
  try {
    const data = await aiService.analyzeAndSaveInsights(req.user.uid);
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/** PATCH /api/student/insights/alerts/:alertId/read */
const markAlertRead = async (req, res) => {
  try {
    await aiService.markAlertRead(req.user.uid, req.params.alertId);
    res.json({ success: true, message: 'Alert marked as read' });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/* ─── REPORTS ─────────────────────────────────────────────── */

/** GET /api/student/reports */
const getReports = async (req, res) => {
  try {
    const data = await reportService.getStudentReports(req.user.uid);
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/** POST /api/student/reports/generate */
const generateReport = async (req, res) => {
  try {
    const data = await reportService.generateStudentReport(req.user.uid);
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

module.exports = {
  getProfile,
  getCourses, getCourseDetails, enrollInCourse, getMyCourses,
  getAssignments, getAssignmentById, submitAssignment,
  getAttendance, getAttendanceByCourse,
  getGrades, getGradesByCourse, getExams,
  getProgress, computeProgress,
  getInsights, triggerAnalysis, markAlertRead,
  getReports, generateReport,
};
