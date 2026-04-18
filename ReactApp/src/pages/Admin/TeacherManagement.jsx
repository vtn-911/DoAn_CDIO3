import { teachersData } from '../../data/dummyData'
import Card from '../../components/Common/Card'
import Button from '../../components/Common/Button'

/**
 * TeacherManagement - Manage all teachers
 */
export default function TeacherManagement() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-extrabold text-on-background tracking-tight">
            Quản Lý Giáo Viên
          </h2>
          <p className="text-on-surface-variant mt-2 text-sm max-w-lg">
            Quản lý hồ sơ, lịch dạy của giáo viên
          </p>
        </div>
        <Button variant="primary" size="md">
          <span className="material-symbols-outlined text-lg">add_circle</span>
          Thêm Giáo Viên
        </Button>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Tổng Giáo Viên" value={teachersData.length.toString()} accentColor="primary" />
        <Card title="Đang Dạy" value={teachersData.filter(t => t.status === 'Đang dạy').length.toString()} accentColor="secondary" />
        <Card title="Kinh Nghiệm TB" value="5.3 năm" accentColor="primary" />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachersData.map((teacher) => (
          <div key={teacher.id} className="bg-surface-container-lowest rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <img
                src={teacher.photo}
                alt={teacher.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-on-surface">{teacher.name}</h3>
                <p className="text-xs text-on-surface-variant">{teacher.email}</p>
                <div className="mt-3 space-y-1 text-sm">
                  <p><span className="text-on-surface-variant">Lớp:</span> {teacher.class}</p>
                  <p><span className="text-on-surface-variant">Kinh nghiệm:</span> {teacher.experience} năm</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
