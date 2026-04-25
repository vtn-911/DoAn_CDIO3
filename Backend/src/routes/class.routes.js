const express = require('express');
const router = express.Router();
const classController = require('../controllers/class.controller');

router.get('/', classController.getAllClasses);
router.post('/', classController.createClass);
router.put('/:id', classController.updateClass);
router.delete('/:id', classController.deleteClass);

router.post('/assign-teacher', classController.assignHomeroomTeacher);
router.get('/:id/students', classController.getClassStudents);
router.post('/:id/students', classController.addStudentToClass);

module.exports = router;
