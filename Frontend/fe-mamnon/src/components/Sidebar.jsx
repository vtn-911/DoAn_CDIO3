import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';

const ROLE_MENUS = {
  ADMIN: [
    {
      id: 'accounts',
      label: 'Quản lý tài khoản',
      icon: 'person',
      children: [
        { id: 'user-accounts', label: 'Tài khoản người dùng' },
        { id: 'my-account', label: 'Tài khoản cá nhân' }
      ]
    }
  ],
  PRINCIPAL: [
    { id: 'teacher-management', label: 'Quản lý giáo viên', icon: 'school' },
    { id: 'general-schedule', label: 'Thời khóa biểu', icon: 'calendar_view_week' },
    {
      id: 'students',
      label: 'Quản lý học sinh',
      icon: 'people',
      children: [
        { id: 'student-info', label: 'Thông tin học sinh' },
        { id: 'student-academic', label: 'Hồ sơ học tập' },
        { id: 'student-attendance', label: 'Điểm danh' }
      ]
    },
    { id: 'classes', label: 'Quản lý lớp học', icon: 'class' },
    { id: 'reports', label: 'Báo cáo và thống kê', icon: 'bar_chart' },
    { id: 'notifications', label: 'Quản lý thông báo', icon: 'notifications' },
    {
      id: 'accounts',
      label: 'Quản lý tài khoản',
      icon: 'person',
      children: [
        { id: 'user-accounts', label: 'Tài khoản người dùng' },
        { id: 'my-account', label: 'Tài khoản cá nhân' }
      ]
    }
  ],
  TEACHER: [
    {
      id: 'students',
      label: 'Quản lý học sinh',
      icon: 'people',
      children: [
        { id: 'student-info', label: 'Thông tin học sinh' },
        { id: 'student-academic', label: 'Hồ sơ học tập' },
        { id: 'student-attendance', label: 'Điểm danh' }
      ]
    },
    { id: 'classes', label: 'Quản lý lớp học', icon: 'class' },
    { id: 'general-schedule', label: 'Lịch giảng dạy', icon: 'calendar_view_week' },
    { id: 'health', label: 'Sức khỏe học sinh', icon: 'favorite' },
    { id: 'notifications', label: 'Quản lý thông báo', icon: 'notifications' },
    { id: 'accounts', label: 'Tài khoản', icon: 'person' },
  ],
  FINANCE: [
    { id: 'revenue', label: 'Quản lý thu chi', icon: 'receipt' },
    { id: 'reports', label: 'Báo cáo và thống kê', icon: 'bar_chart' },
    { id: 'notifications', label: 'Quản lý thông báo', icon: 'notifications' },
    { id: 'accounts', label: 'Tài khoản', icon: 'person' },
  ],
  PARENT: [
    { 
      id: 'children-info', 
      label: 'Xem thông tin của con', 
      icon: 'child_care',
      icon: 'child_care',
      children: [
        { id: 'child-profile', label: 'Thông tin cá nhân' },
        { id: 'child-academic', label: 'Học tập' },
        { id: 'child-health', label: 'Hồ sơ sức khỏe' },
        { id: 'child-schedule', label: 'Lịch học' },
      ]
    },
    { id: 'camera', label: 'Giám sát camera', icon: 'videocam' },
    { id: 'notifications', label: 'Quản lý thông báo', icon: 'notifications' },
    { id: 'accounts', label: 'Tài khoản', icon: 'person' },
  ],
};

export function Sidebar({ activeItem, onItemClick }) {
  const { role, logout, user } = useAuth();
  const menuItems = ROLE_MENUS[role] || [];
  const [openMenu, setOpenMenu] = useState(null);


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
        <p className="text-xs text-on-surface-variant mt-2">
          {user?.hoTen || user?.tenDangNhap}
        </p>
      </div>

      <nav className="flex-1 space-y-1 px-4 overflow-y-auto">
        {menuItems.map((item) => {
          const isActiveParent = activeItem?.id === item.id || (item.children && item.children.some(c => c.id === activeItem?.id));

          return (
            <div key={item.id} className="mb-1">
              {/* MENU CHA */}
              <button
                onClick={() => {
                  if (item.children) {
                    setOpenMenu(openMenu === item.id ? null : item.id);
                    onItemClick?.(item);
                  } else {
                    onItemClick?.(item);
                  }
                }}
                className={`w-full flex items-center px-4 py-2.5 rounded-xl transition-all duration-200 ${isActiveParent
                  ? 'bg-primary text-white shadow-md shadow-primary/20 font-bold'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-semibold'
                  }`}
              >
                <span className="material-symbols-outlined mr-3 text-xl">
                  {item.icon}
                </span>
                <span>{item.label}</span>
                {item.children && (
                  <span
                    className="material-symbols-outlined ml-auto text-lg transition-transform duration-300"
                    style={{ transform: openMenu === item.id ? 'rotate(180deg)' : 'none' }}
                  >
                    expand_more
                  </span>
                )}
              </button>

              {/* MENU CON */}
              {item.children && openMenu === item.id && (
                <div className="ml-6 mt-1 pl-4 border-l-2 border-outline-variant/30 space-y-1 animate-in slide-in-from-top-2 fade-in duration-200">
                  {item.children.map((child) => {
                    const isActiveChild = activeItem?.id === child.id;
                    return (
                      <button
                        key={child.id}
                        onClick={() => onItemClick?.(child)}
                        className={`block w-full text-left px-4 py-2 text-sm rounded-lg transition-all ${isActiveChild
                          ? 'bg-primary/10 text-primary font-bold'
                          : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-medium'
                          }`}
                      >
                        {child.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )
        })}
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
