const bcrypt = require('bcryptjs')
const { db_run, db_get, db_all } = require('../config/database')

async function seed() {
  console.log('🌱 Starting database seeding...\n')

  try {
    // Clear existing data
    await db_run('DELETE FROM notifications')
    await db_run('DELETE FROM finance')
    await db_run('DELETE FROM health_records')
    await db_run('DELETE FROM attendance')
    await db_run('DELETE FROM students')
    await db_run('DELETE FROM teachers')
    await db_run('DELETE FROM classes')
    await db_run('DELETE FROM users')

    console.log('✅ Cleared existing data\n')

    // ============ CREATE USERS ============
    const testUsers = [
      {
        username: 'admin',
        email: 'admin@kindergarten.com',
        password: 'admin123',
        full_name: 'Quản Trị Viên',
        role: 'admin',
        phone: '0901111111'
      },
      {
        username: 'principal',
        email: 'principal@kindergarten.com',
        password: 'principal123',
        full_name: 'Ban Giám Hiệu',
        role: 'principal',
        phone: '0902222222'
      },
      {
        username: 'teacher1',
        email: 'teacher1@kindergarten.com',
        password: 'teacher123',
        full_name: 'Cô Hoa - Giáo Viên',
        role: 'teacher',
        phone: '0903333333'
      },
      {
        username: 'parent1',
        email: 'parent1@kindergarten.com',
        password: 'parent123',
        full_name: 'Phụ Huynh Nguyễn',
        role: 'parent',
        phone: '0904444444'
      },
      {
        username: 'finance1',
        email: 'finance@kindergarten.com',
        password: 'finance123',
        full_name: 'Phòng Tài Chính',
        role: 'finance',
        phone: '0905555555'
      }
    ]

    let userIds = {}
    let teacherUserId = null

    for (const user of testUsers) {
      const password_hash = await bcrypt.hash(user.password, 10)
      const result = await db_run(`
        INSERT INTO users (username, email, password_hash, full_name, role, phone, status)
        VALUES (?, ?, ?, ?, ?, ?, 'active')
      `, [user.username, user.email, password_hash, user.full_name, user.role, user.phone])

      userIds[user.role] = result.lastID
      if (user.role === 'teacher') {
        teacherUserId = result.lastID
      }
      console.log(`✅ Created ${user.role}: ${user.full_name} (password: ${user.password})`)
    }

    console.log('\n')

    // ============ CREATE TEACHERS ============
    const teacherResult = await db_run(`
      INSERT INTO teachers (user_id, experience_years, department, qualification, hire_date, status)
      VALUES (?, ?, ?, ?, ?, 'active')
    `, [teacherUserId, 5, 'Mầm non', 'Đại học Sư phạm', '2019-01-15'])

    const teacherId = teacherResult.lastID
    console.log('✅ Created teacher record')

    // ============ CREATE CLASSES ============
    const classResult = await db_run(`
      INSERT INTO classes (name, capacity, teacher_id, room_number, age_group, schedule, status)
      VALUES (?, ?, ?, ?, ?, ?, 'active')
    `, ['Lớp A - Lứa 3-4 tuổi', 25, teacherId, 'A1', '3-4 tuổi', 'Sáng 7h30-11h30'])

    const classId = classResult.lastID
    console.log('✅ Created class: Lớp A')

    // ============ CREATE STUDENTS ============
    const students = [
      { name: 'Nguyễn Minh An', dob: '2020-06-15', gender: 'male' },
      { name: 'Trần Bảo Nhi', dob: '2020-08-20', gender: 'female' },
      { name: 'Lê Gia Hân', dob: '2020-07-10', gender: 'female' }
    ]

    for (const student of students) {
      await db_run(`
        INSERT INTO students (name, date_of_birth, gender, class_id, parent_id, enrollment_date, status)
        VALUES (?, ?, ?, ?, ?, ?, 'active')
      `, [student.name, student.dob, student.gender, classId, userIds.parent, '2023-09-01'])
      console.log(`✅ Created student: ${student.name}`)
    }

    console.log('\n')

    // ============ CREATE HEALTH RECORDS ============
    const students_health = await db_all('SELECT id FROM students LIMIT 3')
    for (const student of students_health) {
      await db_run(`
        INSERT INTO health_records (student_id, date, height, weight, blood_type, health_status, allergies, check_up_date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, [student.id, new Date().toISOString().split('T')[0], 100, 16, 'O+', 'healthy', 'none', new Date().toISOString().split('T')[0]])
      console.log(`✅ Created health record for student ${student.id}`)
    }

    console.log('\n')

    // ============ CREATE ATTENDANCE ============
    const today = new Date().toISOString().split('T')[0]
    for (const student of students_health) {
      await db_run(`
        INSERT INTO attendance (student_id, class_id, date, status, notes)
        VALUES (?, ?, ?, ?, ?)
      `, [student.id, classId, today, 'present', 'Có mặt'])
      console.log(`✅ Created attendance for student ${student.id}`)
    }

    console.log('\n')

    // ============ CREATE FINANCE RECORDS ============
    const financeRecords = [
      { student_id: 1, type: 'tuition', amount: 2000000, description: 'Học phí tháng 4/2026' },
      { student_id: 2, type: 'activity', amount: 500000, description: 'Phí hoạt động ngoại khóa' },
      { student_id: 3, type: 'supplies', amount: 300000, description: 'Dụng cụ học tập' }
    ]

    for (const record of financeRecords) {
      await db_run(`
        INSERT INTO finance (student_id, type, amount, description, date, paid, created_by)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [record.student_id, record.type, record.amount, record.description, today, 0, userIds.finance])
      console.log(`✅ Created finance record: ${record.description}`)
    }

    console.log('\n')

    // ============ CREATE NOTIFICATIONS ============
    const notifications = [
      { sender_id: userIds.principal, recipient_role: 'teacher', title: 'Thông báo quan trọng', content: 'Họp phụ huynh vào chiều thứ 5' },
      { sender_id: userIds.teacher, recipient_role: 'parent', title: 'Cập nhật học sinh', content: 'Bé An học rất tốt tuần này' }
    ]

    for (const notif of notifications) {
      await db_run(`
        INSERT INTO notifications (sender_id, recipient_id, recipient_role, title, content, type)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [notif.sender_id, null, notif.recipient_role, notif.title, notif.content, 'general'])
      console.log(`✅ Created notification: ${notif.title}`)
    }

    console.log('\n✨ Seeding completed successfully!\n')

    console.log('📝 TEST ACCOUNTS:\n')
    testUsers.forEach(user => {
      console.log(`  👤 ${user.role.toUpperCase()}`)
      console.log(`     Username: ${user.username}`)
      console.log(`     Password: ${user.password}`)
      console.log(`     Email: ${user.email}\n`)
    })

    process.exit(0)
  } catch (error) {
    console.error('❌ Seeding error:', error)
    process.exit(1)
  }
}

// Run seeding
seed()
