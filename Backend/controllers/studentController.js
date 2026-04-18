const { db_get, db_all, db_run } = require('../config/database')

// GET /api/students
const getAllStudents = async (req, res) => {
  try {
    const students = await db_all(`
      SELECT s.*, c.name as class_name, u.full_name as parent_name
      FROM students s
      LEFT JOIN classes c ON s.class_id = c.id
      LEFT JOIN users u ON s.parent_id = u.id
      ORDER BY s.name
    `)
    res.json(students)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// GET /api/students/:id
const getStudentById = async (req, res) => {
  try {
    const student = await db_get(`
      SELECT s.*, c.name as class_name, u.full_name as parent_name
      FROM students s
      LEFT JOIN classes c ON s.class_id = c.id
      LEFT JOIN users u ON s.parent_id = u.id
      WHERE s.id = ?
    `, [req.params.id])

    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    res.json(student)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// POST /api/students (Admin/Principal only)
const createStudent = async (req, res) => {
  try {
    const { name, date_of_birth, gender, class_id, parent_id, enrollment_date } = req.body

    if (!name || !date_of_birth) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const result = await db_run(`
      INSERT INTO students (name, date_of_birth, gender, class_id, parent_id, enrollment_date, status)
      VALUES (?, ?, ?, ?, ?, ?, 'active')
    `, [name, date_of_birth, gender || null, class_id || null, parent_id || null, enrollment_date || new Date().toISOString().split('T')[0]])

    res.status(201).json({
      message: 'Student created successfully',
      studentId: result.lastID
    })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// PUT /api/students/:id
const updateStudent = async (req, res) => {
  try {
    const { name, date_of_birth, gender, class_id, parent_id, status } = req.body
    const { id } = req.params

    const updates = []
    const values = []

    if (name !== undefined) { updates.push('name = ?'); values.push(name) }
    if (date_of_birth !== undefined) { updates.push('date_of_birth = ?'); values.push(date_of_birth) }
    if (gender !== undefined) { updates.push('gender = ?'); values.push(gender) }
    if (class_id !== undefined) { updates.push('class_id = ?'); values.push(class_id) }
    if (parent_id !== undefined) { updates.push('parent_id = ?'); values.push(parent_id) }
    if (status !== undefined) { updates.push('status = ?'); values.push(status) }

    if (updates.length === 0) {
      return res.status(400).json({ message: 'No fields to update' })
    }

    values.push(id)

    await db_run(
      `UPDATE students SET ${updates.join(', ')} WHERE id = ?`,
      values
    )

    res.json({ message: 'Student updated successfully' })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// DELETE /api/students/:id
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params

    await db_run('DELETE FROM students WHERE id = ?', [id])

    res.json({ message: 'Student deleted successfully' })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
}
