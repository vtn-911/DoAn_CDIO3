import { studentsData } from '../../data/dummyData'
import Card from '../../components/Common/Card'

/**
 * ParentDashboard - Dashboard for parents
 * Parents can view child information
 */
export default function ParentDashboard() {
  const childStudent = studentsData[0] // Mock: first student is child

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <section>
        <h2 className="text-4xl font-extrabold text-on-background tracking-tight">
          Dashboard Phụ Huynh
        </h2>
        <p className="text-on-surface-variant mt-2 text-sm max-w-lg">
          Xem thông tin, sức khỏe và hoạt động của con em
        </p>
      </section>

      {/* Child Info Card */}
      <section className="bg-surface-container-lowest rounded-lg p-8 border-l-4 border-primary">
        <div className="flex items-start gap-6">
          <img
            src={childStudent.photo}
            alt={childStudent.name}
            className="w-24 h-24 rounded-lg"
          />
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-on-surface">{childStudent.name}</h3>
            <p className="text-on-surface-variant">{childStudent.class}</p>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-on-surface-variant">Tuổi</p>
                <p className="font-semibold text-on-surface">{childStudent.age} tuổi</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-on-surface-variant">Ngày sinh</p>
                <p className="font-semibold text-on-surface">{childStudent.dob}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-on-surface-variant">ID</p>
                <p className="font-semibold text-on-surface">{childStudent.id}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Health & Attendance */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Sức Khỏe" value="Tốt" accentColor="secondary" />
        <Card title="Điểm Danh" value={`${childStudent.attendance.rate}%`} accentColor="primary" />
      </section>

      {/* Attendance Details */}
      <section className="bg-surface-container-lowest rounded-lg p-6">
        <h3 className="text-lg font-semibold text-on-surface mb-4">Thông Tin Sức Khỏe</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-surface-container-low p-3 rounded">
            <p className="text-xs text-on-surface-variant mb-1">Cân nặng</p>
            <p className="font-semibold">{childStudent.health.weight} kg</p>
          </div>
          <div className="bg-surface-container-low p-3 rounded">
            <p className="text-xs text-on-surface-variant mb-1">Chiều cao</p>
            <p className="font-semibold">{childStudent.health.height} cm</p>
          </div>
          <div className="bg-surface-container-low p-3 rounded">
            <p className="text-xs text-on-surface-variant mb-1">Nhóm máu</p>
            <p className="font-semibold">{childStudent.health.bloodType}</p>
          </div>
          <div className="bg-surface-container-low p-3 rounded">
            <p className="text-xs text-on-surface-variant mb-1">Tiêm chủng</p>
            <p className="font-semibold">{childStudent.health.vaccinated ? 'Đầy đủ' : 'Chưa đủ'}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
