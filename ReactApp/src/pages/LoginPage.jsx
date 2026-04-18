import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InputField from '../components/Common/InputField'
import Button from '../components/Common/Button'

/**
 * LoginPage Component - Authentication page
 * Handles email/password input and login
 */
export default function LoginPage({ onLogin }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  // Validate form
  const validateForm = () => {
    const newErrors = {}

    // Email validation
    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Please enter a valid email'
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    return newErrors
  }

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault()

    // Validate
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)
    setErrors({})

    // Simulate API call (500ms delay)
    setTimeout(() => {
      console.log('✓ Login successful:', { email, password })
      onLogin(email, password)
      navigate('/')
      setIsLoading(false)
    }, 500)
  }

  // Handle demo login (for testing)
  const handleDemoLogin = () => {
    setEmail('admin@curator.edu')
    setPassword('password123')
    setErrors({})
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-surface-container-low via-surface to-surface-container-low p-4">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary opacity-10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-secondary opacity-5 rounded-full blur-3xl" />
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-surface-container-lowest rounded-2xl shadow-lg p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg gradient-primary mb-6">
              <span className="material-symbols-outlined text-white text-4xl">school</span>
            </div>
            <h1 className="text-3xl font-black text-on-surface mb-2">Curator Admin</h1>
            <p className="text-on-surface-variant">Premium School Management System</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Input */}
            <InputField
              type="email"
              label="Email Address"
              placeholder="admin@curator.edu"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email) setErrors({ ...errors, email: '' })
              }}
              error={errors.email}
              icon={<span className="material-symbols-outlined">mail</span>}
            />

            {/* Password Input */}
            <InputField
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (errors.password) setErrors({ ...errors, password: '' })
              }}
              error={errors.password}
              icon={<span className="material-symbols-outlined">lock</span>}
            />

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span className="text-on-surface-variant">Remember me</span>
              </label>
              <button type="button" className="text-primary hover:underline">
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined animate-spin">refresh</span>
                  Logging in...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">login</span>
                  Sign In
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-surface-container-lowest text-on-surface-variant">Demo Mode</span>
            </div>
          </div>

          {/* Demo Login Button */}
          <Button
            variant="secondary"
            size="lg"
            fullWidth
            onClick={handleDemoLogin}
          >
            <span className="material-symbols-outlined">preview</span>
            Load Demo Account
          </Button>

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-on-surface-variant">
            <p>
              Demo Account:
              <br />
              <span className="text-on-surface font-medium">admin@curator.edu</span>
              <br />
              <span className="text-on-surface font-medium">password123</span>
            </p>
          </div>
        </div>

        {/* Footer text */}
        <div className="text-center mt-6 text-xs text-on-surface-variant">
          <p>
            &copy; 2024 Academic Curator. All rights reserved.
            <br />
            <a href="#" className="text-primary hover:underline">Privacy Policy</a> &middot;{' '}
            <a href="#" className="text-primary hover:underline">Terms of Service</a>
          </p>
        </div>
      </div>
    </div>
  )
}
