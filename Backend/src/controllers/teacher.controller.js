const teacherService = require("../services/teacher.service");

const getTeachers = async (req, res) => {
  try {
    const { search } = req.query;
    const teachers = await teacherService.getAllTeachers({ search });
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTeacherById = async (req, res) => {
  try {
    const teacher = await teacherService.getTeacherById(req.params.id);
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTeacher = async (req, res) => {
  try {
    const teacher = await teacherService.createTeacher(req.body);
    res.status(201).json(teacher);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateTeacher = async (req, res) => {
  try {
    const teacher = await teacherService.updateTeacher(req.params.id, req.body);
    res.json(teacher);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTeacher = async (req, res) => {
  try {
    await teacherService.deleteTeacher(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const assignClass = async (req, res) => {
  try {
    const { maGV, maLop } = req.body;
    const result = await teacherService.assignClass(maGV, maLop);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateSchedule = async (req, res) => {
  try {
    const result = await teacherService.updateSchedule(req.params.id, req.body.schedule);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  assignClass,
  updateSchedule
};
