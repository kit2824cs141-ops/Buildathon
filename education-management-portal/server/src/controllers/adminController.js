<<<<<<< HEAD
// Admin Controller - Handlers for Admin Dashboard API Endpoints

let statsData = {
  totalColleges: 4,
  activeSubscriptions: 3,
  totalStudents: 151,
  totalTeachers: 28,
  totalCourses: 14,
  totalProcessedVolume: '₹4,85,000',
  revenueSubtitle: 'Global Revenue Ledger',
  activeAssignments: 18,
  pendingExams: 4,
  aiAlerts: 3
};

let studentsData = [
  { id: 'STU-1001', name: 'Alex Smith', email: 'alex.smith@college.edu', department: 'Computer Science', gpa: 9.2, attendance: 62, status: 'Active', enrolledCourses: 4 },
  { id: 'STU-1002', name: 'Priya Sharma', email: 'priya.sharma@college.edu', department: 'Electrical Eng.', gpa: 7.8, attendance: 88, status: 'Active', enrolledCourses: 3 },
  { id: 'STU-1003', name: 'Marcus Vance', email: 'marcus.vance@college.edu', department: 'Mathematics', gpa: 8.4, attendance: 68, status: 'Pending', enrolledCourses: 5 },
  { id: 'STU-1004', name: 'Sophia Chen', email: 'sophia.chen@college.edu', department: 'Computer Science', gpa: 9.8, attendance: 96, status: 'Active', enrolledCourses: 4 },
  { id: 'STU-1005', name: 'David Miller', email: 'david.miller@college.edu', department: 'Physics', gpa: 6.2, attendance: 54, status: 'Suspended', enrolledCourses: 2 },
];

let teachersData = [
  { id: 'TCH-201', name: 'Dr. Alan Turing', email: 'alan.turing@college.edu', department: 'Computer Science', coursesAssigned: ['CS-101', 'CS-201', 'AI-401'], status: 'Active', rating: 4.9 },
  { id: 'TCH-202', name: 'Prof. Katherine Johnson', email: 'k.johnson@college.edu', department: 'Mathematics', coursesAssigned: ['MATH-202', 'MATH-301'], status: 'Active', rating: 4.8 },
  { id: 'TCH-203', name: 'Dr. Richard Feynman', email: 'r.feynman@college.edu', department: 'Physics', coursesAssigned: ['PHYS-101', 'PHYS-302'], status: 'Active', rating: 5.0 },
  { id: 'TCH-204', name: 'Prof. Ada Lovelace', email: 'ada.lovelace@college.edu', department: 'Computer Science', coursesAssigned: ['CS-305'], status: 'On Leave', rating: 4.7 }
];

let coursesData = [
  { id: 'CS-101', title: 'Introduction to Computer Science', department: 'Computer Science', instructor: 'Dr. Alan Turing', studentsEnrolled: 45, credits: 4, status: 'Active' },
  { id: 'CS-201', title: 'Data Structures & Algorithms', department: 'Computer Science', instructor: 'Dr. Alan Turing', studentsEnrolled: 38, credits: 4, status: 'Active' },
  { id: 'MATH-202', title: 'Linear Algebra & Calculus', department: 'Mathematics', instructor: 'Prof. Katherine Johnson', studentsEnrolled: 52, credits: 3, status: 'Active' },
  { id: 'PHYS-101', title: 'Quantum Physics Fundamentals', department: 'Physics', instructor: 'Dr. Richard Feynman', studentsEnrolled: 29, credits: 4, status: 'Active' }
];

let assignmentsData = [
  { id: 'ASN-301', title: 'Binary Tree Implementation', course: 'CS-201', dueDate: '2026-08-25', totalSubmissions: 32, maxStudents: 38, status: 'Active' },
  { id: 'ASN-302', title: 'Matrix Eigenvalues Problem Set', course: 'MATH-202', dueDate: '2026-08-20', totalSubmissions: 48, maxStudents: 52, status: 'Active' },
  { id: 'ASN-303', title: 'Schrödinger Wave Equation Lab', course: 'PHYS-101', dueDate: '2026-08-15', totalSubmissions: 29, maxStudents: 29, status: 'Closed' }
];

let examsData = [
  { id: 'EX-901', name: 'Midterm Assessment - Data Structures', course: 'CS-201', date: '2026-09-10', passPercentage: '84%', status: 'Published' },
  { id: 'EX-902', name: 'Linear Algebra Final Exam', course: 'MATH-202', date: '2026-09-15', passPercentage: '91%', status: 'Scheduled' },
  { id: 'EX-903', name: 'Quantum Mechanics Lab Practical', course: 'PHYS-101', date: '2026-09-02', passPercentage: '78%', status: 'Pending Review' }
];

// Controller Exports
module.exports = {
  getStats: (req, res) => {
    res.json({ success: true, data: statsData });
  },
  
  getStudents: (req, res) => {
    res.json({ success: true, data: studentsData });
  },

  addStudent: (req, res) => {
    const newStudent = {
      id: `STU-${Math.floor(1000 + Math.random() * 9000)}`,
      name: req.body.name || 'New Student',
      email: req.body.email || 'student@college.edu',
      department: req.body.department || 'Computer Science',
      gpa: req.body.gpa || 3.5,
      attendance: req.body.attendance || 85,
      status: req.body.status || 'Active',
      enrolledCourses: 3
    };
    studentsData.unshift(newStudent);
    res.status(201).json({ success: true, message: 'Student added successfully', data: newStudent });
  },

  deleteStudent: (req, res) => {
    const { id } = req.params;
    studentsData = studentsData.filter(s => s.id !== id);
    res.json({ success: true, message: 'Student deleted successfully' });
  },

  getTeachers: (req, res) => {
    res.json({ success: true, data: teachersData });
  },

  addTeacher: (req, res) => {
    const newTeacher = {
      id: `TCH-${Math.floor(100 + Math.random() * 900)}`,
      name: req.body.name,
      email: req.body.email,
      department: req.body.department || 'Computer Science',
      coursesAssigned: req.body.courses || ['CS-101'],
      status: 'Active',
      rating: 4.8
    };
    teachersData.unshift(newTeacher);
    res.status(201).json({ success: true, message: 'Teacher added successfully', data: newTeacher });
  },

  getCourses: (req, res) => {
    res.json({ success: true, data: coursesData });
  },

  addCourse: (req, res) => {
    const newCourse = {
      id: req.body.id || `CS-${Math.floor(100 + Math.random() * 900)}`,
      title: req.body.title,
      department: req.body.department || 'Computer Science',
      instructor: req.body.instructor || 'Dr. Alan Turing',
      studentsEnrolled: req.body.studentsEnrolled || 30,
      credits: req.body.credits || 3,
      status: 'Active'
    };
    coursesData.unshift(newCourse);
    res.status(201).json({ success: true, message: 'Course created successfully', data: newCourse });
  },

  getAssignments: (req, res) => {
    res.json({ success: true, data: assignmentsData });
  },

  getExams: (req, res) => {
    res.json({ success: true, data: examsData });
  },

  getAIInsights: (req, res) => {
    res.json({
      success: true,
      data: {
        riskAlerts: [
          { studentId: 'STU-1001', name: 'Alex Smith', reason: 'Attendance dropped to 62%', severity: 'High' },
          { studentId: 'STU-1002', name: 'Priya Sharma', reason: 'Grade below 60% in MATH-202', severity: 'Medium' }
        ],
        systemHealth: 'Optimal',
        gradingAccuracy: '99.4%'
      }
    });
  }
};
=======
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
      // Course-level announcement
      await courseService.addCourseAnnouncement(courseId, payload);
    } else {
      // Global announcement under /announcements
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
  getAllUsers, getUserById, getUsersByRole, updateUser, deleteUser, setUserRole,
  getAllCourses, createCourse, updateCourse, deleteCourse,
  getAllClasses, createClass, updateClass, deleteClass,
  getAllExams, deleteExam,
  getAllInsights, getStudentInsights, analyzeStudent,
  createAnnouncement, getAnnouncements,
  getStudentReports, generateStudentReport, getClassReports, generateClassReport,
  getContactQueries,
};
>>>>>>> main
