const studentService = require("../services/student.service");

const getStudents = async (req, res) => {
  try {
    // We pass req.query as filters, but since we don't have JWT user context injected yet,
    // we'll simulate passing the user context. Wait, the frontend should send role/idND?
    // Usually, we'd use a middleware to populate req.user from JWT.
    // Let's assume req.query contains role and userId for now (temporary workaround).
    const { role, userId, search, lopId } = req.query;
    
    const user = { vaiTro: role, idND: userId };
    const students = await studentService.getAllStudents({ search, lopId }, user);
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStudentById = async (req, res) => {
  try {
    const student = await studentService.getStudentById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createStudent = async (req, res) => {
  try {
    const student = await studentService.createStudent(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const student = await studentService.updateStudent(req.params.id, req.body);
    res.json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    await studentService.deleteStudent(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTeacherId = async (req, res) => {
  try {
    const teacher = await studentService.getTeacherId(req.query.userId);
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addAttendance = async (req, res) => {
  try {
    const record = await studentService.addAttendance(req.params.id, req.body);
    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addGrade = async (req, res) => {
  try {
    const record = await studentService.addGrade(req.params.id, req.body);
    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addEvaluation = async (req, res) => {
  try {
    const record = await studentService.addEvaluation(req.params.id, req.body);
    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getTeacherId,
  addAttendance,
  addGrade,
  addEvaluation
};
