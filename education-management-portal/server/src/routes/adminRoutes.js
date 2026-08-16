// Admin Routes
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Stats Endpoint
router.get('/stats', adminController.getStats);

// Student Management Endpoints
router.get('/students', adminController.getStudents);
router.post('/students', adminController.addStudent);
router.delete('/students/:id', adminController.deleteStudent);

// Teacher Management Endpoints
router.get('/teachers', adminController.getTeachers);
router.post('/teachers', adminController.addTeacher);

// Course Management Endpoints
router.get('/courses', adminController.getCourses);
router.post('/courses', adminController.addCourse);

// Assignment & Exam Endpoints
router.get('/assignments', adminController.getAssignments);
router.get('/exams', adminController.getExams);

// AI Insights Endpoint
router.get('/ai-insights', adminController.getAIInsights);

module.exports = router;
