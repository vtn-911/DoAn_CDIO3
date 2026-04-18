import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Common/Button'
import InputField from '../components/Common/InputField'

/**
 * Login Page - Real login with username/password
 * Calls backend API for authentication
 */
export default function LoginPageRole() {
  const { login, loading, error } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [localError, setLocalError] = useState('')

  const testAccounts = [
    { username: 'admin', password: 'admin123', role: 'Admin' },
    { username: 'principal', password: 'principal123', role: 'Ban Giám Hiệu' },
    { username: 'teacher1', password: 'teacher123', role: 'Giáo Viên' },
    { username: 'parent1', password: 'parent123', role: 'Phụ Huynh' },
    { username: 'finance1', password: 'finance123', role: 'Tài Chính' }
  ]

  const handleLogin = async (e) => {
    e.preventDefault()
    setLocalError('')

    if (!username || !password) {
      setLocalError('Vui lòng nhập tên đăng nhập và mật khẩu')
      return
    }

    const success = await login(username, password)
    if (success) {
      navigate('/')
    } else {
      setLocalError(error || 'Đăng nhập thất bại')
    }
  }

  const handleQuickLogin = (testUsername, testPassword) => {
    setUsername(testUsername)
    setPassword(testPassword)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-surface-container-low via-surface to-surface-container-low p-4">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary opacity-10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-secondary opacity-5 rounded-full blur-3xl" />
      </div>

      {/* Main container */}
      <div className="relative w-full max-w-md">
        <div className="bg-surface-container-lowest rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg gradient-primary mb-6">
              <span className="material-symbols-outlined text-white text-4xl">kindergarten</span>
            </div>
            <h1 className="text-3xl font-black text-on-surface mb-2">
              Quản Lý Mầm Non
            </h1>
            <p className="text-on-surface-variant">
              Đăng nhập vào hệ thống
            </p>
          </div>

          {/* Error message */}
          {(localError || error) && (
            <div className="bg-error-fixed rounded-lg p-4 mb-6 border border-error">
              <p className="text-sm text-on-error-container">
                ⚠️ {localError || error}
              </p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6 mb-8">
            <InputField
              label="Tên đăng nhập"
              type="text"
              placeholder="admin, teacher1, parent1, ..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              icon="person"
              disabled={loading}
            />

            <InputField
              label="Mật khẩu"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon="lock"
              disabled={loading}
            />

            <Button
              variant="primary"
              size="lg"
              fullWidth
              type="submit"
              disabled={loading || !username || !password}
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined animate-spin">refresh</span>
                  Đang đăng nhập...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">login</span>
                  Đăng Nhập
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-surface-container-lowest text-on-surface-variant">
                Tài khoản demo
              </span>
            </div>
          </div>

          {/* Test Accounts */}
          <div className="space-y-3 mb-6">
            {testAccounts.map((account) => (
              <button
                key={account.username}
                type="button"
                onClick={() => handleQuickLogin(account.username, account.password)}
                disabled={loading}
                className="w-full p-3 rounded-lg border border-outline-variant hover:bg-surface-container-low transition-colors text-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-on-surface text-sm">{account.role}</p>
                    <p className="text-xs text-on-surface-variant">{account.username}</p>
                  </div>
                  <span className="material-symbols-outlined text-primary">arrow_forward</span>
                </div>
              </button>
            ))}
          </div>

          {/* Info Box */}
          <div className="bg-surface-container-low rounded-lg p-4 border border-outline-variant">
            <p className="text-xs text-on-surface-variant leading-relaxed">
              <strong>ℹ️ Lưu ý:</strong> Đây là hệ thống demo. Vui lòng sử dụng một trong những tài khoản demo ở trên hoặc liên hệ quản trị viên để tạo tài khoản mới.
            </p>
          </div>
        </div>

        {/* Backend Status */}
        <div className="mt-6 text-center">
          <p className="text-xs text-on-surface-variant">
            🚀 Backend: <span className="font-semibold">http://localhost:5000</span>
          </p>
        </div>
      </div>
    </div>
  )
}
