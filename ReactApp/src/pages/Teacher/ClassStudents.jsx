import { studentsData, classesData } from "../../data/dummyData";

/**
 * ClassStudents - View students in teacher's class
 */
export default function ClassStudents() {
  const teacherClass = classesData[0]
  const classStudents = studentsData.filter(s => s.className === teacherClass.className)

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <section>
        <h2 className="text-4xl font-extrabold text-on-background tracking-tight">
          Học Sinh Lớp {teacherClass.name}
        </h2>
        <p className="text-on-surface-variant mt-2 text-sm max-w-lg">
          Danh sách học sinh và thông tin chi tiết
        </p>
      </section>

      <section className="bg-surface-container-lowest rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-container-low">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Tên Học Sinh
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Tuổi
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Sức Khỏe
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
              {classStudents.map((student) => (
                <tr key={student.id} className="hover:bg-surface-container-low transition-colors">
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
                  <td className="px-6 py-4 text-sm text-on-surface-variant">{student.age} tuổi</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {student.health.vaccinated ? 'Khoẻ' : 'Cần kiểm tra'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">{student.parentName}</td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-primary hover:text-primary-variant font-medium">
                      Chi tiết
                    </button>
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
