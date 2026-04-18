const express = require('express')
const cors = require('cors')
const path = require('path')
require('dotenv').config()

const { db } = require('./config/database')
const apiRoutes = require('./routes/api')

const app = express()
const PORT = process.env.PORT || 5000

// ============ MIDDLEWARE ============
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173']
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Debug middleware - log all requests
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.path}`)
  next()
})

// ============ ROUTES ============
app.use('/api', apiRoutes)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Backend is running' })
})

// ============ ERROR HANDLING ============
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: 'Internal server error' })
})

// ============ 404 ============
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

// ============ START SERVER ============
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════╗
║  🎓 KINDERGARTEN MANAGEMENT BACKEND   ║
║  ✅ Server running on port ${PORT}        ║
║  📝 Database: SQLite                  ║
║  🔗 CORS: http://localhost:3000       ║
╚═══════════════════════════════════════╝
  `)
  console.log(`
📚 Available Endpoints:
  POST   /api/auth/login
  GET    /api/auth/me
  POST   /api/students
  GET    /api/students
  GET    /api/teachers
  GET    /api/classes
  POST   /api/attendance
  POST   /api/health
  POST   /api/finance
  POST   /api/notifications
  `)
})

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Server shutting down...')
  db.close((err) => {
    if (err) console.error(err)
    console.log('✅ Database connection closed')
    process.exit(0)
  })
})

module.exports = app
