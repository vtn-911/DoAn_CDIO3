const { db_get, db_all, db_run } = require('../config/database')

// ============ TEACHERS ============

const getAllTeachers = async (req, res) => {
  try {
    const teachers = await db_all(`
      SELECT t.*, u.full_name, u.email, u.phone, u.avatar
      FROM teachers t
      LEFT JOIN users u ON t.user_id = u.id
      ORDER BY u.full_name
    `)
    res.json(teachers)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

const createTeacher = async (req, res) => {
  try {
    const { user_id, experience_years, department, qualification, hire_date } = req.body

    if (!user_id) {
      return res.status(400).json({ message: 'user_id required' })
    }

    const result = await db_run(`
      INSERT INTO teachers (user_id, experience_years, department, qualification, hire_date, status)
      VALUES (?, ?, ?, ?, ?, 'active')
    `, [user_id, experience_years || 0, department || null, qualification || null, hire_date || new Date().toISOString().split('T')[0]])

    res.status(201).json({ message: 'Teacher created', teacherId: result.lastID })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// ============ CLASSES ============

const getAllClasses = async (req, res) => {
  try {
    const classes = await db_all(`
      SELECT c.*, u.full_name as teacher_name,
      (SELECT COUNT(*) FROM students WHERE class_id = c.id) as student_count
      FROM classes c
      LEFT JOIN teachers t ON c.teacher_id = t.id
      LEFT JOIN users u ON t.user_id = u.id
      ORDER BY c.name
    `)
    res.json(classes)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

const createClass = async (req, res) => {
  try {
    const { name, capacity, teacher_id, room_number, age_group, schedule } = req.body

    if (!name || !capacity) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const result = await db_run(`
      INSERT INTO classes (name, capacity, teacher_id, room_number, age_group, schedule, status)
      VALUES (?, ?, ?, ?, ?, ?, 'active')
    `, [name, capacity, teacher_id || null, room_number || null, age_group || null, schedule || null])

    res.status(201).json({ message: 'Class created', classId: result.lastID })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// ============ ATTENDANCE ============

const getAttendance = async (req, res) => {
  try {
    const attendance = await db_all(`
      SELECT a.*, s.name as student_name, c.name as class_name
      FROM attendance a
      LEFT JOIN students s ON a.student_id = s.id
      LEFT JOIN classes c ON a.class_id = c.id
      ORDER BY a.date DESC
    `)
    res.json(attendance)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

const recordAttendance = async (req, res) => {
  try {
    const { student_id, class_id, date, status, notes } = req.body

    if (!student_id || !date || !status) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const result = await db_run(`
      INSERT INTO attendance (student_id, class_id, date, status, notes)
      VALUES (?, ?, ?, ?, ?)
    `, [student_id, class_id || null, date, status, notes || null])

    res.status(201).json({ message: 'Attendance recorded', attendanceId: result.lastID })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// ============ HEALTH ============

const getHealthRecords = async (req, res) => {
  try {
    const records = await db_all(`
      SELECT h.*, s.name as student_name
      FROM health_records h
      LEFT JOIN students s ON h.student_id = s.id
      ORDER BY h.date DESC
    `)
    res.json(records)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

const recordHealth = async (req, res) => {
  try {
    const { student_id, height, weight, blood_type, health_status, allergies, medical_notes, check_up_date } = req.body

    if (!student_id) {
      return res.status(400).json({ message: 'student_id required' })
    }

    const result = await db_run(`
      INSERT INTO health_records (student_id, date, height, weight, blood_type, health_status, allergies, medical_notes, check_up_date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [student_id, new Date().toISOString().split('T')[0], height || null, weight || null, blood_type || null, health_status || null, allergies || null, medical_notes || null, check_up_date || null])

    res.status(201).json({ message: 'Health record created', recordId: result.lastID })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// ============ FINANCE ============

const getFinance = async (req, res) => {
  try {
    const finance = await db_all(`
      SELECT f.*, s.name as student_name, u.full_name as created_by_name
      FROM finance f
      LEFT JOIN students s ON f.student_id = s.id
      LEFT JOIN users u ON f.created_by = u.id
      ORDER BY f.date DESC
    `)
    res.json(finance)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

const recordFinance = async (req, res) => {
  try {
    const { student_id, type, amount, description, date, paid } = req.body

    if (!type || !amount || !date) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const result = await db_run(`
      INSERT INTO finance (student_id, type, amount, description, date, paid, created_by)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [student_id || null, type, amount, description || null, date, paid ? 1 : 0, req.userId])

    res.status(201).json({ message: 'Finance record created', recordId: result.lastID })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// ============ NOTIFICATIONS ============

const getNotifications = async (req, res) => {
  try {
    const notifications = await db_all(`
      SELECT n.*, u.full_name as sender_name
      FROM notifications n
      LEFT JOIN users u ON n.sender_id = u.id
      WHERE n.recipient_id = ? OR n.recipient_role = ?
      ORDER BY n.created_at DESC
    `, [req.userId, req.userRole])
    res.json(notifications)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

const sendNotification = async (req, res) => {
  try {
    const { recipient_id, recipient_role, title, content, type } = req.body

    if (!title || !content) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const result = await db_run(`
      INSERT INTO notifications (sender_id, recipient_id, recipient_role, title, content, type)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [req.userId, recipient_id || null, recipient_role || null, title, content, type || 'general'])

    res.status(201).json({ message: 'Notification sent', notificationId: result.lastID })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = {
  getAllTeachers,
  createTeacher,
  getAllClasses,
  createClass,
  getAttendance,
  recordAttendance,
  getHealthRecords,
  recordHealth,
  getFinance,
  recordFinance,
  getNotifications,
  sendNotification
}
