const express = require('express')
const { authMiddleware, authorize } = require('../middleware/auth')
const authController = require('../controllers/authController')
const studentController = require('../controllers/studentController')
const resourceController = require('../controllers/resourceController')

const router = express.Router()

// ============ AUTH ROUTES (Public) ============
router.post('/auth/login', authController.login)
router.post('/auth/logout', authMiddleware, authController.logout)
router.get('/auth/me', authMiddleware, authController.getMe)
router.post('/auth/register', authMiddleware, authorize(['admin']), authController.register)

// ============ STUDENT ROUTES ============
router.get('/students', authMiddleware, studentController.getAllStudents)
router.get('/students/:id', authMiddleware, studentController.getStudentById)
router.post('/students', authMiddleware, authorize(['admin', 'principal']), studentController.createStudent)
router.put('/students/:id', authMiddleware, authorize(['admin', 'principal']), studentController.updateStudent)
router.delete('/students/:id', authMiddleware, authorize(['admin']), studentController.deleteStudent)

// ============ TEACHER ROUTES ============
router.get('/teachers', authMiddleware, resourceController.getAllTeachers)
router.post('/teachers', authMiddleware, authorize(['admin', 'principal']), resourceController.createTeacher)

// ============ CLASS ROUTES ============
router.get('/classes', authMiddleware, resourceController.getAllClasses)
router.post('/classes', authMiddleware, authorize(['admin', 'principal']), resourceController.createClass)

// ============ ATTENDANCE ROUTES ============
router.get('/attendance', authMiddleware, resourceController.getAttendance)
router.post('/attendance', authMiddleware, authorize(['admin', 'principal', 'teacher']), resourceController.recordAttendance)

// ============ HEALTH ROUTES ============
router.get('/health', authMiddleware, resourceController.getHealthRecords)
router.post('/health', authMiddleware, authorize(['admin', 'principal', 'teacher']), resourceController.recordHealth)

// ============ FINANCE ROUTES ============
router.get('/finance', authMiddleware, authorize(['admin', 'principal', 'finance']), resourceController.getFinance)
router.post('/finance', authMiddleware, authorize(['admin', 'finance']), resourceController.recordFinance)

// ============ NOTIFICATION ROUTES ============
router.get('/notifications', authMiddleware, resourceController.getNotifications)
router.post('/notifications', authMiddleware, authorize(['admin', 'principal', 'teacher']), resourceController.sendNotification)

module.exports = router
