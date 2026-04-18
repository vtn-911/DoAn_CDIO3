import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

/**
 * ProtectedRoute Component - Guard routes by authentication and role
 * Usage: <ProtectedRoute element={<PageComponent />} requiredRoles={['admin', 'principal']} />
 */
export default function ProtectedRoute({ element, requiredRoles = null }) {
  const { isAuthenticated, hasRole } = useAuth()

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Check if user has required role
  if (requiredRoles && !hasRole(requiredRoles)) {
    return <Navigate to="/unauthorized" replace />
  }

  return element
}

/**
 * RoleBasedRender Component - Conditionally render based on role
 * Usage: <RoleBasedRender roles={['admin', 'principal']}><AdminPanel /></RoleBasedRender>
 */
export function RoleBasedRender({ children, roles, fallback = null }) {
  const { hasRole } = useAuth()

  if (!hasRole(roles)) {
    return fallback
  }

  return children
}

/**
 * AdminOnly Component - Show content only to admin
 */
export function AdminOnly({ children }) {
  return <RoleBasedRender roles="admin">{children}</RoleBasedRender>
}

/**
 * TeacherOnly Component - Show content only to teachers
 */
export function TeacherOnly({ children }) {
  return <RoleBasedRender roles={['teacher']}>{children}</RoleBasedRender>
}

/**
 * ParentOnly Component - Show content only to parents
 */
export function ParentOnly({ children }) {
  return <RoleBasedRender roles={['parent']}>{children}</RoleBasedRender>
}
