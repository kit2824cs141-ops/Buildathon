// progressService.js — RTDB /progress
const { db } = require('../config/firebase');

const progressRef = (studentId) => db.ref(`progress/${studentId}`);

/* ─── READ ────────────────────────────────────────────────── */

const getStudentProgress = async (studentId) => {
  const snap = await progressRef(studentId).once('value');
  if (!snap.exists()) return null;
  return snap.val();
};

const getProgressOverview = async (studentId) => {
  const snap = await progressRef(studentId).child('overview').once('value');
  return snap.val();
};

const getSemesterProgress = async (studentId, semester) => {
  if (semester) {
    const snap = await progressRef(studentId).child(`semesterWise/${semester}`).once('value');
    return snap.val();
  }
  const snap = await progressRef(studentId).child('semesterWise').once('value');
  return snap.val();
};

const getPerformanceTrend = async (studentId) => {
  const snap = await progressRef(studentId).child('performanceTrend').once('value');
  return snap.val();
};

/* ─── COMPUTE & WRITE ─────────────────────────────────────── */

/**
 * computeAndSaveProgress
 * Reads grades + attendance_summary for a student and computes CGPA / SGPA.
 * Writes to /progress/$studentId/overview and /semesterWise.
 */
const computeAndSaveProgress = async (studentId) => {
  const [gradesSnap, attendanceSnap] = await Promise.all([
    db.ref(`grades/${studentId}`).once('value'),
    db.ref(`attendance_summary/${studentId}`).once('value'),
  ]);

  const grades    = gradesSnap.val()    || {};
  const attendance = attendanceSnap.val() || {};

  // Collect grade points
  const gradePoints    = Object.values(grades).map((g) => g.gradePoint || 0);
  const cgpa           = gradePoints.length
    ? +(gradePoints.reduce((a, b) => a + b, 0) / gradePoints.length).toFixed(2)
    : 0;

  // Overall attendance
  const attendanceValues  = Object.values(attendance);
  const overallAttendance = attendanceValues.length
    ? Math.round(
        attendanceValues.reduce((sum, a) => sum + (a.percentage || 0), 0) / attendanceValues.length
      )
    : 0;

  // Completion rate (passed courses / total)
  const passed          = Object.values(grades).filter((g) => g.isPassed).length;
  const completionRate  = gradePoints.length
    ? Math.round((passed / gradePoints.length) * 100)
    : 0;

  const overview = { cgpa, sgpa: cgpa, overallAttendance, completionRate, lastUpdated: new Date().toISOString() };

  await progressRef(studentId).child('overview').set(overview);
  return overview;
};

/** Update performance trend for a month */
const updatePerformanceTrend = async (studentId, month, { averageScore, attendanceRate }) => {
  await progressRef(studentId).child(`performanceTrend/${month}`).set({
    averageScore,
    attendanceRate,
    recordedAt: new Date().toISOString(),
  });
};

module.exports = {
  getStudentProgress,
  getProgressOverview,
  getSemesterProgress,
  getPerformanceTrend,
  computeAndSaveProgress,
  updatePerformanceTrend,
};
