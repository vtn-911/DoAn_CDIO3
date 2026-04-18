import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'

/**
 * Reports Page - View reports and analytics
 * For Admin/Principal: General reports
 * For Finance: Financial reports
 */
export default function ReportsPage() {
  const { role } = useAuth()
  const [reportType, setReportType] = useState('summary')

  const reportOptions = role === 'finance' 
    ? [
        { id: 'summary', label: 'Tổng Hợp Thu Chi', icon: 'bar_chart' },
        { id: 'monthly', label: 'Báo Cáo Theo Tháng', icon: 'calendar_month' },
        { id: 'student-fees', label: 'Học Phí Học Sinh', icon: 'receipt' },
        { id: 'analysis', label: 'Phân Tích Chi Tiêu', icon: 'pie_chart' }
      ]
    : [
        { id: 'summary', label: 'Tổng Hợp Hệ Thống', icon: 'bar_chart' },
        { id: 'students', label: 'Báo Cáo Học Sinh', icon: 'school' },
        { id: 'teachers', label: 'Báo Cáo Giáo Viên', icon: 'group' },
        { id: 'attendance', label: 'Báo Cáo Điểm Danh', icon: 'fact_check' }
      ]

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-on-surface mb-2">
          📊 Báo Cáo {role === 'finance' ? 'Tài Chính' : 'Hệ Thống'}
        </h1>
        <p className="text-on-surface-variant">
          {role === 'finance' 
            ? 'Xem các báo cáo tài chính chi tiết'
            : 'Xem các báo cáo hoạt động hệ thống'
          }
        </p>
      </div>

      {/* Report Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => setReportType(option.id)}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              reportType === option.id
                ? 'border-primary bg-primary-fixed'
                : 'border-outline-variant hover:border-primary'
            }`}
          >
            <span className="material-symbols-outlined text-2xl mb-2 block">
              {option.icon}
            </span>
            <div className="font-semibold text-on-surface text-sm">{option.label}</div>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-surface-container-lowest rounded-lg p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-on-surface mb-2">Từ Ngày</label>
            <input type="date" className="w-full border border-outline rounded-lg px-4 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-on-surface mb-2">Đến Ngày</label>
            <input type="date" className="w-full border border-outline rounded-lg px-4 py-2" />
          </div>
          <div className="flex items-end">
            <button className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition">
              <span className="material-symbols-outlined mr-2">search</span>
              Tìm Kiếm
            </button>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Tổng Cộng', value: role === 'finance' ? '125.5M' : '1,284', icon: 'trending_up' },
            { label: 'Tăng Tuần Này', value: role === 'finance' ? '+5.2M' : '+45', icon: 'arrow_upward' },
            { label: 'Trung Bình', value: role === 'finance' ? '4.2M' : '64', icon: 'summarize' },
            { label: 'Xu Hướng', value: '↑ 12%', value2: 'tháng trước', icon: 'show_chart' },
          ].map((stat, i) => (
            <div key={i} className="bg-surface-container-lowest rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-on-surface-variant">{stat.label}</p>
                  <p className="text-2xl font-bold text-on-surface mt-1">{stat.value}</p>
                  {stat.value2 && <p className="text-xs text-on-surface-variant mt-1">{stat.value2}</p>}
                </div>
                <span className="material-symbols-outlined text-primary text-2xl">{stat.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Chart Placeholder */}
        <div className="bg-surface-container-lowest rounded-lg p-6 space-y-4">
          <h3 className="font-bold text-on-surface">Biểu Đồ Thống Kê</h3>
          <div className="h-64 bg-surface-container flex items-center justify-center rounded">
            <div className="text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-4xl mb-2 block">bar_chart</span>
              <p>Biểu đồ sẽ được hiển thị ở đây</p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-surface-container-lowest rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-surface-container">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-on-surface">Mục</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-on-surface">Giá Trị</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-on-surface">% Tổng</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-on-surface">Trạng Thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {[
                { item: 'Danh Mục 1', value: '250', percent: '25%', status: '✅' },
                { item: 'Danh Mục 2', value: '320', percent: '32%', status: '✅' },
                { item: 'Danh Mục 3', value: '180', percent: '18%', status: '⚠️' },
                { item: 'Danh Mục 4', value: '250', percent: '25%', status: '✅' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-surface-container-low transition">
                  <td className="px-6 py-4 text-sm font-medium text-on-surface">{row.item}</td>
                  <td className="px-6 py-4 text-sm text-on-surface font-semibold">{row.value}</td>
                  <td className="px-6 py-4 text-sm text-on-surface">{row.percent}</td>
                  <td className="px-6 py-4 text-sm">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Button */}
      <div className="flex gap-4">
        <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition flex items-center gap-2">
          <span className="material-symbols-outlined">download</span>
          Tải PDF
        </button>
        <button className="border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary/10 transition flex items-center gap-2">
          <span className="material-symbols-outlined">print</span>
          In
        </button>
      </div>
    </div>
  )
}
