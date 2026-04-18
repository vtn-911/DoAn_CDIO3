import MainLayout from '../../components/Layout/MainLayout'
import Card from '../../components/Common/Card'
import Button from '../../components/Common/Button'

/**
 * ClassManagement - Class management page
 */
export default function ClassManagement({ onLogout }) {
  return (
    <MainLayout pageTitle="Class Management" onLogout={onLogout}>
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant mb-1 block">
              Institutional Structure
            </span>
            <h2 className="text-4xl font-extrabold text-on-background tracking-tight">
              Class Management
            </h2>
            <p className="text-on-surface-variant mt-2 text-sm max-w-lg">
              Orchestrate and oversee academic clusters, faculty assignments, and structural scheduling.
            </p>
          </div>
          <Button variant="primary" size="md">
            <span className="material-symbols-outlined text-lg">add_circle</span>
            Create Class
          </Button>
        </section>

        {/* KPI Cards */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card title="Total Classes" value="42" accentColor="primary" />
          <Card title="Avg Students" value="29" accentColor="secondary" />
          <Card title="Departments" value="5" accentColor="primary" />
          <Card title="Class Strength" value="1,234" accentColor="secondary" />
        </section>

        {/* Classes Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: '12A1', dept: 'Science', students: 35, teacher: 'Cô Ngọc Anh' },
            { name: '12A2', dept: 'Science', students: 33, teacher: 'Thầy Minh Tuấn' },
            { name: '12B1', dept: 'Arts', students: 28, teacher: 'Cô Hương Giang' },
            { name: '12B2', dept: 'Arts', students: 30, teacher: 'Thầy Việt Hoàng' },
            { name: '11A1', dept: 'Science', students: 32, teacher: 'Cô Ngọc Anh' },
            { name: '11A2', dept: 'Science', students: 31, teacher: 'Thầy Minh Tuấn' },
          ].map((cls, idx) => (
            <div key={idx} className="bg-surface-container-lowest rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-primary">{cls.name}</h3>
                  <p className="text-xs uppercase tracking-widest text-on-surface-variant mt-1">
                    {cls.dept} Stream
                  </p>
                </div>
                <button className="p-2 hover:bg-surface-container-low rounded-lg transition-colors">
                  <span className="material-symbols-outlined text-on-surface-variant">more_vert</span>
                </button>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Students:</span>
                  <span className="font-semibold text-on-surface">{cls.students}</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Class Teacher:</span>
                  <span className="font-semibold text-on-surface">{cls.teacher}</span>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </MainLayout>
  )
}
