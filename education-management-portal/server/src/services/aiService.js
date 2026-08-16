// aiService.js — RTDB /ai_insights
const { db } = require('../config/firebase');

const aiRef = (studentId) => db.ref(`ai_insights/${studentId}`);

/* ─── READ ────────────────────────────────────────────────── */

const getStudentInsights = async (studentId) => {
  const snap = await aiRef(studentId).once('value');
  return snap.val();
};

const getAllInsights = async () => {
  const snap = await db.ref('ai_insights').once('value');
  if (!snap.exists()) return [];
  const list = [];
  snap.forEach((s) => list.push({ studentId: s.key, ...s.val() }));
  return list;
};

/* ─── COMPUTE & WRITE ─────────────────────────────────────── */

/**
 * analyzeAndSaveInsights
 * Reads /grades, /attendance_summary, /progress for a student
 * and writes a structured AI insights node.
 */
const analyzeAndSaveInsights = async (studentId) => {
  const [gradesSnap, attendanceSnap, progressSnap] = await Promise.all([
    db.ref(`grades/${studentId}`).once('value'),
    db.ref(`attendance_summary/${studentId}`).once('value'),
    db.ref(`progress/${studentId}/overview`).once('value'),
  ]);

  const grades     = gradesSnap.val()     || {};
  const attendance = attendanceSnap.val() || {};
  const overview   = progressSnap.val()   || {};

  // Determine weak subjects (grade point < 6 = below C)
  const weakSubjects = {};
  const strengths    = {};

  for (const [courseId, grade] of Object.entries(grades)) {
    if ((grade.gradePoint || 0) < 6) {
      weakSubjects[courseId] = {
        courseName:  grade.courseName  || courseId,
        score:       grade.gradePoint  || 0,
        reason:      'Grade below C — needs improvement',
      };
    } else if ((grade.gradePoint || 0) >= 8) {
      strengths[courseId] = {
        courseName: grade.courseName || courseId,
        score:      grade.gradePoint || 0,
      };
    }
  }

  // Risk level
  const atRiskAttendance = Object.values(attendance).some((a) => a.isAtRisk);
  const lowCgpa          = (overview.cgpa || 0) < 5;
  let riskLevel = 'low';
  if (atRiskAttendance && lowCgpa) riskLevel = 'high';
  else if (atRiskAttendance || lowCgpa) riskLevel = 'medium';

  const overallHealthScore = Math.round(
    ((overview.cgpa || 0) / 10) * 50 + ((overview.overallAttendance || 0) / 100) * 50
  );

  // Auto-generate recommendations
  const recommendations = {};
  if (atRiskAttendance) {
    const rKey = db.ref('ai_insights').push().key;
    recommendations[rKey] = {
      type: 'attendance', priority: 'high',
      title: 'Improve Your Attendance',
      description: 'Your attendance in one or more courses is below 75%. Regular attendance is required to avoid academic penalties.',
    };
  }
  if (Object.keys(weakSubjects).length > 0) {
    const rKey = db.ref('ai_insights').push().key;
    recommendations[rKey] = {
      type: 'academics', priority: 'medium',
      title: 'Focus on Weak Subjects',
      description: `You have ${Object.keys(weakSubjects).length} subject(s) with below-average performance. Consider extra study sessions.`,
    };
  }

  const insights = {
    riskLevel,
    overallHealthScore,
    weakSubjects,
    strengths,
    recommendations,
    lastAnalyzed: new Date().toISOString(),
  };

  await aiRef(studentId).set(insights);
  return insights;
};

/** Add a performance alert for a student */
const addAlert = async (studentId, alert) => {
  const ref = aiRef(studentId).child('performanceAlerts').push();
  await ref.set({ ...alert, isRead: false, createdAt: new Date().toISOString() });
  return { id: ref.key, ...alert };
};

/** Mark an alert as read */
const markAlertRead = async (studentId, alertId) => {
  await aiRef(studentId).child(`performanceAlerts/${alertId}/isRead`).set(true);
};

module.exports = {
  getStudentInsights,
  getAllInsights,
  analyzeAndSaveInsights,
  addAlert,
  markAlertRead,
};
