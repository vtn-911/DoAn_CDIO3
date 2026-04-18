# 📂 React App Multi-Role Structure

## Directory Tree

```
src/
│
├── App.jsx                          # Main app component
├── main.jsx                         # Entry point
├── index.css                        # Global styles
│
├── components/
│   ├── Common/
│   │   ├── Button.jsx               ✓ Reusable button (3 variants)
│   │   ├── InputField.jsx           ✓ Form input component
│   │   ├── Card.jsx                 ✓ Data card component
│   │   └── ProtectedRoute.jsx       ✓ Route guards by role
│   │
│   └── Layout/
│       ├── MainLayoutRole.jsx       ✓ Main layout with role-based nav
│       ├── SideNavRole.jsx          ✓ Role-based sidebar
│       ├── TopNav.jsx               ✓ Top navigation bar
│       ├── MainLayout.jsx           (old - reference)
│       └── SideNav.jsx              (old - reference)
│
├── context/
│   └── AuthContext.jsx              ✓ Global auth & role management
│
├── hooks/
│   └── useAuth.js                   ✓ Custom auth hooks
│
├── data/
│   └── dummyData.js                 ✓ All mock data (students, teachers, finance, etc)
│
├── pages/
│   ├── LoginPageRole.jsx            ✓ 5-role selector login
│   │
│   ├── Admin/
│   │   ├── AdminDashboard.jsx       ✓ Dashboard with KPI cards
│   │   ├── StudentManagement.jsx    ✓ Student table
│   │   ├── TeacherManagement.jsx    ✓ Teacher cards
│   │   └── ClassManagement.jsx      ✓ Class info
│   │
│   ├── Teacher/
│   │   ├── TeacherDashboard.jsx     ✓ Teacher overview
│   │   └── ClassStudents.jsx        ✓ Class student list
│   │
│   ├── Parent/
│   │   ├── ParentDashboard.jsx      ✓ Parent overview
│   │   └── ChildInfo.jsx            ✓ Child information
│   │
│   ├── Finance/
│   │   ├── FinanceDashboard.jsx     ✓ Finance overview
│   │   └── StudentFees.jsx          ✓ Fee management
│   │
│   ├── Shared/
│   │   ├── HealthPage.jsx           ✓ Health tracking
│   │   ├── ActivitiesPage.jsx       ✓ Daily activities
│   │   ├── CamerasPage.jsx          ✓ Camera mock UI
│   │   └── NotificationsPage.jsx    ✓ Notifications
│   │
│   └── Dashboard/
│       └── [old pages - kept for reference]
│
├── routes/
│   └── AppRouter.jsx                ✓ Central router with role guards
│
├── utils/
│   └── [utility functions - TBD]
│
├── tailwind.config.js               ✓ Tailwind + 40+ custom colors
├── postcss.config.js                ✓ PostCSS
├── vite.config.js                   ✓ Vite config
└── package.json                     ✓ Dependencies
```

---

## 🚦 Page Access by Role

### Admin Access (10 pages)
```
Dashboard ➜ Students ➜ Teachers ➜ Classes ➜ Health ➜ Cameras ➜ Activities ➜ Notifications ➜ Finance ➜ Reports
```

### Principal Access (7 pages)
```
Dashboard ➜ Students ➜ Teachers ➜ Classes ➜ Activities ➜ Notifications ➜ Reports
```

### Teacher Access (6 pages)
```
Dashboard ➜ Class Students ➜ Health ➜ Activities ➜ Attendance ➜ Notifications
```

### Parent Access (6 pages)
```
Dashboard ➜ Child Info ➜ Health ➜ Attendance ➜ Activities ➜ Notifications
```

### Finance Access (4 pages)
```
Dashboard ➜ Finance ➜ Student Fees ➜ Reports
```

---

## ✅ Completed Files

| File | Type | Status | Purpose |
|------|------|--------|---------|
| `AuthContext.jsx` | Context | ✅ | Global auth & role state |
| `useAuth.js` | Hook | ✅ | Custom auth hook |
| `dummyData.js` | Data | ✅ | All mock data |
| `LoginPageRole.jsx` | Page | ✅ | 5-role login selector |
| `AdminDashboard.jsx` | Page | ✅ | Admin overview |
| `StudentManagement.jsx` | Page | ✅ | Manage students |
| `TeacherManagement.jsx` | Page | ✅ | Manage teachers |
| `ClassManagement.jsx` | Page | ✅ | Manage classes |
| `TeacherDashboard.jsx` | Page | ✅ | Teacher overview |
| `ClassStudents.jsx` | Page | ✅ | Class student list |
| `ParentDashboard.jsx` | Page | ✅ | Parent overview |
| `ChildInfo.jsx` | Page | ✅ | Child info |
| `FinanceDashboard.jsx` | Page | ✅ | Finance overview |
| `StudentFees.jsx` | Page | ✅ | Fee management |
| `HealthPage.jsx` | Page | ✅ | Health management |
| `ActivitiesPage.jsx` | Page | ✅ | Activities view |
| `CamerasPage.jsx` | Page | ✅ | Camera mock UI |
| `NotificationsPage.jsx` | Page | ✅ | Notifications |
| `AppRouter.jsx` | Router | ✅ | Central routing |
| `SideNavRole.jsx` | Layout | ✅ | Role-based sidebar |
| `MainLayoutRole.jsx` | Layout | ✅ | Main layout wrapper |
| `ProtectedRoute.jsx` | Component | ✅ | Route guards |

---

## 🚀 Key Features Implemented

- ✅ **Multi-Role System** (Admin, Principal, Teacher, Parent, Finance)
- ✅ **Role-Based Navigation** (SideNav shows different menu per role)
- ✅ **Protected Routes** (Role-based access control)
- ✅ **Auth Context** (Global user & role state)
- ✅ **Mock Data** (Students, teachers, classes, finance)
- ✅ **Login Screen** (5 role selector buttons)
- ✅ **Dashboard Pages** (One per role + shared pages)
- ✅ **Responsive Layouts** (Tailwind CSS grid/flex)
- ✅ **Reusable Components** (Button, Input, Card)
- ✅ **Design System** ("Academic Curator" colors)

---

## 🎯 Quick Navigation

### Start Here
1. **Login** → Go to `src/pages/LoginPageRole.jsx`
2. **Router** → Check `src/routes/AppRouter.jsx`
3. **Auth** → See `src/context/AuthContext.jsx`
4. **Data** → Browse `src/data/dummyData.js`

### For Each Role
- **Admin** → `src/pages/Admin/AdminDashboard.jsx`
- **Teacher** → `src/pages/Teacher/TeacherDashboard.jsx`
- **Parent** → `src/pages/Parent/ParentDashboard.jsx`
- **Finance** → `src/pages/Finance/FinanceDashboard.jsx`

### Components
- **Layout** → `src/components/Layout/`
- **UI** → `src/components/Common/`
- **Navigation** → `src/components/Layout/SideNavRole.jsx`

---

## 📋 File Counts

- **Pages**: 16 (1 login + 6 admin + 2 teacher + 2 parent + 2 finance + 4 shared)
- **Components**: 8 (4 common + 4 layout)
- **Contexts**: 1 (Auth)
- **Hooks**: 1 (useAuth)
- **Routes**: 1 (AppRouter)
- **Data**: 1 (dummyData)
- **Configuration**: 3 (tailwind, postcss, vite)

**Total: 31 files**

---

## 🔄 Data Flow

```
User opens app
    ↓
AppRouter renders
    ↓
AuthProvider wraps app
    ↓
Not authenticated → LoginPageRole
    ↓
User selects role (Admin/Teacher/Parent/Finance)
    ↓
AuthContext.login(role) called
    ↓
user & role state updated
    ↓
Navigate to "/" 
    ↓
ProtectedRoute checks role
    ↓
MainLayoutRole renders (sidebar + content)
    ↓
SideNavRole reads menuByRole[role]
    ↓
Shows role-specific menu items
    ↓
User clicks menu item
    ↓
Navigate to page
    ↓
Page component renders with role-specific content
```

---

## 🎨 Design System

**Colors** (from tailwind.config.js):
- Primary: `#005daa` (Blue)
- Secondary: `#266d00` (Green)
- Tertiary: `#7d5400` (Orange)
- Error: `#c5192d` (Red)

**Typography**:
- Font: Inter
- Headings: Bold/Black weights
- UI: Regular weight

**Components**:
- Button: 3 variants (primary/secondary/tertiary) × 3 sizes (sm/md/lg)
- Card: KPI variant + default variant
- Input: Text/email/password with validation
- Layout: Flex-based with Tailwind grid

---

## 🏃 To Run

```bash
# Install
npm install

# Dev server
npm run dev

# Open
http://localhost:5173

# Login with any role (no password needed)
```

---

## 📚 Documentation Files

- **ARCHITECTURE.md** - Full architecture guide
- **SETUP_GUIDE.md** - Setup instructions
- **README.md** - Project overview
- **STRUCTURE.md** - This file (directory tree)

---

**Last Updated**: March 15, 2024
**Version**: 1.0.0 - Multi-Role RBAC System Complete
