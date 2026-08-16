// examService.js — RTDB /examinations and /grades
const { db } = require('../config/firebase');

const examsRef   = () => db.ref('examinations');
const examRef    = (id) => db.ref(`examinations/${id}`);
const gradesRef  = (studentId, courseId) => db.ref(`grades/${studentId}/${courseId}`);

/* ─── EXAMINATIONS ────────────────────────────────────────── */

const getAllExams = async () => {
  const snap = await examsRef().once('value');
  if (!snap.exists()) return [];
  const list = [];
  snap.forEach((e) => list.push({ id: e.key, ...e.val() }));
  return list;
};

const getExamById = async (examId) => {
  const snap = await examRef(examId).once('value');
  if (!snap.exists()) throw new Error('Exam not found');
  return { id: examId, ...snap.val() };
};

const getExamsByCourse = async (courseId) => {
  const snap = await examsRef()
    .orderByChild('info/courseId')
    .equalTo(courseId)
    .once('value');
  if (!snap.exists()) return [];
  const list = [];
  snap.forEach((e) => list.push({ id: e.key, ...e.val() }));
  return list;
};

const createExam = async (info) => {
  const ref = examsRef().push();
  await ref.set({ info, results: {} });
  return { id: ref.key, info };
};

const updateExam = async (examId, info) => {
  await examRef(examId).child('info').update(info);
  return getExamById(examId);
};

const deleteExam = async (examId) => {
  await examRef(examId).remove();
};

/* ─── EXAM RESULTS ────────────────────────────────────────── */

/**
 * Submit result for one student.
 * Automatically computes grade and updates /grades.
 */
const submitResult = async (examId, studentId, { marks, maxMarks, courseId, semester, examType }) => {
  const percentage = Math.round((marks / maxMarks) * 100);
  const { grade, gradePoint } = _computeGrade(percentage);

  // Write to /examinations/$examId/results/$studentId
  await examRef(examId).child(`results/${studentId}`).set({
    marks, grade, percentage,
    submittedAt: new Date().toISOString(),
  });

  // Merge into /grades/$studentId/$courseId
  const gradeUpdate = {
    [`${examType}Marks`]: marks,
    totalMarks: marks,
    grade,
    gradePoint,
    isPassed: percentage >= 40,
    semester,
    lastUpdated: new Date().toISOString(),
  };
  await gradesRef(studentId, courseId).update(gradeUpdate);

  return { examId, studentId, marks, grade, percentage };
};

/** Get a student's result for an exam */
const getStudentResult = async (examId, studentId) => {
  const snap = await examRef(examId).child(`results/${studentId}`).once('value');
  return snap.val();
};

/** Get all results for an exam (teacher/admin) */
const getAllResults = async (examId) => {
  const snap = await examRef(examId).child('results').once('value');
  if (!snap.exists()) return [];
  const list = [];
  snap.forEach((r) => list.push({ studentId: r.key, ...r.val() }));
  return list;
};

/* ─── GRADES ──────────────────────────────────────────────── */

/** Get grade card for a student in a course */
const getStudentGrades = async (studentId, courseId) => {
  if (courseId) {
    const snap = await gradesRef(studentId, courseId).once('value');
    return snap.val();
  }
  const snap = await db.ref(`grades/${studentId}`).once('value');
  return snap.val();
};

/* ─── HELPERS ─────────────────────────────────────────────── */
const _computeGrade = (percentage) => {
  if (percentage >= 90) return { grade: 'A+', gradePoint: 10 };
  if (percentage >= 80) return { grade: 'A',  gradePoint: 9  };
  if (percentage >= 70) return { grade: 'B+', gradePoint: 8  };
  if (percentage >= 60) return { grade: 'B',  gradePoint: 7  };
  if (percentage >= 50) return { grade: 'C',  gradePoint: 6  };
  if (percentage >= 40) return { grade: 'D',  gradePoint: 5  };
  return                       { grade: 'F',  gradePoint: 0  };
};

module.exports = {
  getAllExams, getExamById, getExamsByCourse, createExam, updateExam, deleteExam,
  submitResult, getStudentResult, getAllResults,
  getStudentGrades,
};
