const bcrypt = require('bcryptjs')
const { db_get, db_run } = require('../config/database')
const { generateToken } = require('../middleware/auth')

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { username, password } = req.body

    console.log('🔐 Login attempt:', { username })

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' })
    }

    // Find user
    const user = await db_get(
      'SELECT * FROM users WHERE username = ?',
      [username]
    )

    if (!user) {
      console.log('❌ User not found:', username)
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash)

    if (!isPasswordValid) {
      console.log('❌ Password mismatch for user:', username)
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Generate token
    const token = generateToken(user.id, user.role)

    // Return user data + token
    console.log('✅ Login successful:', { username, role: user.role })
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        full_name: user.full_name,
        avatar: user.avatar,
        phone: user.phone
      }
    })
  } catch (error) {
    console.error('❌ Login error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// POST /api/auth/logout
const logout = (req, res) => {
  // JWT doesn't require server-side logout
  // Client just needs to remove the token
  res.json({ message: 'Logged out successfully' })
}

// GET /api/auth/me
const getMe = async (req, res) => {
  try {
    const user = await db_get(
      'SELECT id, username, email, role, full_name, avatar, phone FROM users WHERE id = ?',
      [req.userId]
    )

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json(user)
  } catch (error) {
    console.error('GetMe error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// POST /api/auth/register (Admin only)
const register = async (req, res) => {
  try {
    const { username, email, password, full_name, role, phone } = req.body

    if (!username || !email || !password || !full_name || !role) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    // Check if user exists
    const existingUser = await db_get(
      'SELECT id FROM users WHERE username = ? OR email = ?',
      [username, email]
    )

    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' })
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10)

    // Insert user
    const result = await db_run(
      `INSERT INTO users (username, email, password_hash, full_name, role, phone, status)
       VALUES (?, ?, ?, ?, ?, ?, 'active')`,
      [username, email, password_hash, full_name, role, phone || null]
    )

    res.status(201).json({
      message: 'User created successfully',
      userId: result.lastID
    })
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = {
  login,
  logout,
  getMe,
  register
}
