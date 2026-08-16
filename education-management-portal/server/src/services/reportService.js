// reportService.js — RTDB /reports
const { db } = require('../config/firebase');

const studentReportRef = (studentId) => db.ref(`reports/student_reports/${studentId}`);
const classReportRef   = (classId)   => db.ref(`reports/class_reports/${classId}`);

/* ─── STUDENT REPORTS ─────────────────────────────────────── */

const getStudentReports = async (studentId) => {
  const snap = await studentReportRef(studentId).once('value');
  if (!snap.exists()) return [];
  const list = [];
  snap.forEach((r) => list.push({ id: r.key, ...r.val() }));
  return list;
};

/**
 * Generate a student performance report.
 * Reads /progress, /ai_insights, /grades → writes to /reports/student_reports/$studentId
 */
const generateStudentReport = async (studentId) => {
  const [progressSnap, insightsSnap, gradesSnap] = await Promise.all([
    db.ref(`progress/${studentId}`).once('value'),
    db.ref(`ai_insights/${studentId}`).once('value'),
    db.ref(`grades/${studentId}`).once('value'),
  ]);

  const progress = progressSnap.val() || {};
  const insights = insightsSnap.val() || {};
  const grades   = gradesSnap.val()   || {};

  const report = {
    type: 'student_performance',
    generatedAt: new Date().toISOString(),
    summary: {
      cgpa:               progress.overview?.cgpa               || 0,
      overallAttendance:  progress.overview?.overallAttendance  || 0,
      completionRate:     progress.overview?.completionRate      || 0,
      riskLevel:          insights.riskLevel                    || 'unknown',
      overallHealthScore: insights.overallHealthScore            || 0,
    },
    weakAreas:         insights.weakSubjects    || {},
    aiRecommendations: insights.recommendations || {},
    gradesSnapshot:    grades,
  };

  const ref = studentReportRef(studentId).push();
  await ref.set(report);
  return { id: ref.key, ...report };
};

/* ─── CLASS REPORTS ───────────────────────────────────────── */

const getClassReports = async (classId) => {
  const snap = await classReportRef(classId).once('value');
  if (!snap.exists()) return [];
  const list = [];
  snap.forEach((r) => list.push({ id: r.key, ...r.val() }));
  return list;
};

/**
 * Generate a class-level aggregate report.
 */
const generateClassReport = async (classId, courseId) => {
  const attendanceSnap = await db.ref(`attendance/${classId}`).once('value');
  const attendance     = attendanceSnap.val() || {};

  // Compute stats over all dates
  let totalSessions = 0, totalPresent = 0, totalStudents = new Set();
  for (const dateData of Object.values(attendance)) {
    totalSessions++;
    for (const [sid, record] of Object.entries(dateData.records || {})) {
      totalStudents.add(sid);
      if (record.status === 'present' || record.status === 'late') totalPresent++;
    }
  }

  const avgAttendance = totalStudents.size && totalSessions
    ? Math.round((totalPresent / (totalStudents.size * totalSessions)) * 100)
    : 0;

  const report = {
    type: 'class_performance',
    classId,
    courseId,
    generatedAt: new Date().toISOString(),
    stats: {
      averageAttendance: avgAttendance,
      totalStudents:     totalStudents.size,
      totalSessions,
    },
  };

  const ref = classReportRef(classId).push();
  await ref.set(report);
  return { id: ref.key, ...report };
};

module.exports = {
  getStudentReports,
  generateStudentReport,
  getClassReports,
  generateClassReport,
};
