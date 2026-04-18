import { useState } from 'react'
import { studentsData } from '../../data/dummyData'
import Card from '../../components/Common/Card'
import Button from '../../components/Common/Button'
import InputField from '../../components/Common/InputField'

/**
 * StudentManagement - Manage all students in the system
 * Admin can view, add, edit student information
 */
export default function StudentManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [students, setStudents] = useState(studentsData)

  // Filter students by search term
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.includes(searchTerm)
  )

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant mb-1 block">
            Quản lý nhân sự
          </span>
          <h2 className="text-4xl font-extrabold text-on-background tracking-tight">
            Quản Lý Học Sinh
          </h2>
          <p className="text-on-surface-variant mt-2 text-sm max-w-lg">
            Quản lý thông tin, sức khỏe, và điểm danh của tất cả học sinh
          </p>
        </div>
        <Button variant="primary" size="md">
          <span className="material-symbols-outlined text-lg">add_circle</span>
          Thêm Học Sinh
        </Button>
      </section>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card title="Tổng Học Sinh" value={students.length.toString()} accentColor="primary" />
        <Card title="Có Mặt Hôm Nay" value="42" accentColor="secondary" />
        <Card title="Vắng Mặt" value="3" accentColor="primary" />
        <Card title="Tỷ Lệ Có Mặt" value="93%" accentColor="secondary" />
      </section>

      {/* Search and Filter */}
      <section className="bg-surface-container-lowest rounded-lg p-6">
        <div className="flex gap-4">
          <InputField
            type="text"
            placeholder="Tìm kiếm theo tên hoặc ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<span className="material-symbols-outlined">search</span>}
            className="flex-1"
          />
          <Button variant="secondary" size="md">
            <span className="material-symbols-outlined">filter_list</span>
            Lọc
          </Button>
        </div>
      </section>

      {/* Students Table */}
      <section className="bg-surface-container-lowest rounded-lg overflow-hidden">
        <div className="p-6 border-b border-outline-variant">
          <h3 className="text-lg font-semibold text-on-surface">
            Danh sách học sinh ({filteredStudents.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-container-low">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Tên Học Sinh
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Lớp
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Tuổi
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Phụ Huynh
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Hành Động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {filteredStudents.map((student, idx) => (
                <tr key={idx} className="hover:bg-surface-container-low transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={student.photo}
                        alt={student.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm font-medium text-on-surface">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">{student.id}</td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">{student.class}</td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">{student.age} tuổi</td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">{student.parentName}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-surface-container-high rounded transition-colors">
                        <span className="material-symbols-outlined text-sm text-primary">
                          edit
                        </span>
                      </button>
                      <button className="p-1 hover:bg-surface-container-high rounded transition-colors">
                        <span className="material-symbols-outlined text-sm text-error">
                          delete
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
