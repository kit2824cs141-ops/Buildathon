import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Initial mock datasets for seamless client-side operation & backend integration
export const initialAdminStats = {
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

export const initialStudents = [
  { id: 'STU-1001', name: 'Alex Smith', email: 'alex.smith@college.edu', department: 'Computer Science', gpa: 9.2, attendance: 62, status: 'Active', enrolledCourses: 4 },
  { id: 'STU-1002', name: 'Priya Sharma', email: 'priya.sharma@college.edu', department: 'Electrical Eng.', gpa: 7.8, attendance: 88, status: 'Active', enrolledCourses: 3 },
  { id: 'STU-1003', name: 'Marcus Vance', email: 'marcus.vance@college.edu', department: 'Mathematics', gpa: 8.4, attendance: 68, status: 'Pending', enrolledCourses: 5 },
  { id: 'STU-1004', name: 'Sophia Chen', email: 'sophia.chen@college.edu', department: 'Computer Science', gpa: 9.8, attendance: 96, status: 'Active', enrolledCourses: 4 },
  { id: 'STU-1005', name: 'David Miller', email: 'david.miller@college.edu', department: 'Physics', gpa: 6.2, attendance: 54, status: 'Suspended', enrolledCourses: 2 },
];

export const initialTeachers = [
  { id: 'TCH-201', name: 'Dr. Alan Turing', email: 'alan.turing@college.edu', department: 'Computer Science', coursesAssigned: ['CS-101', 'CS-201', 'AI-401'], status: 'Active', rating: 4.9 },
  { id: 'TCH-202', name: 'Prof. Katherine Johnson', email: 'k.johnson@college.edu', department: 'Mathematics', coursesAssigned: ['MATH-202', 'MATH-301'], status: 'Active', rating: 4.8 },
  { id: 'TCH-203', name: 'Dr. Richard Feynman', email: 'r.feynman@college.edu', department: 'Physics', coursesAssigned: ['PHYS-101', 'PHYS-302'], status: 'Active', rating: 5.0 },
  { id: 'TCH-204', name: 'Prof. Ada Lovelace', email: 'ada.lovelace@college.edu', department: 'Computer Science', coursesAssigned: ['CS-305'], status: 'On Leave', rating: 4.7 }
];

export const initialCourses = [
  { id: 'CS-101', title: 'Introduction to Computer Science', department: 'Computer Science', instructor: 'Dr. Alan Turing', studentsEnrolled: 45, credits: 4, status: 'Active' },
  { id: 'CS-201', title: 'Data Structures & Algorithms', department: 'Computer Science', instructor: 'Dr. Alan Turing', studentsEnrolled: 38, credits: 4, status: 'Active' },
  { id: 'MATH-202', title: 'Linear Algebra & Calculus', department: 'Mathematics', instructor: 'Prof. Katherine Johnson', studentsEnrolled: 52, credits: 3, status: 'Active' },
  { id: 'PHYS-101', title: 'Quantum Physics Fundamentals', department: 'Physics', instructor: 'Dr. Richard Feynman', studentsEnrolled: 29, credits: 4, status: 'Active' }
];

export const initialAssignments = [
  { id: 'ASN-301', title: 'Binary Tree Implementation', course: 'CS-201', dueDate: '2026-08-25', totalSubmissions: 32, maxStudents: 38, status: 'Active' },
  { id: 'ASN-302', title: 'Matrix Eigenvalues Problem Set', course: 'MATH-202', dueDate: '2026-08-20', totalSubmissions: 48, maxStudents: 52, status: 'Active' },
  { id: 'ASN-303', title: 'Schrödinger Wave Equation Lab', course: 'PHYS-101', dueDate: '2026-08-15', totalSubmissions: 29, maxStudents: 29, status: 'Closed' }
];

export const initialExams = [
  { id: 'EX-901', name: 'Midterm Assessment - Data Structures', course: 'CS-201', date: '2026-09-10', passPercentage: '84%', status: 'Published' },
  { id: 'EX-902', name: 'Linear Algebra Final Exam', course: 'MATH-202', date: '2026-09-15', passPercentage: '91%', status: 'Scheduled' },
  { id: 'EX-903', name: 'Quantum Mechanics Lab Practical', course: 'PHYS-101', date: '2026-09-02', passPercentage: '78%', status: 'Pending Review' }
];

// Admin API calls with fallback to local mock data
export const adminApi = {
  getStats: async () => {
    try {
      const res = await api.get('/admin/stats');
      return res.data;
    } catch (e) {
      return initialAdminStats;
    }
  },
  getStudents: async () => {
    try {
      const res = await api.get('/admin/students');
      return res.data;
    } catch (e) {
      return initialStudents;
    }
  },
  getTeachers: async () => {
    try {
      const res = await api.get('/admin/teachers');
      return res.data;
    } catch (e) {
      return initialTeachers;
    }
  },
  getCourses: async () => {
    try {
      const res = await api.get('/admin/courses');
      return res.data;
    } catch (e) {
      return initialCourses;
    }
  },
  getAssignments: async () => {
    try {
      const res = await api.get('/admin/assignments');
      return res.data;
    } catch (e) {
      return initialAssignments;
    }
  },
  getExams: async () => {
    try {
      const res = await api.get('/admin/exams');
      return res.data;
    } catch (e) {
      return initialExams;
    }
  }
};

export default api;
