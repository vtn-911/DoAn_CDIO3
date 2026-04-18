import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

/**
 * SideNav Component - Sidebar navigation
 * Displays menu items and handles active state
 */
export default function SideNav({ onLogout }) {
  const location = useLocation()

  // Navigation items matching the design
  const navItems = [
    { icon: 'home', label: 'Dashboard', path: '/' },
    { icon: 'person', label: 'User Management', path: '/users' },
    { icon: 'group', label: 'Teacher Management', path: '/teachers' },
    { icon: 'school', label: 'Student Management', path: '/students' },
    { icon: 'class', label: 'Class Management', path: '/classes' },
    { icon: 'assessment', label: 'Reports', path: '/reports' },
    { icon: 'videocam', label: 'Camera', path: '/camera' },
    { icon: 'payments', label: 'Finance', path: '/finance' },
    { icon: 'rule', label: 'Attendance', path: '/attendance' },
    { icon: 'favorite', label: 'Health Tracking', path: '/health' },
    { icon: 'notifications', label: 'Notifications', path: '/notifications' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <aside className="h-screen sticky left-0 w-64 border-r border-slate-200 bg-slate-50 flex flex-col py-4 space-y-1">
      {/* Logo Section */}
      <div className="px-6 mb-8">
        <h1 className="text-lg font-black text-blue-800">Curator Admin</h1>
        <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
          Premium Management
        </p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-1 px-2 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`
              flex items-center px-4 py-2.5 mx-2 rounded-lg transition-all duration-200 ease-in-out
              ${isActive(item.path)
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
              }
            `}
          >
            <span className="material-symbols-outlined mr-3">
              {item.icon}
            </span>
            <span className={`text-sm font-medium ${isActive(item.path) ? 'font-bold' : ''}`}>
              {item.label}
            </span>
          </Link>
        ))}
      </nav>

      {/* Footer - Settings & Logout */}
      <div className="mt-auto px-2 space-y-1 border-t border-slate-200 pt-4">
        <button className="flex items-center w-full px-4 py-2.5 mx-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-all duration-200">
          <span className="material-symbols-outlined mr-3">settings</span>
          <span className="text-sm font-medium">Settings</span>
        </button>
        <button
          onClick={onLogout}
          className="flex items-center w-full px-4 py-2.5 mx-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
        >
          <span className="material-symbols-outlined mr-3">logout</span>
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  )
}
