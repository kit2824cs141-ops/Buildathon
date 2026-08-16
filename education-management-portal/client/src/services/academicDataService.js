/**
 * Centralised Academic Data Service — Paper Buddy School Database
 *
 * This service acts as the SINGLE SOURCE OF TRUTH for all student, course,
 * assignment, class, and examination records. Both the UI dashboards, reports,
 * performance charts, AI Insights Hub, and AI Assistant chat query service
 * fetch data from this centralised mock database.
 *
 * All functions return Promises to resemble real API endpoints.
 * [API_INTEGRATION_POINT]: Replace mock database reads with axios/fetch HTTP calls.
 */

// ─── Centralized Mock Data Store ─────────────────────────────────────────────

const MOCK_DB = {
  students: [
    { id: '1', roll: 'CSE2601', name: 'Rahul Sharma', class: 'CSE-A (3rd Year)', attendance: 95, assignmentAvg: 88, examAvg: 85, overall: 86, risk: 'Low', missingAssignments: 0 },
    { id: '2', roll: 'CSE2602', name: 'Karthik Raj', class: 'CSE-A (3rd Year)', attendance: 62, assignmentAvg: 48, examAvg: 51, overall: 54, risk: 'High', missingAssignments: 4 },
    { id: '3', roll: 'CSE2603', name: 'Priya Nair', class: 'CSE-A (3rd Year)', attendance: 88, assignmentAvg: 72, examAvg: 78, overall: 76, risk: 'Medium', missingAssignments: 1 },
    { id: '4', roll: 'CSE2604', name: 'Aditya Sen', class: 'CSE-A (3rd Year)', attendance: 98, assignmentAvg: 95, examAvg: 92, overall: 94, risk: 'Low', missingAssignments: 0 },
    { id: '5', roll: 'CSE2605', name: 'Meera Das', class: 'CSE-A (3rd Year)', attendance: 91, assignmentAvg: 89, examAvg: 86, overall: 88, risk: 'Low', missingAssignments: 0 },
    { id: '6', roll: 'CSE2610', name: 'Siddharth Roy', class: 'CSE-B (2nd Year)', attendance: 75, assignmentAvg: 61, examAvg: 64, overall: 63, risk: 'Medium', missingAssignments: 2 },
    { id: '7', roll: 'CSE2611', name: 'Ananya Iyer', class: 'CSE-B (2nd Year)', attendance: 96, assignmentAvg: 92, examAvg: 90, overall: 91, risk: 'Low', missingAssignments: 0 },
    { id: '8', roll: 'CSE2612', name: 'Rohan Mehta', class: 'CSE-B (2nd Year)', attendance: 58, assignmentAvg: 44, examAvg: 47, overall: 49, risk: 'High', missingAssignments: 5 },
    { id: '9', roll: 'CSE2613', name: 'Divya Krishna', class: 'CSE-B (2nd Year)', attendance: 82, assignmentAvg: 70, examAvg: 73, overall: 72, risk: 'Low', missingAssignments: 1 }
  ],

  courses: [
    { id: 'c1', code: 'CS301', name: 'Data Structures & Algorithms', department: 'CSE', semester: 'Semester 5', studentsCount: 45, schedule: 'Mon, Wed 09:00 AM', progress: 75, teacher: 'Prof. Muruga Kumar', description: 'Advanced analysis of graph traversals, dynamic programming, heaps, and tree balancing structures.' },
    { id: 'c2', code: 'CS201', name: 'Database Management Systems', department: 'CSE', semester: 'Semester 3', studentsCount: 52, schedule: 'Tue, Thu 10:30 AM', progress: 60, teacher: 'Prof. Muruga Kumar', description: 'Study of relational databases, normalisation models (1NF-BCNF), and database transaction ACID compliance.' },
    { id: 'c3', code: 'CS401', name: 'Machine Learning', department: 'CSE', semester: 'Semester 7', studentsCount: 38, schedule: 'Fri 01:00 PM', progress: 85, teacher: 'Prof. Muruga Kumar', description: 'Core introductory algorithms including regression models, classifier trees, neural networks, and regularisation.' },
    { id: 'c4', code: 'IT301', name: 'Operating Systems', department: 'IT', semester: 'Semester 5', studentsCount: 16, schedule: 'Fri 03:00 PM', progress: 45, teacher: 'Prof. Muruga Kumar', description: 'Examination of concurrent process threads, scheduling simulations, deadlocks, and virtual memory.' }
  ],

  classes: [
    { id: 'cls1', name: 'CSE-A', section: '3rd Year', studentsCount: 45, subjects: ['Data Structures & Algorithms', 'Theory of Computation'], schedule: 'Mon-Wed-Fri', avgPerformance: 82, attendancePercentage: 92 },
    { id: 'cls2', name: 'CSE-B', section: '2nd Year', studentsCount: 52, subjects: ['Database Management Systems', 'Discrete Mathematics'], schedule: 'Tue-Thu', avgPerformance: 76, attendancePercentage: 88 },
    { id: 'cls3', name: 'IT-A', section: '3rd Year', studentsCount: 16, subjects: ['Operating Systems', 'Computer Networks'], schedule: 'Fri Only', avgPerformance: 64, attendancePercentage: 74 }
  ],

  assignments: [
    { id: 'a1', title: 'Binary Tree Traversal', course: 'DSA', class: 'CSE-A (3rd Year)', dueDate: 'Aug 18, 2026', submissions: 38, total: 45, pendingGrading: 12, status: 'Active' },
    { id: 'a2', title: 'ER Diagram Design', course: 'DBMS', class: 'CSE-B (2nd Year)', dueDate: 'Aug 15, 2026', submissions: 50, total: 52, pendingGrading: 0, status: 'Completed' },
    { id: 'a3', title: 'Linear Regression Model', course: 'ML', class: 'CSE-A (3rd Year)', dueDate: 'Aug 22, 2026', submissions: 15, total: 38, pendingGrading: 15, status: 'Active' },
    { id: 'a4', title: 'Process Scheduling Sim', course: 'OS', class: 'IT-A (3rd Year)', dueDate: 'Aug 20, 2026', submissions: 5, total: 16, pendingGrading: 5, status: 'Active' },
    { id: 'a5', title: 'SQL Joins Worksheet', course: 'DBMS', class: 'CSE-B (2nd Year)', dueDate: 'Aug 12, 2026', submissions: 52, total: 52, pendingGrading: 0, status: 'Completed' }
  ],

  examinations: [
    { id: 'ex1', title: 'DSA Mid-Semester Examination', class: 'CSE-A (3rd Year)', course: 'Data Structures & Algorithms', date: 'Aug 24, 2026', maxMarks: 100, duration: '2 Hours', syllabus: 'Trees, Graphs, BFS/DFS, Heaps, and Priority Queues', status: 'Upcoming' },
    { id: 'ex2', title: 'DBMS Mid-Semester Assessment', class: 'CSE-B (2nd Year)', course: 'Database Management Systems', date: 'Aug 25, 2026', maxMarks: 50, duration: '1 Hour', syllabus: 'Relational Model, Normalization, SQL DDL/DML, Relational Algebra', status: 'Upcoming' },
    { id: 'ex3', title: 'Machine Learning Class Quiz', class: 'CSE-A (3rd Year)', course: 'Machine Learning', date: 'Aug 10, 2026', maxMarks: 20, duration: '45 Mins', syllabus: 'Linear Regression, Gradient Descent, Overfitting', status: 'Completed', classAvg: 85, passRate: 94, highestScore: 20 },
    { id: 'ex4', title: 'Operating Systems Term Exam', class: 'IT-A (3rd Year)', course: 'Operating Systems', date: 'Aug 12, 2026', maxMarks: 100, duration: '2 Hours', syllabus: 'Process Sync, Semaphore, Deadlock detection', status: 'Completed', classAvg: 64, passRate: 78, highestScore: 92 }
  ],

  timetable: [
    { day: 'Monday', time: '09:00 AM', subject: 'Data Structures & Algorithms', room: 'Room 301 • CSE-A (3rd Year)' },
    { day: 'Tuesday', time: '10:30 AM', subject: 'Database Management Systems', room: 'Room 204 • CSE-B (2nd Year)' },
    { day: 'Wednesday', time: '09:00 AM', subject: 'Data Structures & Algorithms', room: 'Room 301 • CSE-A (3rd Year)' },
    { day: 'Thursday', time: '10:30 AM', subject: 'Database Management Systems', room: 'Room 204 • CSE-B (2nd Year)' },
    { day: 'Friday', time: '01:00 PM', subject: 'Machine Learning Lab', room: 'Lab 102 • CSE-A (4th Year)' },
    { day: 'Friday', time: '03:00 PM', subject: 'Operating Systems', room: 'Room 405 • IT-A (3rd Year)' }
  ],

  weakTopics: [
    { subject: 'Data Structures & Algorithms', topic: 'Graph Traversal (BFS/DFS)', avgScore: 48, studentsStruggling: 28, maxStudents: 45, severity: 'High', color: 'danger' },
    { subject: 'Data Structures & Algorithms', topic: 'Dynamic Programming', avgScore: 52, studentsStruggling: 22, maxStudents: 45, severity: 'High', color: 'danger' },
    { subject: 'Database Management Systems', topic: 'Normalization (BCNF / 4NF)', avgScore: 55, studentsStruggling: 30, maxStudents: 52, severity: 'High', color: 'danger' },
    { subject: 'Theory of Computation', topic: 'Turing Machines & Decidability', avgScore: 44, struggling: 38, studentsStruggling: 38, maxStudents: 45, severity: 'Critical', color: 'critical' }
  ]
};

// ─── Service API Layer ───────────────────────────────────────────────────────

export async function getStudents() {
  await delay(100);
  return [...MOCK_DB.students];
}

export async function getStudentById(id) {
  await delay(100);
  return MOCK_DB.students.find(s => s.id === id) || null;
}

export async function getCourses() {
  await delay(100);
  return [...MOCK_DB.courses];
}

export async function getCourseById(id) {
  await delay(100);
  return MOCK_DB.courses.find(c => c.id === id) || null;
}

export async function getClasses() {
  await delay(100);
  return [...MOCK_DB.classes];
}

export async function getClassById(id) {
  await delay(100);
  return MOCK_DB.classes.find(c => c.id === id) || null;
}

export async function getAssignments() {
  await delay(100);
  return [...MOCK_DB.assignments];
}

export async function getAssignmentById(id) {
  await delay(100);
  return MOCK_DB.assignments.find(a => a.id === id) || null;
}

export async function getExaminations() {
  await delay(100);
  return [...MOCK_DB.examinations];
}

export async function getExaminationById(id) {
  await delay(100);
  return MOCK_DB.examinations.find(e => e.id === id) || null;
}

export async function getTimetable() {
  await delay(100);
  return [...MOCK_DB.timetable];
}

export async function getWeakTopicsList() {
  await delay(100);
  return [...MOCK_DB.weakTopics];
}

// ─── Utility ─────────────────────────────────────────────────────────────────
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
