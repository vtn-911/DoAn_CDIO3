/**
 * Dummy data for the kindergarten management system
 * All hardcoded JSON - no database queries
 */

// ============================================================================
// STUDENTS DATA
// ============================================================================
export const studentsData = [
  {
    id: 'HS001',
    name: 'Nguyễn Hoàng Minh Khoa',
    dob: '2020-05-15',
    age: 4,
    class: 'Lớp Mầm A',
    className: 'mam-a',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Student1',
    parentName: 'Nguyễn Văn Tuấn',
    parentPhone: '0912345678',
    parentEmail: 'parent1@example.com',
    health: {
      weight: 16.5,
      height: 105,
      bloodType: 'O+',
      allergies: ['Sữa bò'],
      lastCheckup: '2024-03-10',
      vaccinated: true
    },
    attendance: {
      present: 18,
      absent: 2,
      rate: 90
    },
    address: 'Quận 1, TP.HCM'
  },
  {
    id: 'HS002',
    name: 'Trần Hà My',
    dob: '2020-08-22',
    age: 3,
    class: 'Lớp Mầm A',
    className: 'mam-a',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Student2',
    parentName: 'Trần Thị Hương',
    parentPhone: '0912345679',
    parentEmail: 'parent2@example.com',
    health: {
      weight: 15.2,
      height: 102,
      bloodType: 'A+',
      allergies: [],
      lastCheckup: '2024-03-05',
      vaccinated: true
    },
    attendance: {
      present: 20,
      absent: 0,
      rate: 100
    },
    address: 'Quận 2, TP.HCM'
  },
  {
    id: 'HS003',
    name: 'Lê Bảo Châu',
    dob: '2020-11-08',
    age: 3,
    class: 'Lớp Mầm B',
    className: 'mam-b',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Student3',
    parentName: 'Lê Minh Hải',
    parentPhone: '0912345680',
    parentEmail: 'parent3@example.com',
    health: {
      weight: 14.8,
      height: 100,
      bloodType: 'B+',
      allergies: ['Trứng'],
      lastCheckup: '2024-03-08',
      vaccinated: false
    },
    attendance: {
      present: 19,
      absent: 1,
      rate: 95
    },
    address: 'Quận 3, TP.HCM'
  }
]

// ============================================================================
// TEACHERS DATA
// ============================================================================
export const teachersData = [
  {
    id: 'GV001',
    name: 'Cô Ngọc Anh',
    email: 'ngocAnh@kinder.edu',
    phone: '0901234567',
    class: 'Lớp Mầm A',
    className: 'mam-a',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher1',
    experience: 8,
    qualification: 'Cấp 3 Giáo dục Mầm non',
    status: 'Đang dạy',
    startDate: '2016-09-01'
  },
  {
    id: 'GV002',
    name: 'Cô Hương Giang',
    email: 'huongGiang@kinder.edu',
    phone: '0901234568',
    class: 'Lớp Mầm B',
    className: 'mam-b',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher2',
    experience: 5,
    qualification: 'Cấp 3 Giáo dục Mầm non',
    status: 'Đang dạy',
    startDate: '2019-09-01'
  },
  {
    id: 'GV003',
    name: 'Cô Lệ Hằng',
    email: 'leHang@kinder.edu',
    phone: '0901234569',
    class: 'Lớp Mầm A',
    className: 'mam-a',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher3',
    experience: 3,
    qualification: 'Cấp 3 Giáo dục Mầm non',
    status: 'Đang dạy',
    startDate: '2021-09-01'
  }
]

// ============================================================================
// CLASSES DATA
// ============================================================================
export const classesData = [
  {
    id: 'LOP001',
    name: 'Lớp Mầm A',
    className: 'mam-a',
    capacity: 30,
    students: 25,
    teachers: ['GV001', 'GV003'],
    room: 'Phòng 101',
    ageGroup: '3-4 tuổi',
    schedule: 'Sáng 7h00 - Chiều 11h00',
    description: 'Lớp mầm cho trẻ từ 3-4 tuổi'
  },
  {
    id: 'LOP002',
    name: 'Lớp Mầm B',
    className: 'mam-b',
    capacity: 25,
    students: 22,
    teachers: ['GV002'],
    room: 'Phòng 102',
    ageGroup: '2-3 tuổi',
    schedule: 'Sáng 8h00 - Chiều 12h00',
    description: 'Lớp mầm cho trẻ từ 2-3 tuổi'
  }
]

// ============================================================================
// ACTIVITIES DATA
// ============================================================================
export const activitiesData = [
  {
    id: 'ACT001',
    title: 'Hoạt động hàng ngày',
    date: '2024-03-15',
    time: '09:00',
    image: 'https://images.unsplash.com/photo-1503454537688-e0fa066ffd20?w=400&h=300&fit=crop',
    description: 'Trẻ em chơi đùa tại sân cỏ',
    photos: [
      'https://images.unsplash.com/photo-1503454537688-e0fa066ffd20?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
    ]
  },
  {
    id: 'ACT002',
    title: 'Hoạt động ngoài trời',
    date: '2024-03-14',
    time: '10:30',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    description: 'Đi tham quan công viên',
    photos: []
  }
]

// ============================================================================
// FINANCE DATA
// ============================================================================
export const financeData = {
  revenue: 125500000,
  expenses: 87300000,
  balance: 38200000,
  tuitionRate: 500000,
  transactions: [
    {
      id: 'TXN001',
      type: 'income',
      description: 'Tiền học phí - Tháng 3/2024',
      amount: 12500000,
      date: '2024-03-01',
      status: 'Completed'
    },
    {
      id: 'TXN002',
      type: 'expense',
      description: 'Lương giáo viên',
      amount: 28500000,
      date: '2024-03-05',
      status: 'Completed'
    },
    {
      id: 'TXN003',
      type: 'expense',
      description: 'Chi phí vật tư',
      amount: 8500000,
      date: '2024-03-10',
      status: 'Completed'
    }
  ],
  studentFees: [
    {
      id: 'SF001',
      studentId: 'HS001',
      studentName: 'Nguyễn Hoàng Minh Khoa',
      month: '03/2024',
      amount: 500000,
      status: 'Paid',
      paidDate: '2024-03-01'
    },
    {
      id: 'SF002',
      studentId: 'HS002',
      studentName: 'Trần Hà My',
      month: '03/2024',
      amount: 500000,
      status: 'Paid',
      paidDate: '2024-03-02'
    }
  ]
}

// ============================================================================
// NOTIFICATIONS DATA
// ============================================================================
export const notificationsData = [
  {
    id: 'NOTIF001',
    type: 'info',
    title: 'Thông báo từ nhà trường',
    message: 'Ngày 20/3 là ngày nghỉ lễ',
    date: '2024-03-15',
    read: false,
    for: ['all']
  },
  {
    id: 'NOTIF002',
    type: 'warning',
    title: 'Cảnh báo sức khỏe',
    message: 'Con em chưa tiêm vaccine cơ bản',
    date: '2024-03-14',
    read: false,
    for: ['parent']
  },
  {
    id: 'NOTIF003',
    type: 'success',
    title: 'Hoạt động thành công',
    message: 'Ngày hôm nay các em đã có buổi học rất vui vẻ',
    date: '2024-03-13',
    read: true,
    for: ['parent', 'teacher']
  }
]

// ============================================================================
// MENU ITEMS BY ROLE
// ============================================================================
export const menuByRole = {
  admin: [
    { id: 'dashboard', label: 'Dashboard', icon: 'home', path: '/admin' },
    { id: 'students', label: 'Quản lý Học sinh', icon: 'school', path: '/students' },
    { id: 'teachers', label: 'Quản lý Giáo viên', icon: 'group', path: '/teachers' },
    { id: 'classes', label: 'Quản lý Lớp học', icon: 'class', path: '/classes' },
    { id: 'health', label: 'Sức khỏe', icon: 'favorite', path: '/health' },
    { id: 'cameras', label: 'Camera', icon: 'videocam', path: '/cameras' },
    { id: 'activities', label: 'Hoạt động', icon: 'sports_soccer', path: '/activities' },
    { id: 'notifications', label: 'Thông báo', icon: 'notifications', path: '/notifications' },
    { id: 'finance', label: 'Thu chi', icon: 'payments', path: '/finance' },
    { id: 'reports', label: 'Báo cáo', icon: 'assessment', path: '/reports' }
  ],
  principal: [
    { id: 'dashboard', label: 'Dashboard', icon: 'home', path: '/principal' },
    { id: 'students', label: 'Quản lý Học sinh', icon: 'school', path: '/students' },
    { id: 'teachers', label: 'Quản lý Giáo viên', icon: 'group', path: '/teachers' },
    { id: 'classes', label: 'Quản lý Lớp học', icon: 'class', path: '/classes' },
    { id: 'health', label: 'Sức khỏe', icon: 'favorite', path: '/health' },
    { id: 'cameras', label: 'Camera', icon: 'videocam', path: '/cameras' },
    { id: 'activities', label: 'Hoạt động', icon: 'sports_soccer', path: '/activities' },
    { id: 'notifications', label: 'Thông báo', icon: 'notifications', path: '/notifications' },
    { id: 'reports', label: 'Báo cáo', icon: 'assessment', path: '/reports' }
  ],
  teacher: [
    { id: 'dashboard', label: 'Dashboard', icon: 'home', path: '/teacher' },
    { id: 'class-students', label: 'Học sinh lớp', icon: 'school', path: '/class-students' },
    { id: 'classes', label: 'Quản lý Lớp học', icon: 'class', path: '/classes' },
    { id: 'health', label: 'Sức khỏe', icon: 'favorite', path: '/health' },
    { id: 'activities', label: 'Hoạt động', icon: 'sports_soccer', path: '/activities' },
    { id: 'notifications', label: 'Thông báo', icon: 'notifications', path: '/notifications' }
  ],
  parent: [
    { id: 'dashboard', label: 'Dashboard', icon: 'home', path: '/parent' },
    { id: 'child-info', label: 'Thông tin con em', icon: 'person', path: '/child-info' },
    { id: 'health', label: 'Sức khỏe', icon: 'favorite', path: '/health' },
    { id: 'activities', label: 'Hoạt động', icon: 'sports_soccer', path: '/activities' },
    { id: 'cameras', label: 'Camera', icon: 'videocam', path: '/cameras' },
    { id: 'notifications', label: 'Thông báo', icon: 'notifications', path: '/notifications' }
  ],
  finance: [
    { id: 'dashboard', label: 'Dashboard', icon: 'home', path: '/finance-dashboard' },
    { id: 'finance', label: 'Thu chi', icon: 'payments', path: '/finance' },
    { id: 'student-fees', label: 'Học phí học sinh', icon: 'receipt', path: '/student-fees' },
    { id: 'reports', label: 'Báo cáo tài chính', icon: 'assessment', path: '/reports' },
    { id: 'notifications', label: 'Thông báo', icon: 'notifications', path: '/notifications' }
  ]
}
