# 🎓 Academic Curator - React Application

A modern, premium school management system built with React and Tailwind CSS, featuring a login page and comprehensive admin dashboard.

## 📁 Project Structure

```
ReactApp/
├── index.html                    # HTML entry point
├── package.json                  # Project dependencies
├── vite.config.js                # Vite configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── postcss.config.js             # PostCSS configuration
│
└── src/
    ├── main.jsx                  # React entry point
    ├── index.css                 # Global styles + Tailwind
    ├── App.jsx                   # Main app with routing & authentication
    │
    ├── components/
    │   ├── Common/               # Reusable UI components
    │   │   ├── Button.jsx        # Button (3 variants: primary, secondary, tertiary)
    │   │   ├── InputField.jsx    # Input field with validation & icons
    │   │   └── Card.jsx          # Card component (KPI, data, info)
    │   │
    │   └── Layout/               # Layout components
    │       ├── MainLayout.jsx    # Main wrapper (sidebar + content)
    │       ├── SideNav.jsx       # Sidebar navigation
    │       └── TopNav.jsx        # Top header navigation
    │
    ├── pages/
    │   ├── LoginPage.jsx         # Login/Authentication page
    │   │
    │   └── Dashboard/            # Dashboard pages
    │       ├── Dashboard.jsx               # Home dashboard with KPIs
    │       ├── StudentManagement.jsx      # Student management
    │       ├── TeacherManagement.jsx      # Teacher management
    │       ├── ClassManagement.jsx        # Class management
    │       ├── FinanceManagement.jsx      # Finance/Accounting
    │       ├── Reports.jsx                # Analytics & reports
    │       ├── Notifications.jsx          # Notification management
    │       └── ChildInfo.jsx              # Parent view - Child information
    │
    ├── hooks/                    # Custom React hooks (for future use)
    └── context/                  # React Context (for future state management)
```

## 🎨 Key Features

### ✅ Components

#### **Button.jsx**
- **3 Variants**: primary (gradient), secondary (surface), tertiary (ghost)
- **3 Sizes**: sm, md, lg
- **Features**: Full width option, disabled state, hover effects

```jsx
<Button variant="primary" size="md">
  <span className="material-symbols-outlined">add_circle</span>
  Create Class
</Button>
```

#### **InputField.jsx**
- **Types**: text, email, password
- **Features**: Validation, error messages, icons, focus states
- **Styling**: Dynamic border colors based on state

```jsx
<InputField
  type="email"
  label="Email Address"
  placeholder="admin@curator.edu"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={errors.email}
  icon={<span className="material-symbols-outlined">mail</span>}
/>
```

#### **Card.jsx**
- **Variants**: KPI (with accent bar), data, info
- **Features**: Title, value, trend, accent colors
- **Responsive**: Works on all screen sizes

```jsx
<Card
  title="Total Students"
  value="1,234"
  trend="↑ 12% from last month"
  accentColor="primary"
/>
```

### 📄 Pages

1. **LoginPage** - Authentication with email/password validation
2. **Dashboard** - Overview with KPI cards and activity
3. **StudentManagement** - Student list with filters
4. **TeacherManagement** - Teacher directory
5. **ClassManagement** - Class overview and management
6. **FinanceManagement** - Revenue, expenses, transactions
7. **Reports** - Analytics and reporting
8. **Notifications** - Send and manage notifications
9. **ChildInfo** - Parent portal for child information

### 🎨 Design System: "Academic Curator"

- **Premium Editorial Style**: Clean, sophisticated interface
- **Color Palette**:
  - Primary: `#005daa` (Blue)
  - Secondary: `#266d00` (Green)
  - Tertiary: `#7d5400` (Orange)
  - Error: `#ba1a1a` (Red)
  - Surfaces: Various tones for layering

- **Typography**: Inter font family
- **Icons**: Material Symbols Outlined
- **Spacing**: 8px grid system
- **No Borders Rule**: Use color tonal shifts instead of 1px borders

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation

1. **Navigate to the ReactApp folder:**
```bash
cd ReactApp
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
npm run dev
```

4. **Open in browser:**
```
http://localhost:3000
```

### Build for Production

```bash
npm run build
```

## 🔐 Authentication

The app uses a simple in-memory authentication system for demo purposes.

### Demo Credentials
- **Email**: `admin@curator.edu`
- **Password**: `password123`

**To login:**
1. Go to `/login`
2. Click "Load Demo Account" button OR manually enter credentials
3. Click "Sign In"
4. You'll be redirected to dashboard

**Authentication Flow:**
- No real backend API calls
- Login state stored in React state
- Protected routes redirect to login if not authenticated
- Click "Logout" in sidebar to logout

## 🗂️ Component Usage Examples

### Button Component
```jsx
// Primary button
<Button variant="primary" size="md" onClick={handleClick}>
  Create
</Button>

// Secondary button
<Button variant="secondary" size="sm" fullWidth>
  Cancel
</Button>

// Tertiary button (ghost style)
<Button variant="tertiary" size="lg" disabled={isLoading}>
  Learn More
</Button>
```

### Input Field Component
```jsx
<InputField
  type="email"
  label="Email"
  placeholder="user@example.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={emailError}
  icon={<span className="material-symbols-outlined">mail</span>}
  required
/>
```

### Card Component
```jsx
// KPI Card
<Card
  title="Revenue"
  value="₹ 45.2L"
  trend="↑ 8% this month"
  accentColor="primary"
/>

// Custom Card
<Card>
  <CustomContent />
</Card>
```

### Layout Component
```jsx
<MainLayout 
  pageTitle="Dashboard"
  onLogout={handleLogout}
>
  {/* Page content */}
</MainLayout>
```

## 🎯 Routing

The app uses React Router v6 for navigation:

| Path | Component | Protected |
|------|-----------|-----------|
| `/login` | LoginPage | ❌ |
| `/` | Dashboard | ✅ |
| `/students` | StudentManagement | ✅ |
| `/teachers` | TeacherManagement | ✅ |
| `/classes` | ClassManagement | ✅ |
| `/finance` | FinanceManagement | ✅ |
| `/reports` | Reports | ✅ |
| `/notifications` | Notifications | ✅ |
| `/child-info` | ChildInfo | ✅ |

## 🎨 Tailwind CSS Customization

Custom theme tokens defined in `tailwind.config.js`:
- 40+ custom color tokens from "Academic Curator" design system
- Custom border radius: DEFAULT (0.25rem), lg, xl, full
- Custom font families: headline, body, label

## 📦 Technologies Used

- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Material Symbols** - Icon library

## ✍️ Code Quality

- **Functional Components**: All components use hooks (useState, etc.)
- **Clean Code**: Well-organized, commented, easy to read
- **Reusable**: Components are modular and reusable
- **Responsive**: Works on mobile, tablet, and desktop
- **Accessible**: Semantic HTML, ARIA labels where needed

## 🔧 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm preview
```

## 📝 Key Files Explained

### App.jsx
- Main routing logic
- Authentication state management
- Protected route handling
- Simple mock login system

### LoginPage.jsx
- Email/password input validation
- Demo account functionality
- Form error handling
- Clean, modern UI

### MainLayout.jsx
- Wrapper for all dashboard pages
- Combines SideNav + TopNav + Content
- Passes onLogout callback

### Button.jsx
- Reusable across all pages
- 3 style variants
- Flexible sizing

### InputField.jsx
- Reusable form input
- Built-in validation display
- Icon support
- Focus state styling

## 🚀 Next Steps

1. **Connect Backend API**:
   - Replace console.log with actual API calls
   - Update LoginPage with real authentication
   - Add API interceptors

2. **Add State Management**:
   - Implement Redux or Zustand
   - Store user data globally
   - Add loading states

3. **Add More Features**:
   - Real data tables with pagination
   - Charts and analytics
   - Export functionality
   - Advanced filtering

4. **Deployment**:
   - Deploy to Vercel, Netlify, or AWS
   - Set up environment variables
   - Configure CORS

## 📄 License

MIT License

## 👨‍💻 Developer Notes

- All components are Functional Components using React Hooks
- No class components used
- Tailwind CSS for all styling (no external CSS files needed)
- Material Design icons used throughout
- Console logging for demo purposes (replace with API calls)

---

**Created with ❤️ for Academic Curriculum Management**
