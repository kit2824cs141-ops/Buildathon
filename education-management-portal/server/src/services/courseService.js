// courseService.js — RTDB /courses and /classes
const { db } = require('../config/firebase');

const coursesRef = () => db.ref('courses');
const courseRef  = (id) => db.ref(`courses/${id}`);
const classesRef = () => db.ref('classes');
const classRef   = (id) => db.ref(`classes/${id}`);

/* ─── COURSES ─────────────────────────────────────────────── */

const getAllCourses = async () => {
  const snap = await coursesRef().once('value');
  if (!snap.exists()) return [];
  const list = [];
  snap.forEach((c) => list.push({ id: c.key, ...c.val() }));
  return list;
};

const getCourseById = async (courseId) => {
  const snap = await courseRef(courseId).once('value');
  if (!snap.exists()) throw new Error('Course not found');
  return { id: courseId, ...snap.val() };
};

const createCourse = async (data) => {
  const ref = coursesRef().push();
  await ref.set({ info: data, enrolledStudents: {}, announcements: {} });
  return { id: ref.key, info: data };
};

const updateCourse = async (courseId, data) => {
  await courseRef(courseId).child('info').update(data);
  return getCourseById(courseId);
};

const deleteCourse = async (courseId) => {
  await courseRef(courseId).remove();
};

/** Enroll a student — writes /courses/$id/enrolledStudents/$studentId */
const enrollStudent = async (courseId, studentId) => {
  await courseRef(courseId).child(`enrolledStudents/${studentId}`).set({
    enrolledAt: new Date().toISOString(),
    status: 'active',
  });
};

const unenrollStudent = async (courseId, studentId) => {
  await courseRef(courseId).child(`enrolledStudents/${studentId}/status`).set('unenrolled');
};

/** Course announcements */
const addCourseAnnouncement = async (courseId, announcement) => {
  const ref = courseRef(courseId).child('announcements').push();
  await ref.set({ ...announcement, createdAt: new Date().toISOString() });
  return { id: ref.key, ...announcement };
};

/* ─── CLASSES ─────────────────────────────────────────────── */

const getAllClasses = async () => {
  const snap = await classesRef().once('value');
  if (!snap.exists()) return [];
  const list = [];
  snap.forEach((c) => list.push({ id: c.key, ...c.val() }));
  return list;
};

const getClassById = async (classId) => {
  const snap = await classRef(classId).once('value');
  if (!snap.exists()) throw new Error('Class not found');
  return { id: classId, ...snap.val() };
};

const createClass = async (data) => {
  const ref = classesRef().push();
  await ref.set(data);
  return { id: ref.key, ...data };
};

const updateClass = async (classId, data) => {
  await classRef(classId).update(data);
  return getClassById(classId);
};

const deleteClass = async (classId) => {
  await classRef(classId).remove();
};

module.exports = {
  getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse,
  enrollStudent, unenrollStudent, addCourseAnnouncement,
  getAllClasses, getClassById, createClass, updateClass, deleteClass,
};
