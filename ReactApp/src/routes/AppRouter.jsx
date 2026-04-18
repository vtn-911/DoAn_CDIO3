import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import ProtectedRoute from '../components/Common/ProtectedRoute'
import LoginPageRole from '../pages/LoginPageRole'

// Layout Components
import MainLayoutRole from '../components/Layout/MainLayoutRole'

// Admin Pages
import AdminDashboard from '../pages/Admin/AdminDashboard'
import StudentManagement from '../pages/Admin/StudentManagement'
import TeacherManagement from '../pages/Admin/TeacherManagement'
import ClassManagement from '../pages/Admin/ClassManagement'

// Teacher Pages
import TeacherDashboard from '../pages/Teacher/TeacherDashboard'
import ClassStudents from '../pages/Teacher/ClassStudents'

// Parent Pages
import ParentDashboard from '../pages/Parent/ParentDashboard'
import ChildInfo from '../pages/Parent/ChildInfo'

// Finance Pages
import FinanceDashboard from '../pages/Finance/FinanceDashboard'
import StudentFees from '../pages/Finance/StudentFees'

// Shared Pages
import HealthPage from '../pages/Shared/HealthPage'
import ActivitiesPage from '../pages/Shared/ActivitiesPage'
import CamerasPage from '../pages/Shared/CamerasPage'
import NotificationsPage from '../pages/Shared/NotificationsPage'
import AttendancePage from '../pages/Shared/AttendancePage'
import ReportsPage from '../pages/Shared/ReportsPage'

/**
 * App Router with role-based routing
 * Different roles see different pages and navigation
 */
export default function AppRouter() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<LoginPageRole />} />

          {/* Home Route - Redirects to role-specific dashboard */}
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={
                  (() => {
                    const user = localStorage.getItem('user')
                    const userData = user ? JSON.parse(user) : null
                    const role = userData?.role

                    switch (role) {
                      case 'admin':
                        return <Navigate to="/admin" replace />
                      case 'principal':
                        return <Navigate to="/principal" replace />
                      case 'teacher':
                        return <Navigate to="/teacher" replace />
                      case 'parent':
                        return <Navigate to="/parent" replace />
                      case 'finance':
                        return <Navigate to="/finance-dashboard" replace />
                      default:
                        return <Navigate to="/login" replace />
                    }
                  })()
                }
              />
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute
                element={<MainLayoutRole><AdminDashboard /></MainLayoutRole>}
                requiredRoles={['admin']}
              />
            }
          />
          <Route
            path="/principal"
            element={
              <ProtectedRoute
                element={<MainLayoutRole><AdminDashboard /></MainLayoutRole>}
                requiredRoles={['principal']}
              />
            }
          />
          <Route
            path="/teacher"
            element={
              <ProtectedRoute
                element={<MainLayoutRole><TeacherDashboard /></MainLayoutRole>}
                requiredRoles={['teacher']}
              />
            }
          />
          <Route
            path="/parent"
            element={
              <ProtectedRoute
                element={<MainLayoutRole><ParentDashboard /></MainLayoutRole>}
                requiredRoles={['parent']}
              />
            }
          />
          <Route
            path="/finance-dashboard"
            element={
              <ProtectedRoute
                element={<MainLayoutRole><FinanceDashboard /></MainLayoutRole>}
                requiredRoles={['finance']}
              />
            }
          />

          {/* Shared Admin/Principal Routes */}
          <Route
            path="/students-old"
            element={
              <ProtectedRoute
                element={<MainLayoutRole><StudentManagement /></MainLayoutRole>}
                requiredRoles={['admin', 'principal']}
              />
            }
          />
          <Route
            path="/students"
            element={
              <ProtectedRoute
                element={<MainLayoutRole><StudentManagement /></MainLayoutRole>}
                requiredRoles={['admin', 'principal', 'teacher']}
              />
            }
          />
          <Route
            path="/teachers"
            element={
              <ProtectedRoute
                element={<MainLayoutRole><TeacherManagement /></MainLayoutRole>}
                requiredRoles={['admin', 'principal']}
              />
            }
          />
          <Route
            path="/classes"
            element={
              <ProtectedRoute
                element={<MainLayoutRole><ClassManagement /></MainLayoutRole>}
                requiredRoles={['admin', 'principal', 'teacher']}
              />
            }
          />

          {/* Teacher Routes */}
          <Route
            path="/class-students"
            element={
              <ProtectedRoute
                element={<MainLayoutRole><ClassStudents /></MainLayoutRole>}
                requiredRoles={['teacher']}
              />
            }
          />

          {/* Parent Routes */}
          <Route
            path="/child-info"
            element={
              <ProtectedRoute
                element={<MainLayoutRole><ChildInfo /></MainLayoutRole>}
                requiredRoles={['parent']}
              />
            }
          />

          {/* Finance Routes */}
          <Route
            path="/finance"
            element={
              <ProtectedRoute
                element={<MainLayoutRole><FinanceDashboard /></MainLayoutRole>}
                requiredRoles={['admin', 'finance']}
              />
            }
          />
          <Route
            path="/student-fees"
            element={
              <ProtectedRoute
                element={<MainLayoutRole><StudentFees /></MainLayoutRole>}
                requiredRoles={['admin', 'finance']}
              />
            }
          />

          {/* Shared Routes */}
          <Route
            path="/health"
            element={
              <ProtectedRoute
                element={<MainLayoutRole><HealthPage /></MainLayoutRole>}
                requiredRoles={['admin', 'principal', 'teacher', 'parent']}
              />
            }
          />
          <Route
            path="/activities"
            element={
              <ProtectedRoute
                element={<MainLayoutRole><ActivitiesPage /></MainLayoutRole>}
                requiredRoles={['admin', 'principal', 'teacher', 'parent']}
              />
            }
          />
          <Route
            path="/cameras"
            element={
              <ProtectedRoute
                element={<MainLayoutRole><CamerasPage /></MainLayoutRole>}
                requiredRoles={['admin', 'principal', 'parent']}
              />
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute
                element={<MainLayoutRole><NotificationsPage /></MainLayoutRole>}
                requiredRoles={['admin', 'principal', 'teacher', 'parent', 'finance']}
              />
            }
          />

          {/* Attendance Routes */}
          <Route
            path="/attendance"
            element={
              <ProtectedRoute
                element={<MainLayoutRole><AttendancePage /></MainLayoutRole>}
                requiredRoles={['teacher']}
              />
            }
          />

          {/* Reports Routes */}
          <Route
            path="/reports"
            element={
              <ProtectedRoute
                element={<MainLayoutRole><ReportsPage /></MainLayoutRole>}
                requiredRoles={['admin', 'principal', 'finance']}
              />
            }
          />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}
