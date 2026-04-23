import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const ROLE_MENUS = {
  ADMIN: [
    { id: 'accounts', label: 'Quản lý tài khoản', icon: 'person' },
  ],
  PRINCIPAL: [
    { id: 'teachers', label: 'Quản lý giáo viên', icon: 'school' },
    { id: 'students', label: 'Quản lý học sinh', icon: 'people' },
    { id: 'classes', label: 'Quản lý lớp học', icon: 'class' },
    { id: 'reports', label: 'Báo cáo và thống kê', icon: 'bar_chart' },
    { id: 'notifications', label: 'Quản lý thông báo', icon: 'notifications' },
    { id: 'accounts', label: 'Quản lý tài khoản', icon: 'person' },
  ],
  TEACHER: [
    { id: 'students', label: 'Quản lý học sinh', icon: 'people' },
    { id: 'classes', label: 'Quản lý lớp học', icon: 'class' },
    { id: 'health', label: 'Theo dõi sức khỏe học sinh', icon: 'favorite' },
    { id: 'notifications', label: 'Quản lý thông báo', icon: 'notifications' },
    { id: 'accounts', label: 'Quản lý tài khoản', icon: 'person' },
  ],
  FINANCE: [
    { id: 'revenue', label: 'Quản lý thu chi', icon: 'receipt' },
    { id: 'reports', label: 'Báo cáo và thống kê', icon: 'bar_chart' },
    { id: 'accounts', label: 'Quản lý tài khoản', icon: 'person' },
    { id: 'notifications', label: 'Quản lý thông báo', icon: 'notifications' },
  ],
  PARENT: [
    { id: 'children', label: 'Xem thông tin của con', icon: 'child_care' },
    { id: 'camera', label: 'Giám sát camera', icon: 'videocam' },
    { id: 'notifications', label: 'Quản lý thông báo', icon: 'notifications' },
    { id: 'accounts', label: 'Quản lý tài khoản', icon: 'person' },
  ],
};

export function Sidebar({ activeItem, onItemClick }) {
  const { role, logout } = useAuth();
  const menuItems = ROLE_MENUS[role] || [];

  return (
    <aside className="h-screen sticky left-0 w-64 border-r border-slate-200 bg-slate-50 flex flex-col py-4 space-y-1 font-body text-sm font-medium">
      <div className="px-6 mb-8 flex flex-col items-start">
        <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-white text-2xl">school</span>
        </div>
        <h1 className="text-lg font-bold text-primary">Mầm Non Plus</h1>
        <p className="text-xs uppercase tracking-widest text-on-surface-variant font-bold opacity-60 mt-1">
          {role}
        </p>
      </div>

      <nav className="flex-1 space-y-1 px-2 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick?.(item)}
            className={`w-full flex items-center px-4 py-2.5 rounded-lg mx-2 transition-all duration-200 ease-in-out ${
              activeItem?.id === item.id
                ? 'bg-white text-primary shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span className="material-symbols-outlined mr-3 text-xl">{item.icon}</span>
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-slate-200">
        <button
          onClick={() => logout()}
          className="w-full flex items-center justify-center px-4 py-2.5 rounded-lg bg-primary text-white hover:bg-blue-700 transition-all duration-200"
        >
          <span className="material-symbols-outlined mr-2 text-xl">logout</span>
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}
