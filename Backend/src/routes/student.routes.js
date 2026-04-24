const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');

router.get('/teacher-id', studentController.getTeacherId);

router.get('/', studentController.getStudents);
router.get('/:id', studentController.getStudentById);
router.post('/', studentController.createStudent);
router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);

router.post('/:id/attendance', studentController.addAttendance);
router.post('/:id/grades', studentController.addGrade);
router.post('/:id/evaluations', studentController.addEvaluation);

module.exports = router;
