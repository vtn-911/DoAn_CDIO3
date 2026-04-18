import { studentsData } from '../../data/dummyData'

/**
 * ChildInfo - Parent view of child information
 */
export default function ChildInfo() {
  const child = studentsData[0]

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <section>
        <h2 className="text-4xl font-extrabold text-on-background tracking-tight">
          Thông Tin Con Em
        </h2>
        <p className="text-on-surface-variant mt-2 text-sm max-w-lg">
          Thông tin cá nhân, sức khỏe và điểm danh
        </p>
      </section>

      {/* Child Info Card */}
      <section className="bg-surface-container-lowest rounded-lg p-8 border-l-4 border-secondary">
        <div className="flex items-start gap-6 mb-8">
          <img
            src={child.photo}
            alt={child.name}
            className="w-32 h-32 rounded-lg"
          />
          <div>
            <h3 className="text-3xl font-bold text-on-surface">{child.name}</h3>
            <p className="text-on-surface-variant text-lg mt-1">{child.class}</p>
            <div className="grid grid-cols-3 gap-6 mt-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-on-surface-variant mb-1">ID</p>
                <p className="font-semibold text-on-surface">{child.id}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-on-surface-variant mb-1">Ngày Sinh</p>
                <p className="font-semibold text-on-surface">{child.dob}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-on-surface-variant mb-1">Tuổi</p>
                <p className="font-semibold text-on-surface">{child.age} tuổi</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Health Information */}
      <section className="bg-surface-container-lowest rounded-lg p-6">
        <h3 className="text-lg font-semibold text-on-surface mb-4">Thông Tin Sức Khỏe</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-surface-container-low p-4 rounded">
            <p className="text-xs text-on-surface-variant mb-2">Cân Nặng</p>
            <p className="text-2xl font-bold text-on-surface">{child.health.weight}</p>
            <p className="text-xs text-on-surface-variant">kg</p>
          </div>
          <div className="bg-surface-container-low p-4 rounded">
            <p className="text-xs text-on-surface-variant mb-2">Chiều Cao</p>
            <p className="text-2xl font-bold text-on-surface">{child.health.height}</p>
            <p className="text-xs text-on-surface-variant">cm</p>
          </div>
          <div className="bg-surface-container-low p-4 rounded">
            <p className="text-xs text-on-surface-variant mb-2">Nhóm Máu</p>
            <p className="text-2xl font-bold text-on-surface">{child.health.bloodType}</p>
          </div>
          <div className="bg-surface-container-low p-4 rounded">
            <p className="text-xs text-on-surface-variant mb-2">Tiêm Chủng</p>
            <p className="text-2xl font-bold text-on-surface">{child.health.vaccinated ? '✓' : '✗'}</p>
          </div>
        </div>
      </section>

      {/* Attendance */}
      <section className="bg-surface-container-lowest rounded-lg p-6">
        <h3 className="text-lg font-semibold text-on-surface mb-4">Điểm Danh</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-surface-container-low rounded">
            <p className="text-sm text-on-surface-variant mb-1">Có Mặt</p>
            <p className="text-3xl font-bold text-secondary">{child.attendance.present}</p>
            <p className="text-xs text-on-surface-variant mt-1">ngày</p>
          </div>
          <div className="text-center p-4 bg-surface-container-low rounded">
            <p className="text-sm text-on-surface-variant mb-1">Vắng Mặt</p>
            <p className="text-3xl font-bold text-error">{child.attendance.absent}</p>
            <p className="text-xs text-on-surface-variant mt-1">ngày</p>
          </div>
          <div className="text-center p-4 bg-surface-container-low rounded">
            <p className="text-sm text-on-surface-variant mb-1">Tỷ Lệ</p>
            <p className="text-3xl font-bold text-primary">{child.attendance.rate}%</p>
          </div>
        </div>
      </section>
    </div>
  )
}
