// assignmentService.js — RTDB /assignments
const { db } = require('../config/firebase');

const assignmentsRef = () => db.ref('assignments');
const assignmentRef  = (id) => db.ref(`assignments/${id}`);

/* ─── ASSIGNMENTS ─────────────────────────────────────────── */

const getAllAssignments = async () => {
  const snap = await assignmentsRef().once('value');
  if (!snap.exists()) return [];
  const list = [];
  snap.forEach((a) => list.push({ id: a.key, ...a.val() }));
  return list;
};

const getAssignmentById = async (assignmentId) => {
  const snap = await assignmentRef(assignmentId).once('value');
  if (!snap.exists()) throw new Error('Assignment not found');
  return { id: assignmentId, ...snap.val() };
};

/** Get all assignments for a course */
const getAssignmentsByCourse = async (courseId) => {
  const snap = await assignmentsRef()
    .orderByChild('info/courseId')
    .equalTo(courseId)
    .once('value');
  if (!snap.exists()) return [];
  const list = [];
  snap.forEach((a) => list.push({ id: a.key, ...a.val() }));
  return list;
};

const createAssignment = async (info) => {
  const ref = assignmentsRef().push();
  await ref.set({ info, submissions: {} });
  return { id: ref.key, info };
};

const updateAssignment = async (assignmentId, info) => {
  await assignmentRef(assignmentId).child('info').update(info);
  return getAssignmentById(assignmentId);
};

const deleteAssignment = async (assignmentId) => {
  await assignmentRef(assignmentId).remove();
};

/* ─── SUBMISSIONS ─────────────────────────────────────────── */

/** Student submits an assignment */
const submitAssignment = async (assignmentId, studentId, submissionData) => {
  await assignmentRef(assignmentId).child(`submissions/${studentId}`).set({
    ...submissionData,
    submittedAt: new Date().toISOString(),
    status: 'submitted',
  });
};

/** Teacher grades a submission */
const gradeSubmission = async (assignmentId, studentId, { marks, feedback }) => {
  await assignmentRef(assignmentId).child(`submissions/${studentId}`).update({
    marks,
    feedback,
    status: 'graded',
    gradedAt: new Date().toISOString(),
  });
};

/** Get a specific student's submission */
const getStudentSubmission = async (assignmentId, studentId) => {
  const snap = await assignmentRef(assignmentId)
    .child(`submissions/${studentId}`)
    .once('value');
  return snap.val();
};

/** Get all submissions for an assignment (teacher view) */
const getAllSubmissions = async (assignmentId) => {
  const snap = await assignmentRef(assignmentId).child('submissions').once('value');
  if (!snap.exists()) return [];
  const list = [];
  snap.forEach((s) => list.push({ studentId: s.key, ...s.val() }));
  return list;
};

module.exports = {
  getAllAssignments, getAssignmentById, getAssignmentsByCourse,
  createAssignment, updateAssignment, deleteAssignment,
  submitAssignment, gradeSubmission, getStudentSubmission, getAllSubmissions,
};
