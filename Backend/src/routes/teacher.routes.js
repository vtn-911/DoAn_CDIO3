const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacher.controller");

router.get("/", teacherController.getTeachers);
router.get("/:id", teacherController.getTeacherById);
router.post("/", teacherController.createTeacher);
router.put("/:id", teacherController.updateTeacher);
router.delete("/:id", teacherController.deleteTeacher);
router.post("/assign-class", teacherController.assignClass);
router.post("/:id/schedule", teacherController.updateSchedule);

module.exports = router;
