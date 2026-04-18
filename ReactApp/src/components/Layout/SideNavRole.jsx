import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { menuByRole } from '../../data/dummyData'

/**
 * SideNav Component - Role-based sidebar navigation
 * Shows different menu items based on user role
 */
export default function SideNav() {
  const { role, user, logout } = useAuth()
  const location = useLocation()

  // Get menu items based on role
  const menuItems = menuByRole[role] || []

  const isActive = (path) => location.pathname === path

  return (
    <aside className="h-screen sticky left-0 w-64 border-r border-slate-200 bg-slate-50 flex flex-col py-4 space-y-1">
      {/* Logo Section */}
      <div className="px-6 mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-xl">kindergarten</span>
          </div>
          <div>
            <h1 className="text-lg font-black text-blue-800">Mầm Non</h1>
            <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
              {role === 'admin' && 'Quản Trị'}
              {role === 'principal' && 'Ban Giám Hiệu'}
              {role === 'teacher' && 'Giáo Viên'}
              {role === 'parent' && 'Phụ Huynh'}
              {role === 'finance' && 'Tài Chính'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-1 px-2 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`
              flex items-center px-4 py-2.5 mx-2 rounded-lg transition-all duration-200 ease-in-out
              ${isActive(item.path)
                ? 'bg-white text-blue-600 shadow-sm font-semibold'
                : 'text-slate-600 hover:bg-slate-100'
              }
            `}
          >
            <span className="material-symbols-outlined mr-3 text-lg">
              {item.icon}
            </span>
            <span className="text-sm">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* User Info Section */}
      <div className="px-4 py-4 border-t border-slate-200">
        <div className="flex items-center gap-3 mb-4">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-on-surface truncate">{user?.name}</p>
            <p className="text-xs text-on-surface-variant truncate">{user?.email}</p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all text-sm font-medium"
        >
          <span className="material-symbols-outlined mr-2">logout</span>
          Đăng Xuất
        </button>
      </div>
    </aside>
  )
}
