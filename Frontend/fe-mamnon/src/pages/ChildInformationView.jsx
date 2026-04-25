import { useState } from 'react';

export default function ChildInformationView() {
  const [activeTab, setActiveTab] = useState('profile');
  const [selectedChild, setSelectedChild] = useState('child1');

  // Mock data
  const children = [
    { id: 'child1', name: 'Nguyễn Tuấn Anh', class: 'Lớp Lá', avatar: '👦' },
    { id: 'child2', name: 'Nguyễn Thảo Vy', class: 'Lớp Hoa', avatar: '👧' },
  ];

  const childData = {
    child1: {
      fullName: 'Nguyễn Tuấn Anh',
      dateOfBirth: '15/05/2021',
      gender: 'Nam',
      class: 'Lớp Lá',
      classTeacher: 'Cô Hương',
      enrollmentDate: '01/09/2023',
      parentInfo: 'Nguyễn Văn A',
      contact: '0123456789',
      address: '123 Đường Lê Lợi, Quận 1, TP.HCM',
    }
  };

  const selectedChildData = childData.child1;

  const tabs = [
    { id: 'profile', label: 'Thông tin cá nhân', icon: 'person' },
    { id: 'academic', label: 'Học tập', icon: 'school' },
    { id: 'attendance', label: 'Điểm danh', icon: 'calendar_today' },
    { id: 'health', label: 'Sức khỏe', icon: 'favorite' },
    { id: 'schedule', label: 'Lịch học', icon: 'schedule' },
  ];

  // Academic data
  const academicData = [
    { subject: 'Toán', score: 8.5, level: 'Giỏi' },
    { subject: 'Tiếng Việt', score: 9.0, level: 'Giỏi' },
    { subject: 'Tiếng Anh', score: 7.5, level: 'Khá' },
    { subject: 'Mỹ Thuật', score: 8.0, level: 'Giỏi' },
    { subject: 'Âm Nhạc', score: 8.5, level: 'Giỏi' },
    { subject: 'Thể Dục', score: 9.0, level: 'Giỏi' },
  ];

  // Attendance data
  const attendanceData = [
    { month: 'Tháng 1', present: 18, absent: 0, late: 1 },
    { month: 'Tháng 2', present: 19, absent: 0, late: 0 },
    { month: 'Tháng 3', present: 20, absent: 0, late: 0 },
    { month: 'Tháng 4', present: 19, absent: 1, late: 0 },
  ];

  // Health data
  const healthData = {
    height: '118 cm',
    weight: '25 kg',
    vision: '6/6',
    bloodType: 'O+',
    allergies: 'Không',
    lastCheckup: '15/04/2025',
    healthStatus: 'Bình thường'
  };

  // Schedule data
  const scheduleData = [
    { day: 'Thứ 2', time: '7:30 - 11:30', activities: ['Toán', 'Tiếng Việt', 'Bữa sáng'] },
    { day: 'Thứ 3', time: '7:30 - 11:30', activities: ['Tiếng Anh', 'Mỹ Thuật', 'Chơi ngoài'] },
    { day: 'Thứ 4', time: '7:30 - 11:30', activities: ['Âm Nhạc', 'Thể Dục', 'Bữa sáng'] },
    { day: 'Thứ 5', time: '7:30 - 11:30', activities: ['Hoạt động tổng hợp', 'Chơi ngoài'] },
    { day: 'Thứ 6', time: '7:30 - 11:30', activities: ['Toán', 'Tiếng Việt', 'Âm Nhạc'] },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-slate-200 p-6 text-center shadow-sm">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                  {children.find(c => c.id === selectedChild)?.avatar}
                </div>
                <h2 className="text-xl font-bold text-slate-900">{selectedChildData.fullName}</h2>
                <p className="text-slate-600 text-sm mt-1">{selectedChildData.class}</p>
                <p className="text-slate-500 text-xs mt-1">Cô giáo: {selectedChildData.classTeacher}</p>
              </div>
            </div>

            {/* Details */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
                <h3 className="font-semibold text-slate-900 mb-4">Thông Tin Cá Nhân</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Ngày Sinh</p>
                    <p className="text-sm font-medium text-slate-900 mt-1">{selectedChildData.dateOfBirth}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Giới Tính</p>
                    <p className="text-sm font-medium text-slate-900 mt-1">{selectedChildData.gender}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Lớp Học</p>
                    <p className="text-sm font-medium text-slate-900 mt-1">{selectedChildData.class}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Ngày Nhập Học</p>
                    <p className="text-sm font-medium text-slate-900 mt-1">{selectedChildData.enrollmentDate}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
                <h3 className="font-semibold text-slate-900 mb-4">Thông Tin Liên Hệ</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Phụ Huynh</p>
                    <p className="text-sm font-medium text-slate-900 mt-1">{selectedChildData.parentInfo}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Số Điện Thoại</p>
                    <p className="text-sm font-medium text-slate-900 mt-1">{selectedChildData.contact}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Địa Chỉ</p>
                    <p className="text-sm font-medium text-slate-900 mt-1">{selectedChildData.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'academic':
        return (
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h3 className="font-semibold text-slate-900">Kết Quả Học Tập</h3>
              <p className="text-sm text-slate-600 mt-1">Năm học 2024-2025</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Môn Học</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-slate-700">Điểm</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-slate-700">Xếp Loại</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {academicData.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm text-slate-900">{item.subject}</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                            {item.score}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.level === 'Giỏi' ? 'bg-green-100 text-green-700' :
                          item.level === 'Khá' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {item.level}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'attendance':
        return (
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h3 className="font-semibold text-slate-900">Thống Kê Điểm Danh</h3>
              <p className="text-sm text-slate-600 mt-1">Năm học 2024-2025</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Tháng</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-green-700">Có Mặt</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-red-700">Vắng</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-yellow-700">Muộn</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {attendanceData.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{item.month}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">{item.present}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-semibold">{item.absent}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold">{item.late}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'health':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-4">Thông Tin Sức Khỏe</h3>
              <div className="space-y-4">
                {[
                  { label: 'Chiều Cao', value: healthData.height },
                  { label: 'Cân Nặng', value: healthData.weight },
                  { label: 'Thị Lực', value: healthData.vision },
                  { label: 'Nhóm Máu', value: healthData.bloodType },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center pb-3 border-b border-slate-100 last:border-b-0">
                    <span className="text-slate-600 text-sm">{item.label}</span>
                    <span className="font-semibold text-slate-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-4">Tình Trạng Sức Khỏe</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">Tình Trạng</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    <p className="text-sm font-medium text-slate-900">{healthData.healthStatus}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">Dị Ứng</p>
                  <p className="text-sm font-medium text-slate-900 mt-2">{healthData.allergies}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">Lần Khám Cuối</p>
                  <p className="text-sm font-medium text-slate-900 mt-2">{healthData.lastCheckup}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'schedule':
        return (
          <div className="space-y-4">
            {scheduleData.map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900">{item.day}</h3>
                  <span className="text-sm text-slate-600">{item.time}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.activities.map((activity, aIdx) => (
                    <span key={aIdx} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                      {activity}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Xem Thông Tin Của Con</h1>
        <p className="text-slate-600 text-sm mt-1">Theo dõi tình hình học tập, sức khỏe và hoạt động của con em</p>
      </div>

      {/* Child Selector */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <span className="text-slate-600 font-medium">Chọn con:</span>
          <div className="flex gap-3">
            {children.map(child => (
              <button
                key={child.id}
                onClick={() => setSelectedChild(child.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedChild === child.id
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {child.avatar} {child.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium text-sm transition-colors flex items-center gap-2 border-b-2 -mb-px whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-primary border-primary'
                  : 'text-slate-600 border-transparent hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-base">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div>{renderContent()}</div>
    </div>
  );
}
