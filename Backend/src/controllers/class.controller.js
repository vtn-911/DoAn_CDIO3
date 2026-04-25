const classService = require("../services/class.service");

const getAllClasses = async (req, res) => {
  try {
    const { role, userId } = req.query;
    const classes = await classService.getAllClasses(role, userId);
    res.json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createClass = async (req, res) => {
  try {
    const newClass = await classService.createClass(req.body);
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateClass = async (req, res) => {
  try {
    const updated = await classService.updateClass(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteClass = async (req, res) => {
  try {
    await classService.deleteClass(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const assignHomeroomTeacher = async (req, res) => {
  try {
    const { maLop, maGV } = req.body;
    const updated = await classService.assignHomeroomTeacher(maLop, maGV);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getClassStudents = async (req, res) => {
  try {
    const students = await classService.getClassStudents(req.params.id);
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addStudentToClass = async (req, res) => {
  try {
    const { maHS } = req.body;
    const updated = await classService.addStudentToClass(req.params.id, maHS);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllClasses,
  createClass,
  updateClass,
  deleteClass,
  assignHomeroomTeacher,
  getClassStudents,
  addStudentToClass
};
