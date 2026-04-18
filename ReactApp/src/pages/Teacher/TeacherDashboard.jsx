import { studentsData, classesData } from '../../data/dummyData'
import Card from '../../components/Common/Card'

/**
 * TeacherDashboard - Dashboard for teachers
 * Teachers can view their class and students
 */
export default function TeacherDashboard() {
  const teacherClass = classesData[0]
  const classStudents = studentsData.filter(s => s.className === teacherClass.className)

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <section>
        <h2 className="text-4xl font-extrabold text-on-background tracking-tight">
          Dashboard Giáo Viên
        </h2>
        <p className="text-on-surface-variant mt-2 text-sm max-w-lg">
          Quản lý lớp học, điểm danh, và hoạt động hàng ngày
        </p>
      </section>

      {/* Class Info */}
      <section className="bg-primary-fixed rounded-lg p-8 border-l-4 border-primary">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold text-primary mb-2">{teacherClass.name}</h3>
            <p className="text-on-surface-variant">Độ tuổi: {teacherClass.ageGroup}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-on-surface-variant">Học sinh</p>
            <p className="text-3xl font-bold text-primary">{classStudents.length}</p>
          </div>
        </div>
      </section>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Học Sinh" value={classStudents.length.toString()} accentColor="primary" />
        <Card title="Có Mặt Hôm Nay" value={Math.ceil(classStudents.length * 0.95).toString()} accentColor="secondary" />
        <Card title="Vắng Mặt" value={Math.floor(classStudents.length * 0.05).toString()} accentColor="primary" />
      </section>

      {/* Quick Actions */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-surface-container-lowest hover:shadow-md transition-shadow p-6 rounded-lg text-left">
          <span className="material-symbols-outlined text-3xl text-primary mb-3 block">
            fact_check
          </span>
          <p className="font-semibold text-on-surface">Điểm Danh</p>
          <p className="text-xs text-on-surface-variant mt-1">Điểm danh học sinh hôm nay</p>
        </button>

        <button className="bg-surface-container-lowest hover:shadow-md transition-shadow p-6 rounded-lg text-left">
          <span className="material-symbols-outlined text-3xl text-secondary mb-3 block">
            note_add
          </span>
          <p className="font-semibold text-on-surface">Ghi Chép</p>
          <p className="text-xs text-on-surface-variant mt-1">Ghi chú hoạt động lớp</p>
        </button>

        <button className="bg-surface-container-lowest hover:shadow-md transition-shadow p-6 rounded-lg text-left">
          <span className="material-symbols-outlined text-3xl text-primary mb-3 block">
            image
          </span>
          <p className="font-semibold text-on-surface">Ảnh</p>
          <p className="text-xs text-on-surface-variant mt-1">Tải ảnh hoạt động</p>
        </button>
      </section>

      {/* Students List */}
      <section className="bg-surface-container-lowest rounded-lg p-6">
        <h3 className="text-lg font-semibold text-on-surface mb-4">Học Sinh Lớp</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {classStudents.map((student) => (
            <div key={student.id} className="flex items-center gap-3 p-3 bg-surface-container-low rounded">
              <img
                src={student.photo}
                alt={student.name}
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-on-surface">{student.name}</p>
                <p className="text-xs text-on-surface-variant">{student.id}</p>
              </div>
              <span className="material-symbols-outlined text-lg text-secondary">check_circle</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
