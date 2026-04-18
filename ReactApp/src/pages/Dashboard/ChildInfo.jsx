import MainLayout from '../../components/Layout/MainLayout'
import Card from '../../components/Common/Card'

/**
 * ChildInfo - Parent view for child information
 */
export default function ChildInfo({ onLogout }) {
  return (
    <MainLayout pageTitle="Child Information" onLogout={onLogout}>
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <section>
          <div>
            <span className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant mb-1 block">
              Parent Portal
            </span>
            <h2 className="text-4xl font-extrabold text-on-background tracking-tight">
              Scholar Metric - Child Information
            </h2>
            <p className="text-on-surface-variant mt-2 text-sm max-w-lg">
              View your child's academic performance, attendance, and health tracking.
            </p>
          </div>
        </section>

        {/* Student Card */}
        <section className="bg-surface-container-lowest rounded-lg p-8 border-l-4 border-primary">
          <div className="flex items-start gap-6">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Student"
              alt="Student"
              className="w-24 h-24 rounded-lg"
            />
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-on-surface">Nguyễn Văn A</h3>
              <p className="text-on-surface-variant">Roll No: 001 | Class: 12A1</p>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-on-surface-variant">Email</p>
                  <p className="font-semibold text-on-surface">nguyenvana@school.edu</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-on-surface-variant">DOB</p>
                  <p className="font-semibold text-on-surface">15-08-2006</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-on-surface-variant">Status</p>
                  <p className="font-semibold text-secondary">Active</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Academic Performance Grid */}
        <section>
          <h3 className="text-xl font-bold text-on-surface mb-4">Academic Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card title="Current GPA" value="8.4/10" accentColor="primary" />
            <Card title="Rank" value="12/150" accentColor="secondary" />
            <Card title="Attendance" value="94%" accentColor="primary" />
            <Card title="Subjects" value="6" accentColor="secondary" />
          </div>
        </section>

        {/* Marks & Performance */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Semester Marks */}
          <div className="bg-surface-container-lowest rounded-lg p-6">
            <h3 className="text-lg font-semibold text-on-surface mb-4">Subject Wise Marks</h3>
            <div className="space-y-3">
              {[
                { subject: 'Mathematics', marks: 92, total: 100 },
                { subject: 'Physics', marks: 88, total: 100 },
                { subject: 'Chemistry', marks: 85, total: 100 },
                { subject: 'English', marks: 79, total: 100 },
                { subject: 'History', marks: 82, total: 100 },
                { subject: 'Computer Science', marks: 95, total: 100 },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-on-surface-variant">{item.subject}</span>
                    <span className="font-semibold text-on-surface">{item.marks}/{item.total}</span>
                  </div>
                  <div className="h-2 bg-surface-container-low rounded-full overflow-hidden">
                    <div
                      className="h-full bg-secondary"
                      style={{ width: `${(item.marks / item.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Health & Attendance */}
          <div className="space-y-4">
            {/* Health Status */}
            <div className="bg-surface-container-lowest rounded-lg p-6">
              <h3 className="text-lg font-semibold text-on-surface mb-4">Health Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Blood Group</span>
                  <span className="font-semibold">O+</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Height</span>
                  <span className="font-semibold">170 cm</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Weight</span>
                  <span className="font-semibold">62 kg</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Last Check-up</span>
                  <span className="font-semibold">15-03-2024</span>
                </div>
              </div>
            </div>

            {/* Attendance */}
            <div className="bg-surface-container-lowest rounded-lg p-6">
              <h3 className="text-lg font-semibold text-on-surface mb-4">Attendance This Month</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Present</span>
                  <span className="font-semibold text-secondary">18 days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Absent</span>
                  <span className="font-semibold text-error">1 day</span>
                </div>
                <div className="h-2 bg-surface-container-low rounded-full overflow-hidden mt-2">
                  <div className="h-full w-11/12 bg-secondary" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Parent Notes */}
        <section className="bg-surface-container-lowest rounded-lg p-6">
          <h3 className="text-lg font-semibold text-on-surface mb-4">Teacher's Notes</h3>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-surface-container-low rounded-lg border-l-2 border-primary">
              <p className="font-medium text-on-surface">Math Teacher - 10-03-2024</p>
              <p className="text-on-surface-variant mt-1">Excellent performance in recent exam. Shows strong conceptual understanding.</p>
            </div>
            <div className="p-3 bg-surface-container-low rounded-lg border-l-2 border-secondary">
              <p className="font-medium text-on-surface">Class Teacher - 08-03-2024</p>
              <p className="text-on-surface-variant mt-1">Participates actively in class. Good behavior and conduct. Recommended for leadership role.</p>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
