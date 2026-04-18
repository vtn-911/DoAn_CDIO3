import { createContext, useState, useEffect } from 'react'
import { authAPI } from '../api/client'

/**
 * AuthContext - Global authentication & role management
 * Integrates with real backend API
 */
export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Restore session on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    
    if (savedToken && savedUser) {
      setToken(savedToken)
      const userData = JSON.parse(savedUser)
      setUser(userData)
      setRole(userData.role)
    }
  }, [])

  // Login function - calls real API
  const login = async (username, password) => {
    try {
      setLoading(true)
      setError(null)

      const response = await authAPI.login(username, password)
      
      // Save token and user to localStorage
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))

      // Update state
      setToken(response.token)
      setUser(response.user)
      setRole(response.user.role)

      console.log(`✓ Logged in as ${response.user.role}:`, response.user)
      return true
    } catch (err) {
      setError(err.message)
      console.error('Login failed:', err)
      return false
    } finally {
      setLoading(false)
    }
  }

  // Logout function
  const logout = async () => {
    try {
      await authAPI.logout()
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      setUser(null)
      setRole(null)
      setToken(null)
      console.log('✓ Logged out')
    }
  }

  // Check if user has permission
  const hasRole = (requiredRoles) => {
    if (!role) return false
    if (Array.isArray(requiredRoles)) {
      return requiredRoles.includes(role)
    }
    return role === requiredRoles
  }

  const value = {
    user,
    role,
    token,
    loading,
    error,
    login,
    logout,
    hasRole,
    isAuthenticated: !!user,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
