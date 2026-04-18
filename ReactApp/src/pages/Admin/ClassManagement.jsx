import { classesData, studentsData } from '../../data/dummyData'
import Card from '../../components/Common/Card'

/**
 * ClassManagement - Manage classes
 */
export default function ClassManagement() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <section>
        <h2 className="text-4xl font-extrabold text-on-background tracking-tight">
          Quản Lý Lớp Học
        </h2>
        <p className="text-on-surface-variant mt-2 text-sm max-w-lg">
          Quản lý lớp học, phân công giáo viên
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Tổng Lớp" value={classesData.length.toString()} accentColor="primary" />
        <Card title="Tổng Học Sinh" value={studentsData.length.toString()} accentColor="secondary" />
        <Card title="Trung Bình 1 Lớp" value="22 học sinh" accentColor="primary" />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {classesData.map((classItem) => (
          <div key={classItem.id} className="bg-surface-container-lowest rounded-lg p-6">
            <h3 className="text-xl font-bold text-primary mb-4">{classItem.name}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Sức chứa:</span>
                <span className="font-semibold">{classItem.capacity} chỗ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Học sinh hiện tại:</span>
                <span className="font-semibold">{classItem.students}/{classItem.capacity}</span>
              </div>
              <div className="w-full bg-surface-container-low rounded-full h-2 overflow-hidden">
                <div
                  className="bg-secondary h-full"
                  style={{ width: `${(classItem.students / classItem.capacity) * 100}%` }}
                />
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Phòng:</span>
                <span className="font-semibold">{classItem.room}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Độ tuổi:</span>
                <span className="font-semibold">{classItem.ageGroup}</span>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
