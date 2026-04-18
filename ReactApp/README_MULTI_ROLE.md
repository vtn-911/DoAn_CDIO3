# 📚 Complete Multi-Role System Guide

## 🎯 Quick Start (3 Steps)

```bash
1. npm install
2. npm run dev
3. Open http://localhost:5173 → Select role → Click "Đăng Nhập"
```

---

## 🏗️ System Architecture Overview

### Three-Layer Structure

```
┌─────────────────────────────────────────┐
│         APP LAYER                       │
│  - App.jsx                              │
│  - Routes & Pages                       │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│    CONTEXT LAYER (State)                │
│  - AuthContext (user, role, login)      │
│  - useAuth hook                         │
│  - ProtectedRoute guards                │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│      DATA LAYER                         │
│  - dummyData.js (students, teachers)    │
│  - menuByRole (navigation)              │
│  - Mock data for all roles              │
└─────────────────────────────────────────┘
```

---

## 🔄 User Flow

```
STEP 1: App Starts
  └─ AppRouter renders
     └─ AuthProvider wraps app
        └─ User not authenticated

STEP 2: Login Page
  └─ LoginPageRole shows 5 role buttons
     - Admin
     - Principal (Ban Giám Hiệu)
     - Teacher (Giáo Viên)
     - Parent (Phụ Huynh)
     - Finance (Tài Chính)

STEP 3: Select Role & Login
  └─ User clicks role button
     └─ useAuth().login(role)
        └─ AuthContext state updated
           └─ Navigate to "/"

STEP 4: Dashboard
  └─ ProtectedRoute checks role
     └─ MainLayoutRole renders
        └─ SideNavRole shows role-specific menu
           └─ Dashboard page loads

STEP 5: Navigation
  └─ User clicks menu item
     └─ SideNavRole filters by role
        └─ Only role-allowed pages shown
           └─ Page content loads
```

---

## 🔐 Role-Based Access Control

### Admin Role
**Access All Pages:**
- ✅ Dashboard (Admin overview)
- ✅ Students (manage all)
- ✅ Teachers (manage all)
- ✅ Classes (manage all)
- ✅ Health (view all)
- ✅ Cameras (surveillance)
- ✅ Activities (all activities)
- ✅ Notifications (all)
- ✅ Finance (revenue overview)
- ✅ Reports (all reports)

**Data Visible:**
- All 45 students
- All 12 teachers
- All 5 classes
- All transactions

### Teacher Role
**Access Limited Pages:**
- ✅ Dashboard (class overview)
- ✅ Class Students (only their class)
- ✅ Health (class students only)
- ✅ Activities (class activities only)
- ✅ Attendance (their class)
- ✅ Notifications (relevant only)

**Data Visible:**
- Their class students only
- Their own info
- Class activities
- Class attendance

### Parent Role
**Access Minimal Pages:**
- ✅ Dashboard (child overview)
- ✅ Child Info (their child)
- ✅ Health (their child only)
- ✅ Attendance (their child)
- ✅ Activities (school-wide)
- ✅ Notifications (relevant)

**Data Visible:**
- Their child's info only
- Their child's attendance
- Their child's health
- School notifications

### Finance Role
**Access Finance Pages:**
- ✅ Dashboard (finance overview)
- ✅ Finance (transactions)
- ✅ Student Fees (payment status)
- ✅ Reports (financial reports)

**Data Visible:**
- All transactions
- All student fees
- Revenue/expense reports
- Payment status

### Principal Role
**Access Management Pages:**
- ✅ Dashboard (school overview)
- ✅ Students (view/manage)
- ✅ Teachers (view/manage)
- ✅ Classes (view/manage)
- ✅ Activities (all activities)
- ✅ Notifications (all)
- ✅ Reports (school reports)

**Data Visible:**
- All students & teachers
- All classes
- School-wide activities
- Overall reports

---

## 📁 File Organization by Purpose

### 1. **Authentication & Authorization**
```
src/context/AuthContext.jsx      ← Global user & role state
src/hooks/useAuth.js             ← Custom hook to access auth
src/components/Common/ProtectedRoute.jsx  ← Route guards
src/pages/LoginPageRole.jsx      ← 5-role login screen
```

### 2. **Routing & Navigation**
```
src/routes/AppRouter.jsx         ← Central router with guards
src/components/Layout/SideNavRole.jsx     ← Role-based sidebar
src/components/Layout/MainLayoutRole.jsx  ← Layout wrapper
src/components/Layout/TopNav.jsx ← Top bar
```

### 3. **Data**
```
src/data/dummyData.js            ← All mock data:
  - studentsData               (3 students)
  - teachersData               (3 teachers)
  - classesData                (2 classes)
  - activitiesData             (2 activities)
  - financeData                (budget, transactions)
  - notificationsData          (4 notifications)
  - menuByRole                 (menu per role)
```

### 4. **Pages by Role**
```
src/pages/Admin/                 ← Admin-only pages
  - AdminDashboard.jsx
  - StudentManagement.jsx
  - TeacherManagement.jsx
  - ClassManagement.jsx

src/pages/Teacher/               ← Teacher-only pages
  - TeacherDashboard.jsx
  - ClassStudents.jsx

src/pages/Parent/                ← Parent-only pages
  - ParentDashboard.jsx
  - ChildInfo.jsx

src/pages/Finance/               ← Finance-only pages
  - FinanceDashboard.jsx
  - StudentFees.jsx

src/pages/Shared/                ← Accessible to multiple roles
  - HealthPage.jsx
  - ActivitiesPage.jsx
  - CamerasPage.jsx
  - NotificationsPage.jsx
```

### 5. **Reusable Components**
```
src/components/Common/
  - Button.jsx                 ← 3 variants × 3 sizes
  - InputField.jsx             ← Form inputs with validation
  - Card.jsx                   ← Data display cards
  - ProtectedRoute.jsx         ← Route protection
```

---

## 🎨 Design System

### Colors (40+ tokens)
```javascript
Primary:        #005daa  (Blue)
Secondary:      #266d00  (Green)
Tertiary:       #7d5400  (Orange)
Error:          #c5192d  (Red)

Surface:        #fffbfe
On-Surface:     #1c1b1f
On-Surface-Var: #49454e
```

### Component Variants

**Button:**
- Variants: primary | secondary | tertiary
- Sizes: sm | md | lg
- States: default | hover | active | disabled

**Input:**
- Types: text | email | password
- States: focus (primary border) | error (red border)
- Features: Icon slot, validation feedback

**Card:**
- Variants: KPI (accent bar) | default
- Accent colors: primary | secondary

---

## 📊 Data Structure

### User
```javascript
{
  id: 'user-001',
  name: 'Display Name',
  email: 'email@kinder.edu',
  role: 'admin|principal|teacher|parent|finance',
  avatar: 'image-url'
}
```

### Student
```javascript
{
  id: 'HS001',
  name: 'Student Name',
  dob: '2020-05-15',
  age: 4,
  class: 'Lớp Mầm A',
  className: 'mam-a',
  health: {
    weight: 16.5,
    height: 105,
    allergies: ['Sữa bò'],
    vaccinated: true
  },
  attendance: {
    present: 18,
    absent: 2,
    rate: 90
  }
}
```

### Teacher
```javascript
{
  id: 'GV001',
  name: 'Teacher Name',
  email: 'email@kinder.edu',
  class: 'Lớp Mầm A',
  experience: 8,
  qualification: 'Cấp 3 Giáo dục Mầm non',
  status: 'Đang dạy'
}
```

### Class
```javascript
{
  id: 'LOP001',
  name: 'Lớp Mầm A',
  capacity: 30,
  students: 25,
  teachers: ['GV001', 'GV003'],
  room: 'Phòng 101',
  ageGroup: '3-4 tuổi'
}
```

---

## 🚀 Adding New Features

### Add New Page

1. **Create page component** in `src/pages/[Role]/NewPage.jsx`
```jsx
export default function NewPage() {
  return <div>...</div>
}
```

2. **Add route** in `src/routes/AppRouter.jsx`
```jsx
<Route
  path="/new-page"
  element={
    <ProtectedRoute
      element={<MainLayoutRole><NewPage /></MainLayoutRole>}
      requiredRoles={['admin']}
    />
  }
/>
```

3. **Add menu item** in `src/data/dummyData.js`
```javascript
export const menuByRole = {
  admin: [
    // ...existing items...
    { id: 'new', label: 'New Feature', icon: 'star', path: '/new-page' }
  ]
}
```

### Add New Role

1. **Add user data** in `src/context/AuthContext.jsx`
```javascript
usersByRole = {
  // ...existing roles...
  newrole: {
    id: 'newrole-001',
    name: 'New Role User',
    email: 'newrole@kinder.edu',
    role: 'newrole'
  }
}
```

2. **Add menu** in `src/data/dummyData.js`
```javascript
menuByRole = {
  // ...existing roles...
  newrole: [
    { id: 'dashboard', label: 'Dashboard', icon: 'home', path: '/' },
    // ... menu items for new role
  ]
}
```

3. **Add button** in `src/pages/LoginPageRole.jsx`
```jsx
{
  id: 'newrole',
  label: 'New Role',
  icon: 'star',
  description: 'New role description',
  color: 'from-purple-500 to-purple-600'
}
```

---

## 🔗 Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | 18.2.0 | UI framework |
| react-router-dom | 6.20.0 | Client routing |
| tailwindcss | 3.3.0 | Styling |
| vite | 5.0.0 | Build tool |

---

## 📈 Performance Tips

1. **Lazy Load Routes** - Use React.lazy for heavy pages
2. **Memoize Components** - Use React.memo for reusable UI
3. **Code Split** - Separate pages into chunks
4. **Optimize Images** - Use WebP for avatars
5. **Cache Data** - Cache dummyData in localStorage (future)

---

## 🧪 Testing Each Role

### Test Checklist

- [ ] **Admin** - Can access all pages & data
- [ ] **Principal** - Can't access Finance page
- [ ] **Teacher** - Can only see their class students
- [ ] **Parent** - Can only see their child's info
- [ ] **Finance** - Can only see finance pages
- [ ] **Logout** - All roles can logout & return to login
- [ ] **Protected Routes** - Can't access role-specific URLs directly
- [ ] **Navigation** - Sidebar menu changes per role
- [ ] **Data Filtering** - Each role sees only relevant data
- [ ] **Responsive** - Works on mobile/tablet/desktop

---

## 🎓 Learning Path

1. **Understand Auth** → Read `src/context/AuthContext.jsx`
2. **Learn Routing** → Check `src/routes/AppRouter.jsx`
3. **See Components** → Browse `src/components/`
4. **Study Pages** → Look at `src/pages/Admin/AdminDashboard.jsx`
5. **Explore Data** → Check `src/data/dummyData.js`
6. **Modify UI** → Edit `src/components/Common/*.jsx`
7. **Add Features** → Create new pages & routes

---

## 📞 Troubleshooting

| Problem | Solution |
|---------|----------|
| Won't install | `npm cache clean --force && npm install` |
| Port in use | `npm run dev -- --port 3000` |
| Styles missing | Restart dev server |
| Hot reload not working | Refresh browser page |
| Can't select role | Check console for errors (F12) |
| Pages not showing | Check `ProtectedRoute` guard |

---

## ✅ Verification Checklist

- [ ] All 5 roles can login
- [ ] Each role sees different dashboard
- [ ] Sidebar menu changes per role
- [ ] Can navigate between pages
- [ ] Can logout and return to login
- [ ] Pages load without errors
- [ ] Data displays correctly
- [ ] Responsive on mobile
- [ ] No console errors (F12)
- [ ] All buttons/links work

---

**Congratulations!** 🎉

Your multi-role kindergarten management system is ready to use!

For detailed documentation, see:
- `ARCHITECTURE.md` - Full architecture guide
- `STRUCTURE.md` - File tree & organization
- `SETUP_GUIDE.md` - Installation & setup

---

**Version:** 1.0.0 Multi-Role RBAC  
**Updated:** March 15, 2024
