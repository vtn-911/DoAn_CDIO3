# 🎓 Hệ Thống Quản Lý Mầm Non - React Architecture Documentation

## 📋 Tổng Quan Hệ Thống

**Hệ thống quản lý trường mầm non với 5 vai trò (Roles):**
- 👨‍💼 **Admin** - Quản trị toàn hệ thống
- 👔 **Ban Giám Hiệu** - Quản lý nhà trường  
- 👩‍🏫 **Giáo Viên** - Quản lý lớp học
- 👨‍👩‍👧 **Phụ Huynh** - Xem thông tin con em
- 💰 **Tài Chính** - Quản lý tài chính

---

## 📁 Cấu Trúc Thư Mục Đầy Đủ

```
ReactApp/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Common/
│   │   │   ├── Button.jsx           # Reusable button component
│   │   │   ├── InputField.jsx       # Form input component
│   │   │   ├── Card.jsx             # Data card component
│   │   │   └── ProtectedRoute.jsx   # Route protection & role checks
│   │   │
│   │   └── Layout/
│   │       ├── MainLayout.jsx       # Main layout (old - keep for reference)
│   │       ├── MainLayoutRole.jsx   # NEW: Main layout with role-based nav
│   │       ├── SideNav.jsx          # Sidebar (old - static)
│   │       ├── SideNavRole.jsx      # NEW: Role-based sidebar
│   │       └── TopNav.jsx           # Top navigation bar
│   │
│   ├── context/
│   │   └── AuthContext.jsx          # NEW: Global auth & role management
│   │
│   ├── hooks/
│   │   └── useAuth.js               # NEW: Custom hooks for auth/role
│   │
│   ├── data/
│   │   └── dummyData.js             # NEW: Mock data for all roles
│   │
│   ├── pages/
│   │   ├── LoginPageRole.jsx        # NEW: Role selection login
│   │   │
│   │   ├── Admin/
│   │   │   ├── AdminDashboard.jsx       # Admin overview
│   │   │   ├── StudentManagement.jsx    # Manage students
│   │   │   ├── TeacherManagement.jsx    # Manage teachers
│   │   │   └── ClassManagement.jsx      # Manage classes
│   │   │
│   │   ├── Teacher/
│   │   │   ├── TeacherDashboard.jsx     # Teacher overview
│   │   │   └── ClassStudents.jsx        # View class students
│   │   │
│   │   ├── Parent/
│   │   │   ├── ParentDashboard.jsx      # Parent overview
│   │   │   └── ChildInfo.jsx           # View child info
│   │   │
│   │   ├── Finance/
│   │   │   ├── FinanceDashboard.jsx     # Finance overview
│   │   │   └── StudentFees.jsx          # Manage student fees
│   │   │
│   │   ├── Shared/
│   │   │   ├── HealthPage.jsx          # Health management
│   │   │   ├── ActivitiesPage.jsx      # View activities
│   │   │   ├── CamerasPage.jsx         # Camera surveillance
│   │   │   └── NotificationsPage.jsx   # View notifications
│   │   │
│   │   └── Dashboard/
│   │       └── [old pages kept for reference]
│   │
│   ├── routes/
│   │   └── AppRouter.jsx            # NEW: Central routing with role-based guards
│   │
│   ├── utils/
│   │   └── [utility functions]
│   │
│   ├── App.jsx                      # Main app component (simplified)
│   ├── main.jsx                     # Entry point
│   ├── index.css                    # Global styles
│   │
│   ├── tailwind.config.js           # Tailwind CSS configuration
│   ├── postcss.config.js            # PostCSS configuration
│   ├── vite.config.js               # Vite configuration
│   │
│   └── package.json                 # Dependencies
```

---

## 🔐 Role-Based Access Control (RBAC)

### Menu Items by Role

| Role | Available Pages |
|------|-----------------|
| **Admin** | Dashboard, Students, Teachers, Classes, Health, Activities, Cameras, Notifications, Finance, Reports |
| **Principal** | Dashboard, Students, Teachers, Classes, Activities, Notifications, Reports |
| **Teacher** | Dashboard, Class Students, Health, Activities, Attendance, Notifications |
| **Parent** | Dashboard, Child Info, Health, Attendance, Activities, Notifications |
| **Finance** | Dashboard, Finance, Student Fees, Reports |

### Data Structure

```javascript
// User types in AuthContext
{
  id: 'user-001',
  name: 'Name',
  email: 'email@kinder.edu',
  role: 'admin|principal|teacher|parent|finance',
  avatar: 'image-url'
}

// Available students in dummyData
{
  id: 'HS001',
  name: 'Nguyễn Hoàng Minh Khoa',
  dob: '2020-05-15',
  age: 4,
  class: 'Lớp Mầm A',
  health: { weight, height, allergies, vaccinated },
  attendance: { present, absent, rate }
}
```

---

## 📝 Code Samples

### 1️⃣ Router Configuration (src/routes/AppRouter.jsx)

```jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import ProtectedRoute from '../components/Common/ProtectedRoute'
import LoginPageRole from '../pages/LoginPageRole'
import MainLayoutRole from '../components/Layout/MainLayoutRole'

// Import Admin Pages
import AdminDashboard from '../pages/Admin/AdminDashboard'
import StudentManagement from '../pages/Admin/StudentManagement'

// Import Teacher Pages
import TeacherDashboard from '../pages/Teacher/TeacherDashboard'

// Import Parent Pages
import ParentDashboard from '../pages/Parent/ParentDashboard'

export default function AppRouter() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Login - Public */}
          <Route path="/login" element={<LoginPageRole />} />

          {/* Admin Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={<MainLayoutRole><AdminDashboard /></MainLayoutRole>}
                requiredRoles={['admin', 'principal']}
              />
            }
          />
          <Route
            path="/students"
            element={
              <ProtectedRoute
                element={<MainLayoutRole><StudentManagement /></MainLayoutRole>}
                requiredRoles={['admin', 'principal']}
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

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}
```

---

### 2️⃣ Role-Based Sidebar (src/components/Layout/SideNavRole.jsx)

```jsx
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { menuByRole } from '../data/dummyData'

export default function SideNavRole() {
  const { role, user, logout } = useAuth()
  const location = useLocation()

  // Get menu items based on role
  const menuItems = menuByRole[role] || []

  const isActive = (path) => location.pathname === path

  return (
    <aside className="h-screen sticky left-0 w-64 border-r border-slate-200 bg-slate-50 flex flex-col py-4">
      {/* Logo */}
      <div className="px-6 mb-8">
        <h1 className="text-lg font-black text-blue-800">Mầm Non</h1>
        <p className="text-[10px] uppercase tracking-widest text-on-surface-variant">
          {role === 'admin' && 'Quản Trị'}
          {role === 'teacher' && 'Giáo Viên'}
          {role === 'parent' && 'Phụ Huynh'}
        </p>
      </div>

      {/* Navigation - Role-based menu items */}
      <nav className="flex-1 space-y-1 px-2">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`
              flex items-center px-4 py-2.5 rounded-lg transition-all
              ${isActive(item.path)
                ? 'bg-white text-blue-600 shadow-sm font-semibold'
                : 'text-slate-600 hover:bg-slate-100'
              }
            `}
          >
            <span className="material-symbols-outlined mr-3">{item.icon}</span>
            <span className="text-sm">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* User Info */}
      <div className="px-4 py-4 border-t border-slate-200">
        <div className="flex items-center gap-3 mb-4">
          <img src={user?.avatar} className="w-10 h-10 rounded-full" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
        <button onClick={logout} className="flex w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded">
          <span className="material-symbols-outlined mr-2">logout</span>
          Đăng Xuất
        </button>
      </div>
    </aside>
  )
}
```

---

### 3️⃣ Auth Context (src/context/AuthContext.jsx)

```jsx
import { createContext, useState } from 'react'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)

  // Mock users for each role
  const usersByRole = {
    admin: {
      id: 'admin-001',
      name: 'Nguyễn Văn Admin',
      email: 'admin@kinder.edu',
      role: 'admin'
    },
    teacher: {
      id: 'teacher-001',
      name: 'Cô Ngọc Anh',
      email: 'teacher@kinder.edu',
      role: 'teacher'
    },
    parent: {
      id: 'parent-001',
      name: 'Anh Minh Tuấn',
      email: 'parent@kinder.edu',
      role: 'parent'
    }
  }

  const login = (selectedRole) => {
    const userData = usersByRole[selectedRole]
    if (userData) {
      setUser(userData)
      setRole(selectedRole)
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    setRole(null)
  }

  const hasRole = (requiredRoles) => {
    if (!role) return false
    if (Array.isArray(requiredRoles)) {
      return requiredRoles.includes(role)
    }
    return role === requiredRoles
  }

  return (
    <AuthContext.Provider value={{ user, role, login, logout, hasRole, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}
```

---

### 4️⃣ Protected Route (src/components/Common/ProtectedRoute.jsx)

```jsx
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function ProtectedRoute({ element, requiredRoles = null }) {
  const { isAuthenticated, hasRole } = useAuth()

  // Check authentication
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Check role
  if (requiredRoles && !hasRole(requiredRoles)) {
    return <Navigate to="/unauthorized" replace />
  }

  return element
}

// Conditional rendering by role
export function RoleBasedRender({ children, roles, fallback = null }) {
  const { hasRole } = useAuth()
  if (!hasRole(roles)) return fallback
  return children
}

export function AdminOnly({ children }) {
  return <RoleBasedRender roles="admin">{children}</RoleBasedRender>
}
```

---

### 5️⃣ Admin Dashboard Example (src/pages/Admin/AdminDashboard.jsx)

```jsx
import { useAuth } from '../../hooks/useAuth'
import Card from '../components/Common/Card'
import Button from '../components/Common/Button'

export default function AdminDashboard() {
  const { user } = useAuth()

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <section>
        <span className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant">
          Chào mừng trở lại
        </span>
        <h2 className="text-4xl font-extrabold text-on-background">
          Dashboard Quản Trị
        </h2>
      </section>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card title="Tổng Học Sinh" value="45" accentColor="primary" />
        <Card title="Tổng Giáo Viên" value="12" accentColor="secondary" />
        <Card title="Lớp Học" value="5" accentColor="primary" />
        <Card title="Doanh Thu" value="₫ 22.5M" accentColor="secondary" />
      </section>

      {/* More content... */}
    </div>
  )
}
```

---

## 🚀 Setup & Running

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Server will run at: `http://localhost:5173`

### 3. Login with Any Role
1. Go to login page
2. Click one of 5 role buttons (Admin, Principal, Teacher, Parent, Finance)
3. Click "Đăng Nhập"
4. See role-specific dashboard and navigation

### 4. Build for Production
```bash
npm run build
```

---

## 🎨 Design System

**Tailwind CSS + "Academic Curator" Design**
- Primary: `#005daa` (Blue)
- Secondary: `#266d00` (Green)
- Tertiary: `#7d5400` (Orange)
- Error: `#c5192d` (Red)

**Custom Color Tokens** (see tailwind.config.js):
- `on-surface`, `on-surface-variant`
- `surface`, `surface-container`, `surface-container-low`, `surface-container-lowest`
- `gradient-primary`, `gradient-secondary`

---

## 📊 Data Flow

```
AppRouter (entry)
  └─ AuthProvider (global auth state)
      └─ LoginPageRole (select role)
          └─ useAuth().login(role)
              └─ AuthContext updates user & role
                  └─ Navigate to MainLayoutRole
                      └─ SideNavRole shows role-based menu
                          └─ ProtectedRoute guards each page
```

---

## 🔧 Key Components & Their Roles

| Component | Purpose | Location |
|-----------|---------|----------|
| `AppRouter` | Central routing hub with role guards | `src/routes/` |
| `AuthContext` | Global auth & role state | `src/context/` |
| `AuthProvider` | Wraps app with auth context | `src/context/` |
| `ProtectedRoute` | Guards routes by auth & role | `src/components/Common/` |
| `SideNavRole` | Role-based sidebar navigation | `src/components/Layout/` |
| `MainLayoutRole` | Layout wrapper with sidebar+content | `src/components/Layout/` |
| `LoginPageRole` | 5-role selector login screen | `src/pages/` |
| `[Role]Dashboard` | Landing page for each role | `src/pages/[Role]/` |

---

## 🎯 Next Steps to Expand

1. **Add Principal Pages** - Giám hiệu-specific views
2. **Finance Reports** - Detailed transaction & revenue reports
3. **Health Tracking** - Vaccination, checkup history
4. **Camera Integration** - Real RTSP/HLS streaming (placeholder now)
5. **Attendance System** - Daily attendance tracking
6. **Parent Notifications** - Push/email notifications
7. **Database Integration** - Replace dummyData with API calls
8. **Authentication** - Real JWT tokens with backend
9. **File Upload** - Student photos, documents
10. **Mobile Responsive** - Optimize for tablets/phones

---

## 📚 Technology Stack

- **React 18.2** - UI Framework
- **React Router v6** - Client-side routing
- **Tailwind CSS 3.3** - Utility-first CSS
- **Vite 5.0** - Build tool
- **Context API** - State management
- **Material Symbols** - Icon library

---

## ⚠️ Important Notes

- **No Real Authentication** - Demo uses mock auth context
- **No Backend** - All data is hardcoded in `dummyData.js`
- **No Database** - Student/teacher/class info is static
- **Demo Only** - For UI/UX development only

---

## 🤝 Contributing

To add new role pages:
1. Create page in `src/pages/[RoleName]/`
2. Add route in `src/routes/AppRouter.jsx` with `ProtectedRoute` guard
3. Add menu item to `menuByRole[role]` in `src/data/dummyData.js`
4. SideNavRole will auto-update

---

**Last Updated:** 2024-03-15  
**Version:** 1.0.0 (Multi-Role RBAC System)
