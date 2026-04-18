import MainLayout from '../../components/Layout/MainLayout'
import Card from '../../components/Common/Card'
import Button from '../../components/Common/Button'

/**
 * Reports - Analytics and reporting page
 */
export default function Reports({ onLogout }) {
  return (
    <MainLayout pageTitle="Reports & Statistics" onLogout={onLogout}>
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant mb-1 block">
              Analytics
            </span>
            <h2 className="text-4xl font-extrabold text-on-background tracking-tight">
              Reports & Statistics
            </h2>
            <p className="text-on-surface-variant mt-2 text-sm max-w-lg">
              Comprehensive analytics and performance reports for academic year.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" size="md">
              <span className="material-symbols-outlined text-lg">calendar_month</span>
              Date Range
            </Button>
            <Button variant="primary" size="md">
              <span className="material-symbols-outlined text-lg">download</span>
              Export PDF
            </Button>
          </div>
        </section>

        {/* KPI Cards */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card title="Reports Generated" value="156" accentColor="primary" />
          <Card title="Avg Performance" value="7.2/10" accentColor="secondary" />
          <Card title="Top Performers" value="87" accentColor="primary" />
          <Card title="Improvement Needed" value="23" accentColor="secondary" />
        </section>

        {/* Charts Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Academic Performance */}
          <div className="bg-surface-container-lowest rounded-lg p-6">
            <h3 className="text-lg font-semibold text-on-surface mb-4">Academic Performance</h3>
            <div className="h-64 bg-surface-container-low rounded flex items-center justify-center text-on-surface-variant">
              <div className="text-center">
                <span className="material-symbols-outlined text-4xl block mb-2">
                  bar_chart
                </span>
                <p>Performance chart would be displayed here</p>
              </div>
            </div>
          </div>

          {/* Attendance Overview */}
          <div className="bg-surface-container-lowest rounded-lg p-6">
            <h3 className="text-lg font-semibold text-on-surface mb-4">Attendance Overview</h3>
            <div className="h-64 bg-surface-container-low rounded flex items-center justify-center text-on-surface-variant">
              <div className="text-center">
                <span className="material-symbols-outlined text-4xl block mb-2">
                  pie_chart
                </span>
                <p>Attendance chart would be displayed here</p>
              </div>
            </div>
          </div>
        </section>

        {/* Report List */}
        <section className="bg-surface-container-lowest rounded-lg overflow-hidden">
          <div className="p-6 border-b border-outline-variant">
            <h3 className="text-lg font-semibold text-on-surface">Available Reports</h3>
          </div>
          <div className="divide-y divide-outline-variant">
            {[
              { name: 'Annual Academic Report', date: '2024-03-15', type: 'Academic' },
              { name: 'Semester Performance Analysis', date: '2024-03-10', type: 'Performance' },
              { name: 'Attendance Summary', date: '2024-03-08', type: 'Attendance' },
              { name: 'Financial Report', date: '2024-03-05', type: 'Finance' },
            ].map((report, idx) => (
              <div key={idx} className="px-6 py-4 flex items-center justify-between hover:bg-surface-container-low transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">description</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-on-surface">{report.name}</p>
                    <p className="text-xs text-on-surface-variant">{report.date} • {report.type}</p>
                  </div>
                </div>
                <Button variant="tertiary" size="sm">
                  View
                </Button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
