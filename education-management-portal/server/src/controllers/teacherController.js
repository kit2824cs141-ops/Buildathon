// teacherController.js — handles /api/teacher/* routes
const courseService      = require('../services/courseService');
const assignmentService  = require('../services/assignmentService');
const attendanceService  = require('../services/attendanceService');
const examService        = require('../services/examService');
const reportService      = require('../services/reportService');
const aiService          = require('../services/aiService');
const userService        = require('../services/userService');

/* ─── PROFILE ─────────────────────────────────────────────── */

/** GET /api/teacher/profile */
const getProfile = async (req, res) => {
  try {
    const user = await userService.getUserById(req.user.uid);
    res.json({ success: true, data: user });
  } catch (e) {
    res.status(404).json({ success: false, message: e.message });
  }
};

/* ─── COURSES ─────────────────────────────────────────────── */

/** GET /api/teacher/courses — courses assigned to this teacher */
const getMyCourses = async (req, res) => {
  try {
    const user    = await userService.getUserById(req.user.uid);
    const ids     = Object.keys(user.teacherInfo?.assignedCourses || {});
    const courses = await Promise.all(ids.map((id) => courseService.getCourseById(id)));
    res.json({ success: true, data: courses });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/** GET /api/teacher/courses/:courseId */
const getCourseDetails = async (req, res) => {
  try {
    const course = await courseService.getCourseById(req.params.courseId);
    res.json({ success: true, data: course });
  } catch (e) {
    res.status(404).json({ success: false, message: e.message });
  }
};

/** POST /api/teacher/courses/:courseId/announcements */
const addAnnouncement = async (req, res) => {
  try {
    const { title, message, isImportant } = req.body;
    const data = await courseService.addCourseAnnouncement(req.params.courseId, { title, message, isImportant: !!isImportant, authorId: req.user.uid });
    res.status(201).json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/* ─── ASSIGNMENTS ─────────────────────────────────────────── */

/** GET /api/teacher/assignments */
const getAssignments = async (req, res) => {
  try {
    const { courseId } = req.query;
    const data = courseId
      ? await assignmentService.getAssignmentsByCourse(courseId)
      : await assignmentService.getAllAssignments();
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/** POST /api/teacher/assignments */
const createAssignment = async (req, res) => {
  try {
    const data = await assignmentService.createAssignment(req.body);
    res.status(201).json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/** PUT /api/teacher/assignments/:assignmentId */
const updateAssignment = async (req, res) => {
  try {
    const data = await assignmentService.updateAssignment(req.params.assignmentId, req.body);
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/** DELETE /api/teacher/assignments/:assignmentId */
const deleteAssignment = async (req, res) => {
  try {
    await assignmentService.deleteAssignment(req.params.assignmentId);
    res.json({ success: true, message: 'Assignment deleted' });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/** GET /api/teacher/assignments/:assignmentId/submissions */
const getSubmissions = async (req, res) => {
  try {
    const data = await assignmentService.getAllSubmissions(req.params.assignmentId);
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/** PATCH /api/teacher/assignments/:assignmentId/submissions/:studentId/grade */
const gradeSubmission = async (req, res) => {
  try {
    const { marks, feedback } = req.body;
    await assignmentService.gradeSubmission(req.params.assignmentId, req.params.studentId, { marks, feedback });
    res.json({ success: true, message: 'Submission graded' });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/* ─── ATTENDANCE ──────────────────────────────────────────── */

/** POST /api/teacher/attendance/:classId/:date — mark attendance */
const markAttendance = async (req, res) => {
  try {
    const { courseId, records } = req.body;
    const data = await attendanceService.markAttendance(
      req.params.classId,
      req.params.date,
      { courseId, teacherId: req.user.uid, records }
    );
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/** GET /api/teacher/attendance/:classId */
const getClassAttendance = async (req, res) => {
  try {
    const data = await attendanceService.getAttendanceByClass(req.params.classId);
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/** GET /api/teacher/attendance/:classId/:date */
const getAttendanceByDate = async (req, res) => {
  try {
    const data = await attendanceService.getAttendanceByDate(req.params.classId, req.params.date);
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/** PATCH /api/teacher/attendance/:classId/:date/:studentId */
const updateStudentAttendance = async (req, res) => {
  try {
    const { status, note } = req.body;
    await attendanceService.updateStudentAttendance(
      req.params.classId, req.params.date, req.params.studentId, { status, note }
    );
    res.json({ success: true, message: 'Attendance updated' });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/* ─── EXAMS & GRADES ──────────────────────────────────────── */

/** GET /api/teacher/exams?courseId= */
const getExams = async (req, res) => {
  try {
    const { courseId } = req.query;
    const data = courseId
      ? await examService.getExamsByCourse(courseId)
      : await examService.getAllExams();
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/** POST /api/teacher/exams */
const createExam = async (req, res) => {
  try {
    const data = await examService.createExam(req.body);
    res.status(201).json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/** POST /api/teacher/exams/:examId/results/:studentId */
const submitResult = async (req, res) => {
  try {
    const data = await examService.submitResult(
      req.params.examId,
      req.params.studentId,
      req.body
    );
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/** GET /api/teacher/exams/:examId/results */
const getExamResults = async (req, res) => {
  try {
    const data = await examService.getAllResults(req.params.examId);
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/* ─── STUDENTS ────────────────────────────────────────────── */

/** GET /api/teacher/students — get all students */
const getStudents = async (req, res) => {
  try {
    const data = await userService.getUsersByRole('student');
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/** GET /api/teacher/students/:studentId/insights */
const getStudentInsights = async (req, res) => {
  try {
    const data = await aiService.getStudentInsights(req.params.studentId);
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/* ─── REPORTS ─────────────────────────────────────────────── */

/** GET /api/teacher/reports/class/:classId */
const getClassReports = async (req, res) => {
  try {
    const data = await reportService.getClassReports(req.params.classId);
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/** POST /api/teacher/reports/class/:classId/generate */
const generateClassReport = async (req, res) => {
  try {
    const { courseId } = req.body;
    const data = await reportService.generateClassReport(req.params.classId, courseId);
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

module.exports = {
  getProfile,
  getMyCourses, getCourseDetails, addAnnouncement,
  getAssignments, createAssignment, updateAssignment, deleteAssignment,
  getSubmissions, gradeSubmission,
  markAttendance, getClassAttendance, getAttendanceByDate, updateStudentAttendance,
  getExams, createExam, submitResult, getExamResults,
  getStudents, getStudentInsights,
  getClassReports, generateClassReport,
};
