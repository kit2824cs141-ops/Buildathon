// api.js — centralised Axios client for all backend routes
// The base URL reads from VITE_API_URL (set this to http://localhost:5000/api in dev)
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// ─── Request interceptor — auto-attach Firebase ID token ──────────────────────
// Import dynamically to avoid circular deps with AuthContext
api.interceptors.request.use(async (config) => {
  try {
    const { auth } = await import('../config/firebase');
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (_) {}
  return config;
});

/* ══════════════════════════════════════════════════════════════
   AUTH
══════════════════════════════════════════════════════════════ */
export const authApi = {
  register: (data)  => api.post('/auth/register', data),
  login:    (data)  => api.post('/auth/login',    data),
  getMe:    ()      => api.get('/auth/me'),
  updateMe: (data)  => api.put('/auth/me',        data),
};

/* ══════════════════════════════════════════════════════════════
   STUDENT
══════════════════════════════════════════════════════════════ */
export const studentApi = {
  // Profile
  getProfile:        ()           => api.get('/student/profile'),

  // Courses
  getCourses:        ()           => api.get('/student/courses'),
  getCourseDetails:  (id)         => api.get(`/student/courses/${id}`),
  enrollInCourse:    (id)         => api.post(`/student/courses/${id}/enroll`),
  getMyCourses:      ()           => api.get('/student/my-courses'),

  // Assignments
  getAssignments:    ()           => api.get('/student/assignments'),
  getAssignment:     (id)         => api.get(`/student/assignments/${id}`),
  submitAssignment:  (id, data)   => api.post(`/student/assignments/${id}/submit`, data),

  // Attendance
  getAttendance:     ()           => api.get('/student/attendance'),
  getAttendanceByCourse: (id)     => api.get(`/student/attendance/${id}`),

  // Grades & Exams
  getGrades:         ()           => api.get('/student/grades'),
  getGradesByCourse: (id)         => api.get(`/student/grades/${id}`),
  getExams:          ()           => api.get('/student/exams'),

  // Progress
  getProgress:       ()           => api.get('/student/progress'),
  computeProgress:   ()           => api.post('/student/progress/compute'),

  // AI Insights
  getInsights:       ()           => api.get('/student/insights'),
  analyzeInsights:   ()           => api.post('/student/insights/analyze'),
  markAlertRead:     (alertId)    => api.patch(`/student/insights/alerts/${alertId}/read`),

  // Reports
  getReports:        ()           => api.get('/student/reports'),
  generateReport:    ()           => api.post('/student/reports/generate'),
};

/* ══════════════════════════════════════════════════════════════
   TEACHER
══════════════════════════════════════════════════════════════ */
export const teacherApi = {
  // Profile
  getProfile:          ()              => api.get('/teacher/profile'),

  // Courses
  getMyCourses:        ()              => api.get('/teacher/courses'),
  getCourseDetails:    (id)            => api.get(`/teacher/courses/${id}`),
  addAnnouncement:     (id, data)      => api.post(`/teacher/courses/${id}/announcements`, data),

  // Assignments
  getAssignments:      (courseId)      => api.get('/teacher/assignments', { params: { courseId } }),
  createAssignment:    (data)          => api.post('/teacher/assignments', data),
  updateAssignment:    (id, data)      => api.put(`/teacher/assignments/${id}`, data),
  deleteAssignment:    (id)            => api.delete(`/teacher/assignments/${id}`),
  getSubmissions:      (id)            => api.get(`/teacher/assignments/${id}/submissions`),
  gradeSubmission:     (id, sid, data) => api.patch(`/teacher/assignments/${id}/submissions/${sid}/grade`, data),

  // Attendance
  markAttendance:      (classId, date, data) => api.post(`/teacher/attendance/${classId}/${date}`, data),
  getClassAttendance:  (classId)       => api.get(`/teacher/attendance/${classId}`),
  getAttendanceByDate: (classId, date) => api.get(`/teacher/attendance/${classId}/${date}`),
  updateStudentAttendance: (classId, date, sid, data) => api.patch(`/teacher/attendance/${classId}/${date}/${sid}`, data),

  // Exams
  getExams:            (courseId)      => api.get('/teacher/exams', { params: { courseId } }),
  createExam:          (data)          => api.post('/teacher/exams', data),
  submitResult:        (examId, sid, data) => api.post(`/teacher/exams/${examId}/results/${sid}`, data),
  getExamResults:      (examId)        => api.get(`/teacher/exams/${examId}/results`),

  // Students
  getStudents:         ()              => api.get('/teacher/students'),
  getStudentInsights:  (sid)           => api.get(`/teacher/students/${sid}/insights`),

  // Reports
  getClassReports:     (classId)       => api.get(`/teacher/reports/class/${classId}`),
  generateClassReport: (classId, data) => api.post(`/teacher/reports/class/${classId}/generate`, data),
};

/* ══════════════════════════════════════════════════════════════
   ADMIN
══════════════════════════════════════════════════════════════ */
export const adminApi = {
  // Stats
  getStats:            ()              => api.get('/admin/stats'),

  // Users
  getAllUsers:          ()              => api.get('/admin/users'),
  getUsersByRole:       (role)          => api.get(`/admin/users/role/${role}`),
  getUserById:          (uid)           => api.get(`/admin/users/${uid}`),
  updateUser:           (uid, data)     => api.put(`/admin/users/${uid}`, data),
  deleteUser:           (uid)           => api.delete(`/admin/users/${uid}`),
  setUserRole:          (uid, role)     => api.patch(`/admin/users/${uid}/role`, { role }),

  // Courses
  getAllCourses:        ()              => api.get('/admin/courses'),
  createCourse:        (data)          => api.post('/admin/courses', data),
  updateCourse:        (id, data)      => api.put(`/admin/courses/${id}`, data),
  deleteCourse:        (id)            => api.delete(`/admin/courses/${id}`),

  // Classes
  getAllClasses:        ()              => api.get('/admin/classes'),
  createClass:         (data)          => api.post('/admin/classes', data),
  updateClass:         (id, data)      => api.put(`/admin/classes/${id}`, data),
  deleteClass:         (id)            => api.delete(`/admin/classes/${id}`),

  // Exams
  getAllExams:          ()              => api.get('/admin/exams'),
  deleteExam:          (id)            => api.delete(`/admin/exams/${id}`),

  // AI Insights
  getAllInsights:       ()              => api.get('/admin/insights'),
  getStudentInsights:  (sid)           => api.get(`/admin/insights/${sid}`),
  analyzeStudent:      (sid)           => api.post(`/admin/insights/${sid}/analyze`),

  // Announcements
  getAnnouncements:    ()              => api.get('/admin/announcements'),
  createAnnouncement:  (data)          => api.post('/admin/announcements', data),

  // Reports
  getStudentReports:   (sid)           => api.get(`/admin/reports/student/${sid}`),
  generateStudentReport: (sid)         => api.post(`/admin/reports/student/${sid}/generate`),
  getClassReports:     (classId)       => api.get(`/admin/reports/class/${classId}`),
  generateClassReport: (classId, data) => api.post(`/admin/reports/class/${classId}/generate`, data),

  // Contact Queries
  getContactQueries:   ()              => api.get('/admin/contact-queries'),
};

export default api;
