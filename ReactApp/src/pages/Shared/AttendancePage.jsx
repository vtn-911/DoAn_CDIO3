import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'

/**
 * Attendance Page - View and manage attendance records
 * For Teachers: Record attendance
 * For Parents: View child's attendance
 */
export default function AttendancePage() {
  const { role, user } = useAuth()
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [attendanceData] = useState([
    { id: 1, name: 'Nguyễn Văn A', status: 'present', date: selectedDate },
    { id: 2, name: 'Trần Thị B', status: 'absent', date: selectedDate },
    { id: 3, name: 'Lê Văn C', status: 'late', date: selectedDate },
    { id: 4, name: 'Phạm Thị D', status: 'present', date: selectedDate },
  ])

  const getStatusColor = (status) => {
    switch(status) {
      case 'present': return 'bg-green-100 text-green-800'
      case 'absent': return 'bg-red-100 text-red-800'
      case 'late': return 'bg-yellow-100 text-yellow-800'
      case 'excused': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status) => {
    switch(status) {
      case 'present': return '✅ Có mặt'
      case 'absent': return '❌ Vắng mặt'
      case 'late': return '⏰ Muộn'
      case 'excused': return '📝 Vắng phép'
      default: return status
    }
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-on-surface mb-2">
          {role === 'teacher' ? '📋 Điểm Danh' : '📋 Xem Điểm Danh'}
        </h1>
        <p className="text-on-surface-variant">
          {role === 'teacher' 
            ? 'Ghi nhận điểm danh cho lớp của bạn'
            : 'Xem bản ghi điểm danh của con em'
          }
        </p>
      </div>

      {/* Filters */}
      <div className="bg-surface-container-lowest rounded-lg p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-on-surface mb-2">Ngày</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full border border-outline rounded-lg px-4 py-2"
            />
          </div>

          {role === 'teacher' && (
            <>
              <div>
                <label className="block text-sm font-medium text-on-surface mb-2">Lớp</label>
                <select className="w-full border border-outline rounded-lg px-4 py-2">
                  <option>Lớp Mầm (A)</option>
                  <option>Lớp Mầm (B)</option>
                  <option>Lớp Chồi (A)</option>
                </select>
              </div>
              <div className="flex items-end">
                <button className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition">
                  <span className="material-symbols-outlined mr-2">check_circle</span>
                  Lưu Điểm Danh
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-surface-container-lowest rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-surface-container">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-on-surface">Tên</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-on-surface">Trạng Thái</th>
              {role === 'teacher' && <th className="px-6 py-4 text-left text-sm font-semibold text-on-surface">Ghi Chú</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {attendanceData.map((record) => (
              <tr key={record.id} className="hover:bg-surface-container-low transition">
                <td className="px-6 py-4 text-sm text-on-surface font-medium">{record.name}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(record.status)}`}>
                    {getStatusLabel(record.status)}
                  </span>
                </td>
                {role === 'teacher' && (
                  <td className="px-6 py-4 text-sm">
                    <input
                      type="text"
                      placeholder="Thêm ghi chú..."
                      className="w-full border border-outline rounded px-2 py-1"
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">24</div>
          <div className="text-sm text-on-surface-variant mt-1">✅ Có Mặt</div>
        </div>
        <div className="bg-surface-container-lowest rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-600">2</div>
          <div className="text-sm text-on-surface-variant mt-1">❌ Vắng Mặt</div>
        </div>
        <div className="bg-surface-container-lowest rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">1</div>
          <div className="text-sm text-on-surface-variant mt-1">⏰ Muộn</div>
        </div>
        <div className="bg-surface-container-lowest rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">2</div>
          <div className="text-sm text-on-surface-variant mt-1">📝 Vắng Phép</div>
        </div>
      </div>
    </div>
  )
}
