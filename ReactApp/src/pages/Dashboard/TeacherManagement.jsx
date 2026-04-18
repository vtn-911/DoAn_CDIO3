import MainLayout from '../../components/Layout/MainLayout'
import Card from '../../components/Common/Card'
import Button from '../../components/Common/Button'

/**
 * TeacherManagement - Teacher management page
 */
export default function TeacherManagement({ onLogout }) {
  return (
    <MainLayout pageTitle="Teacher Management" onLogout={onLogout}>
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant mb-1 block">
              Faculty Management
            </span>
            <h2 className="text-4xl font-extrabold text-on-background tracking-tight">
              Teacher Management
            </h2>
            <p className="text-on-surface-variant mt-2 text-sm max-w-lg">
              Manage teacher profiles, assignments, qualifications, and performance metrics.
            </p>
          </div>
          <Button variant="primary" size="md">
            <span className="material-symbols-outlined text-lg">add_circle</span>
            Add Teacher
          </Button>
        </section>

        {/* KPI Cards */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card title="Total Teachers" value="87" accentColor="primary" />
          <Card title="On Duty" value="82" accentColor="secondary" />
          <Card title="On Leave" value="3" accentColor="primary" />
          <Card title="New Hires" value="5" accentColor="secondary" />
        </section>

        {/* Teachers Table */}
        <section className="bg-surface-container-lowest rounded-lg overflow-hidden">
          <div className="p-6 border-b border-outline-variant">
            <h3 className="text-lg font-semibold text-on-surface">Teacher Directory</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-container-low">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                    Experience
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {[
                  { name: 'Cô Ngọc Anh', dept: 'Science', subject: 'Physics', exp: '8 years', status: 'Active' },
                  { name: 'Thầy Minh Tuấn', dept: 'Science', subject: 'Chemistry', exp: '12 years', status: 'Active' },
                  { name: 'Cô Hương Giang', dept: 'English', subject: 'English', exp: '5 years', status: 'On Leave' },
                  { name: 'Thầy Việt Hoàng', dept: 'Math', subject: 'Mathematics', exp: '15 years', status: 'Active' },
                ].map((teacher, idx) => (
                  <tr key={idx} className="hover:bg-surface-container-low transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-on-surface">{teacher.name}</td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant">{teacher.dept}</td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant">{teacher.subject}</td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant">{teacher.exp}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`
                        px-3 py-1 rounded-full text-xs font-semibold
                        ${teacher.status === 'Active'
                          ? 'bg-secondary-fixed text-on-secondary-fixed'
                          : 'bg-surface-container-high text-on-surface-variant'
                        }
                      `}>
                        {teacher.status}
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
