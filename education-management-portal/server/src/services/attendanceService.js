// attendanceService.js — RTDB /attendance and /attendance_summary
const { db } = require('../config/firebase');

const attendanceRef        = (classId, date) => db.ref(`attendance/${classId}/${date}`);
const attendanceSummaryRef = (studentId, courseId) => db.ref(`attendance_summary/${studentId}/${courseId}`);

/* ─── MARK ATTENDANCE ─────────────────────────────────────── */

/**
 * Mark attendance for a full class on a date.
 * records = { [studentId]: { status: 'present|absent|late|excused', note? } }
 */
const markAttendance = async (classId, date, { courseId, teacherId, records }) => {
  const payload = {
    courseId,
    teacherId,
    markedAt: new Date().toISOString(),
    records,
  };
  await attendanceRef(classId, date).set(payload);

  // Update attendance_summary for each student
  await _updateSummaries(classId, courseId, records);
  return payload;
};

/** Update a single student's attendance record on a date */
const updateStudentAttendance = async (classId, date, studentId, { status, note }) => {
  await attendanceRef(classId, date).child(`records/${studentId}`).update({ status, note });
};

/* ─── READ ATTENDANCE ─────────────────────────────────────── */

/** Get attendance for a class on a specific date */
const getAttendanceByDate = async (classId, date) => {
  const snap = await attendanceRef(classId, date).once('value');
  if (!snap.exists()) return null;
  return snap.val();
};

/** Get all attendance records for a class (all dates) */
const getAttendanceByClass = async (classId) => {
  const snap = await db.ref(`attendance/${classId}`).once('value');
  if (!snap.exists()) return {};
  return snap.val();
};

/* ─── ATTENDANCE SUMMARY ──────────────────────────────────── */

/** Get pre-aggregated summary for a student in a course */
const getAttendanceSummary = async (studentId, courseId) => {
  const snap = await attendanceSummaryRef(studentId, courseId).once('value');
  return snap.val();
};

/** Get all course summaries for a student (dashboard) */
const getStudentAttendanceSummaries = async (studentId) => {
  const snap = await db.ref(`attendance_summary/${studentId}`).once('value');
  if (!snap.exists()) return {};
  return snap.val();
};

/* ─── PRIVATE HELPERS ─────────────────────────────────────── */

/**
 * Recalculate and write attendance_summary for each student.
 * Reads existing summary and increments counters.
 */
const _updateSummaries = async (classId, courseId, records) => {
  const updates = {};

  for (const [studentId, record] of Object.entries(records)) {
    const summarySnap = await attendanceSummaryRef(studentId, courseId).once('value');
    const current = summarySnap.val() || { totalClasses: 0, attended: 0, absent: 0, percentage: 0 };

    const isPresent = record.status === 'present' || record.status === 'late';

    const totalClasses = current.totalClasses + 1;
    const attended     = current.attended + (isPresent ? 1 : 0);
    const absent       = current.absent   + (isPresent ? 0 : 1);
    const percentage   = Math.round((attended / totalClasses) * 100);
    const isAtRisk     = percentage < 75;

    updates[`attendance_summary/${studentId}/${courseId}`] = {
      totalClasses,
      attended,
      absent,
      percentage,
      isAtRisk,
      lastUpdated: new Date().toISOString(),
    };
  }

  await db.ref().update(updates);
};

module.exports = {
  markAttendance,
  updateStudentAttendance,
  getAttendanceByDate,
  getAttendanceByClass,
  getAttendanceSummary,
  getStudentAttendanceSummaries,
};
