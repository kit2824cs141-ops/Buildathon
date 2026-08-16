// adminController.js — handles /api/admin/* routes
const userService    = require('../services/userService');
const courseService  = require('../services/courseService');
const aiService      = require('../services/aiService');
const reportService  = require('../services/reportService');
const examService    = require('../services/examService');
const { db, auth }  = require('../config/firebase');

/* ─── USERS ───────────────────────────────────────────────── */

/** GET /api/admin/users */
const getAllUsers = async (req, res) => {
  try {
    const data = await userService.getAllUsers();
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/** GET /api/admin/users/:uid */
const getUserById = async (req, res) => {
  try {
    const data = await userService.getUserById(req.params.uid);
    res.json({ success: true, data });
  } catch (e) {
    res.status(404).json({ success: false, message: e.message });
  }
};

/** GET /api/admin/users/role/:role */
const getUsersByRole = async (req, res) => {
  try {
    const data = await userService.getUsersByRole(req.params.role);
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/** PUT /api/admin/users/:uid */
const updateUser = async (req, res) => {
  try {
    const user = await userService.createOrUpdateUser(req.params.uid, req.body);
    res.json({ success: true, data: user });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/** DELETE /api/admin/users/:uid */
const deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.uid);
    res.json({ success: true, message: 'User disabled successfully' });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/** PATCH /api/admin/users/:uid/role — set custom role claim */
const setUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!['student', 'teacher', 'admin'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role' });
    }
    await userService.setUserRoleClaim(req.params.uid, role);
    await db.ref(`users/${req.params.uid}/profile/role`).set(role);
    res.json({ success: true, message: `Role updated to ${role}` });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/* ─── STATS (aggregated for dashboard) ────────────────────── */

/** GET /api/admin/stats */
const getStats = async (req, res) => {
  try {
    const [studentsSnap, teachersSnap, coursesSnap] = await Promise.all([
      db.ref('users').orderByChild('profile/role').equalTo('student').once('value'),
      db.ref('users').orderByChild('profile/role').equalTo('teacher').once('value'),
      db.ref('courses').once('value'),
    ]);
    res.json({
      success: true,
      data: {
        totalStudents: studentsSnap.numChildren(),
        totalTeachers: teachersSnap.numChildren(),
        totalCourses:  coursesSnap.numChildren(),
      },
    });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/* ─── COURSES ─────────────────────────────────────────────── */

/** GET /api/admin/courses */
const getAllCourses = async (req, res) => {
  try {
    const data = await courseService.getAllCourses();
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/** POST /api/admin/courses */
const createCourse = async (req, res) => {
  try {
    const data = await courseService.createCourse(req.body);
    res.status(201).json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/** PUT /api/admin/courses/:courseId */
const updateCourse = async (req, res) => {
  try {
    const data = await courseService.updateCourse(req.params.courseId, req.body);
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/** DELETE /api/admin/courses/:courseId */
const deleteCourse = async (req, res) => {
  try {
    await courseService.deleteCourse(req.params.courseId);
    res.json({ success: true, message: 'Course deleted' });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/* ─── CLASSES ─────────────────────────────────────────────── */

/** GET /api/admin/classes */
const getAllClasses = async (req, res) => {
  try {
    const data = await courseService.getAllClasses();
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/** POST /api/admin/classes */
const createClass = async (req, res) => {
  try {
    const data = await courseService.createClass(req.body);
    res.status(201).json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/** PUT /api/admin/classes/:classId */
const updateClass = async (req, res) => {
  try {
    const data = await courseService.updateClass(req.params.classId, req.body);
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/** DELETE /api/admin/classes/:classId */
const deleteClass = async (req, res) => {
  try {
    await courseService.deleteClass(req.params.classId);
    res.json({ success: true, message: 'Class deleted' });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/* ─── EXAMS & GRADES ──────────────────────────────────────── */

/** GET /api/admin/exams */
const getAllExams = async (req, res) => {
  try {
    const data = await examService.getAllExams();
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/** DELETE /api/admin/exams/:examId */
const deleteExam = async (req, res) => {
  try {
    await examService.deleteExam(req.params.examId);
    res.json({ success: true, message: 'Exam deleted' });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/* ─── AI INSIGHTS ─────────────────────────────────────────── */

/** GET /api/admin/insights — all students' insights */
const getAllInsights = async (req, res) => {
  try {
    const data = await aiService.getAllInsights();
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/** GET /api/admin/insights/:studentId */
const getStudentInsights = async (req, res) => {
  try {
    const data = await aiService.getStudentInsights(req.params.studentId);
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/** POST /api/admin/insights/:studentId/analyze */
const analyzeStudent = async (req, res) => {
  try {
    const data = await aiService.analyzeAndSaveInsights(req.params.studentId);
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/* ─── ANNOUNCEMENTS ───────────────────────────────────────── */

/** POST /api/admin/announcements */
const createAnnouncement = async (req, res) => {
  try {
    const { title, message, isImportant, courseId } = req.body;
    const payload = {
      title,
      message,
      isImportant: !!isImportant,
      authorId: req.user.uid,
      createdAt: new Date().toISOString(),
    };
    if (courseId) {
      await courseService.addCourseAnnouncement(courseId, payload);
    } else {
      await db.ref('announcements').push(payload);
    }
    res.status(201).json({ success: true, data: payload });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/** GET /api/admin/announcements */
const getAnnouncements = async (req, res) => {
  try {
    const snap = await db.ref('announcements').once('value');
    const list = [];
    snap.forEach((a) => list.push({ id: a.key, ...a.val() }));
    res.json({ success: true, data: list });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/* ─── REPORTS ─────────────────────────────────────────────── */

/** GET /api/admin/reports/student/:studentId */
const getStudentReports = async (req, res) => {
  try {
    const data = await reportService.getStudentReports(req.params.studentId);
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/** POST /api/admin/reports/student/:studentId/generate */
const generateStudentReport = async (req, res) => {
  try {
    const data = await reportService.generateStudentReport(req.params.studentId);
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/** GET /api/admin/reports/class/:classId */
const getClassReports = async (req, res) => {
  try {
    const data = await reportService.getClassReports(req.params.classId);
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/** POST /api/admin/reports/class/:classId/generate */
const generateClassReport = async (req, res) => {
  try {
    const { courseId } = req.body;
    const data = await reportService.generateClassReport(req.params.classId, courseId);
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/* ─── CONTACT QUERIES ─────────────────────────────────────── */

/** GET /api/admin/contact-queries */
const getContactQueries = async (req, res) => {
  try {
    const snap = await db.ref('contact_queries').once('value');
    const list = [];
    snap.forEach((q) => list.push({ id: q.key, ...q.val() }));
    res.json({ success: true, data: list });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

module.exports = {
  getStats,
  getAllUsers, getUserById, getUsersByRole, updateUser, deleteUser, setUserRole,
  getAllCourses, createCourse, updateCourse, deleteCourse,
  getAllClasses, createClass, updateClass, deleteClass,
  getAllExams, deleteExam,
  getAllInsights, getStudentInsights, analyzeStudent,
  createAnnouncement, getAnnouncements,
  getStudentReports, generateStudentReport, getClassReports, generateClassReport,
  getContactQueries,
};
