import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

/**
 * Custom hook - useAuth
 * Access authentication context easily
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

/**
 * Custom hook - useRole
 * Check if current user has specific role
 */
export function useRole(requiredRoles) {
  const { hasRole, role } = useAuth()
  return {
    hasRole: hasRole(requiredRoles),
    currentRole: role,
    can: (roles) => hasRole(roles)
  }
}
