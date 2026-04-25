import { useState } from 'react';

export default function ReportsStatistics() {
  const [activeTab, setActiveTab] = useState('financial');
  const [selectedMonth, setSelectedMonth] = useState('04');
  const [selectedYear, setSelectedYear] = useState('2025');

  const months = Array.from({ length: 12 }, (_, i) => ({
    value: String(i + 1).padStart(2, '0'),
    label: `Tháng ${i + 1}`
  }));

  const years = ['2023', '2024', '2025'];

  // Financial Report Data
  const financialData = {
    totalRevenue: '1,450,000,000',
    totalExpense: '980,000,000',
    netIncome: '470,000,000',
    students: 450,
  };

  const revenueItems = [
    { name: 'Học phí', amount: '800,000,000', percentage: 55.2 },
    { name: 'Chi phí hoạt động', amount: '350,000,000', percentage: 24.1 },
    { name: 'Ngoại khóa', amount: '150,000,000', percentage: 10.3 },
    { name: 'Khác', amount: '150,000,000', percentage: 10.4 },
  ];

  const expenseItems = [
    { name: 'Lương nhân viên', amount: '450,000,000', percentage: 45.9 },
    { name: 'Vật tư, thiết bị', amount: '250,000,000', percentage: 25.5 },
    { name: 'Chi phí vận hành', amount: '150,000,000', percentage: 15.3 },
    { name: 'Đồng phục, ăn trưa', amount: '130,000,000', percentage: 13.3 },
  ];

  // Student Statistics
  const studentStats = [
    { month: 'Tháng 1', newStudents: 15, totalStudents: 420, growthRate: 3.7 },
    { month: 'Tháng 2', newStudents: 8, totalStudents: 428, growthRate: 1.9 },
    { month: 'Tháng 3', newStudents: 12, totalStudents: 440, growthRate: 2.8 },
    { month: 'Tháng 4', newStudents: 10, totalStudents: 450, growthRate: 2.3 },
  ];

  const classDistribution = [
    { class: 'Lớp Lá', students: 35, percentage: 7.8 },
    { class: 'Lớp Hoa', students: 38, percentage: 8.4 },
    { class: 'Lớp Sao', students: 42, percentage: 9.3 },
    { class: 'Lớp Mây', students: 40, percentage: 8.9 },
    { class: 'Lớp Nắng', students: 38, percentage: 8.4 },
    { class: 'Lớp Gió', students: 35, percentage: 7.8 },
    { class: 'Lớp Mưa', students: 36, percentage: 8.0 },
    { class: 'Lớp Cầu Vồng', students: 40, percentage: 8.9 },
    { class: 'Lớp Bản Nhạc', students: 37, percentage: 8.2 },
    { class: 'Lớp Kỹ Năng', students: 39, percentage: 8.7 },
  ];

  const handleExportPDF = () => {
    alert(`Xuất báo cáo ${activeTab === 'financial' ? 'tài chính' : 'thống kê học sinh'} sang PDF (Tháng ${selectedMonth}/${selectedYear})`);
  };

  const handleExportExcel = () => {
    alert(`Xuất báo cáo ${activeTab === 'financial' ? 'tài chính' : 'thống kê học sinh'} sang Excel (Tháng ${selectedMonth}/${selectedYear})`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Báo Cáo & Thống Kê</h1>
          <p className="text-slate-600 text-sm mt-1">Xem các báo cáo tổng hợp tài chính và biến động học sinh</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-medium transition-colors"
          >
            <span className="material-symbols-outlined text-base">picture_as_pdf</span>
            Xuất PDF
          </button>
          <button
            onClick={handleExportExcel}
            className="flex items-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg font-medium transition-colors"
          >
            <span className="material-symbols-outlined text-base">table_chart</span>
            Xuất Excel
          </button>
        </div>
      </div>

      {/* Date Selector */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm flex items-center gap-4">
        <label className="flex items-center gap-2">
          <span className="text-slate-600 font-medium">Tháng:</span>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {months.map(month => (
              <option key={month.value} value={month.value}>{month.label}</option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2">
          <span className="text-slate-600 font-medium">Năm:</span>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab('financial')}
            className={`px-6 py-3 font-medium text-sm transition-colors flex items-center gap-2 border-b-2 -mb-px ${
              activeTab === 'financial'
                ? 'text-primary border-primary'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-base">paid</span>
            Báo Cáo Tài Chính
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`px-6 py-3 font-medium text-sm transition-colors flex items-center gap-2 border-b-2 -mb-px ${
              activeTab === 'students'
                ? 'text-primary border-primary'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-base">people</span>
            Thống Kê Học Sinh
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'financial' ? (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'Tổng Thu', value: financialData.totalRevenue, icon: 'trending_up', color: 'green' },
              { label: 'Tổng Chi', value: financialData.totalExpense, icon: 'trending_down', color: 'red' },
              { label: 'Lợi Nhuận', value: financialData.netIncome, icon: 'wallet', color: 'blue' },
              { label: 'Học Sinh', value: financialData.students, icon: 'people', color: 'purple' },
            ].map((metric, idx) => (
              <div key={idx} className={`bg-${metric.color}-50 border border-${metric.color}-200 rounded-lg p-4 shadow-sm`}>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 bg-${metric.color}-100 rounded-lg flex items-center justify-center`}>
                    <span className={`material-symbols-outlined text-${metric.color}-600`}>{metric.icon}</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 uppercase tracking-wide">{metric.label}</p>
                    <p className={`text-lg font-bold text-${metric.color}-900 mt-1`}>{metric.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Revenue & Expense */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue */}
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-4">Cơ Cấu Thu Nhập</h3>
              <div className="space-y-4">
                {revenueItems.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-slate-700">{item.name}</span>
                      <span className="text-sm font-semibold text-slate-900">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          idx === 0 ? 'bg-green-500' :
                          idx === 1 ? 'bg-blue-500' :
                          idx === 2 ? 'bg-purple-500' :
                          'bg-yellow-500'
                        }`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{item.amount} đ</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Expense */}
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-4">Cơ Cấu Chi Phí</h3>
              <div className="space-y-4">
                {expenseItems.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-slate-700">{item.name}</span>
                      <span className="text-sm font-semibold text-slate-900">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          idx === 0 ? 'bg-red-500' :
                          idx === 1 ? 'bg-orange-500' :
                          idx === 2 ? 'bg-yellow-500' :
                          'bg-pink-500'
                        }`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{item.amount} đ</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Student Growth */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h3 className="font-semibold text-slate-900">Thay Đổi Số Lượng Học Sinh</h3>
              <p className="text-sm text-slate-600 mt-1">Số học sinh mới và tổng số học sinh theo tháng</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Tháng</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-slate-700">Học Sinh Mới</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-slate-700">Tổng Số</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-slate-700">Tỷ Lệ Tăng</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {studentStats.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{item.month}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">{item.newStudents}</span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-medium text-slate-900">{item.totalStudents}</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <span className="material-symbols-outlined text-green-600 text-sm">trending_up</span>
                          <span className="text-sm font-semibold text-green-600">{item.growthRate}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Class Distribution */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h3 className="font-semibold text-slate-900">Phân Bố Học Sinh Theo Lớp</h3>
              <p className="text-sm text-slate-600 mt-1">Tổng số học sinh hiện tại theo từng lớp</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Lớp Học</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-slate-700">Số Học Sinh</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-slate-700">Tỷ Lệ (%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {classDistribution.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{item.class}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">{item.students}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-20 bg-slate-200 rounded-full h-2 overflow-hidden">
                            <div
                              className="h-full bg-blue-500 rounded-full"
                              style={{ width: `${item.percentage * 10}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-semibold text-slate-900 w-8 text-right">{item.percentage}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
