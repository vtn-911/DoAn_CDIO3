import MainLayout from '../../components/Layout/MainLayout'
import Card from '../../components/Common/Card'
import Button from '../../components/Common/Button'

/**
 * Dashboard - Home page showing KPI cards and overview
 */
export default function Dashboard({ onLogout }) {
  return (
    <MainLayout pageTitle="Dashboard" onLogout={onLogout}>
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant mb-1 block">
              Welcome Back
            </span>
            <h2 className="text-4xl font-extrabold text-on-background tracking-tight">
              Dashboard Overview
            </h2>
            <p className="text-on-surface-variant mt-2 text-sm max-w-lg">
              Get a comprehensive view of your institution's key metrics and performance indicators.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="md">
              <span className="material-symbols-outlined text-lg">filter_list</span>
              Filter
            </Button>
            <Button variant="primary" size="md">
              <span className="material-symbols-outlined text-lg">download</span>
              Export
            </Button>
          </div>
        </section>

        {/* KPI Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card
            title="Total Students"
            value="1,234"
            trend="↑ 12% from last month"
            accentColor="primary"
          />
          <Card
            title="Active Teachers"
            value="87"
            trend="↓ 2 on leave"
            accentColor="secondary"
          />
          <Card
            title="Classes"
            value="42"
            trend="Across 5 departments"
            accentColor="primary"
          />
          <Card
            title="Revenue"
            value="₹ 45.2L"
            trend="↑ 8% this month"
            accentColor="secondary"
          />
        </section>

        {/* Charts Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main chart placeholder */}
          <div className="lg:col-span-2 bg-surface-container-lowest rounded-lg p-6">
            <h3 className="text-lg font-semibold text-on-surface mb-4">Enrollment Trend</h3>
            <div className="h-64 bg-surface-container-low rounded flex items-center justify-center text-on-surface-variant">
              <div className="text-center">
                <span className="material-symbols-outlined text-4xl block mb-2">
                  trending_up
                </span>
                <p>Chart visualization would go here</p>
              </div>
            </div>
          </div>

          {/* Side stats */}
          <div className="space-y-4">
            <div className="bg-surface-container-lowest rounded-lg p-6">
              <h3 className="text-sm font-bold text-on-surface-variant mb-4 uppercase tracking-widest">
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-on-surface-variant">Attendance Rate</span>
                  <span className="text-lg font-bold text-secondary">94%</span>
                </div>
                <div className="h-1 bg-surface-container-low rounded-full overflow-hidden">
                  <div className="h-full w-11/12 bg-secondary" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="bg-surface-container-lowest rounded-lg p-6">
          <h3 className="text-lg font-semibold text-on-surface mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-outline-variant last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm text-primary">person_add</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-on-surface">New student added</p>
                    <p className="text-xs text-on-surface-variant">2 hours ago</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
