// Firebase Admin SDK — Realtime Database + Auth
const admin = require('firebase-admin');

let firebaseApp;

if (!admin.apps.length) {
  let serviceAccount;
  
  try {
    // 1. Try to load from a local file first (Easy approach)
    serviceAccount = require('../../serviceAccountKey.json');
  } catch (err) {
    // 2. Fallback to process.env if the file doesn't exist (Deployment approach)
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');
  }

  firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL, // e.g. https://buitdathon-app-default-rtdb.firebaseio.com
  });
} else {
  firebaseApp = admin.app();
}

const db   = admin.database();   // Realtime Database
const auth = admin.auth();       // Firebase Auth

module.exports = { admin, db, auth };
