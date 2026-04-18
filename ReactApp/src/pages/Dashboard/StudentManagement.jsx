import MainLayout from '../../components/Layout/MainLayout'
import Card from '../../components/Common/Card'
import Button from '../../components/Common/Button'

/**
 * StudentManagement - Student management page
 */
export default function StudentManagement({ onLogout }) {
  return (
    <MainLayout pageTitle="Student Management" onLogout={onLogout}>
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant mb-1 block">
              Academic Information
            </span>
            <h2 className="text-4xl font-extrabold text-on-background tracking-tight">
              Student Management
            </h2>
            <p className="text-on-surface-variant mt-2 text-sm max-w-lg">
              Manage student records, enrollment, attendance, and academic performance.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="md">
              <span className="material-symbols-outlined text-lg">filter_list</span>
              Filter
            </Button>
            <Button variant="primary" size="md">
              <span className="material-symbols-outlined text-lg">add_circle</span>
              Add Student
            </Button>
          </div>
        </section>

        {/* KPI Cards */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card title="Total Students" value="1,234" accentColor="primary" />
          <Card title="New This Month" value="45" accentColor="secondary" />
          <Card title="Active" value="1,198" accentColor="primary" />
          <Card title="On Leave" value="36" accentColor="secondary" />
        </section>

        {/* Students Table */}
        <section className="bg-surface-container-lowest rounded-lg overflow-hidden">
          <div className="p-6 border-b border-outline-variant">
            <h3 className="text-lg font-semibold text-on-surface">Student List</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-container-low">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                    Roll No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                    Class
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {[
                  { name: 'Nguyễn Văn A', roll: '001', class: '12A1', email: 'nguyenvana@school.edu', status: 'Active' },
                  { name: 'Trần Thị B', roll: '002', class: '12A1', email: 'tranthib@school.edu', status: 'Active' },
                  { name: 'Phạm Văn C', roll: '003', class: '12A2', email: 'phamvanc@school.edu', status: 'On Leave' },
                  { name: 'Lê Thị D', roll: '004', class: '12A2', email: 'lethid@school.edu', status: 'Active' },
                ].map((student, idx) => (
                  <tr key={idx} className="hover:bg-surface-container-low transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-on-surface">{student.name}</td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant">{student.roll}</td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant">{student.class}</td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant">{student.email}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`
                        px-3 py-1 rounded-full text-xs font-semibold
                        ${student.status === 'Active'
                          ? 'bg-secondary-fixed text-on-secondary-fixed'
                          : 'bg-surface-container-high text-on-surface-variant'
                        }
                      `}>
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
