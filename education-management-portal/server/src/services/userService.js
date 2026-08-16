// userService.js — RTDB /users
const { db, auth } = require('../config/firebase');

const usersRef = () => db.ref('users');
const userRef  = (uid) => db.ref(`users/${uid}`);

/** Get full user profile from RTDB */
const getUserById = async (uid) => {
  const snap = await userRef(uid).once('value');
  if (!snap.exists()) throw new Error('User not found');
  return { uid, ...snap.val() };
};

/** List all users (admin only) */
const getAllUsers = async () => {
  const snap = await usersRef().once('value');
  if (!snap.exists()) return [];
  const users = [];
  snap.forEach((child) => users.push({ uid: child.key, ...child.val() }));
  return users;
};

/** List users by role */
const getUsersByRole = async (role) => {
  const snap = await usersRef().orderByChild('profile/role').equalTo(role).once('value');
  if (!snap.exists()) return [];
  const users = [];
  snap.forEach((child) => users.push({ uid: child.key, ...child.val() }));
  return users;
};

/** Create / update user profile after Firebase Auth registration */
const createOrUpdateUser = async (uid, profileData) => {
  await userRef(uid).update({ profile: profileData });
  return getUserById(uid);
};

/** Update student-specific info */
const updateStudentInfo = async (uid, studentInfo) => {
  await userRef(uid).child('studentInfo').update(studentInfo);
  return getUserById(uid);
};

/** Update teacher-specific info */
const updateTeacherInfo = async (uid, teacherInfo) => {
  await userRef(uid).child('teacherInfo').update(teacherInfo);
  return getUserById(uid);
};

/** Enroll student in a course — writes to /users/$uid/studentInfo/enrolledCourses/$courseId */
const enrollStudentInCourse = async (uid, courseId) => {
  await userRef(uid).child(`studentInfo/enrolledCourses/${courseId}`).set({
    enrolledAt: new Date().toISOString(),
    status: 'active',
  });
};

/** Remove / soft-delete user (disable in Firebase Auth + flag in RTDB) */
const deleteUser = async (uid) => {
  await auth.updateUser(uid, { disabled: true });
  await userRef(uid).child('profile/isActive').set(false);
};

/** Set custom role claim on Firebase Auth token */
const setUserRoleClaim = async (uid, role) => {
  await auth.setCustomUserClaims(uid, { role });
};

module.exports = {
  getUserById,
  getAllUsers,
  getUsersByRole,
  createOrUpdateUser,
  updateStudentInfo,
  updateTeacherInfo,
  enrollStudentInCourse,
  deleteUser,
  setUserRoleClaim,
};
