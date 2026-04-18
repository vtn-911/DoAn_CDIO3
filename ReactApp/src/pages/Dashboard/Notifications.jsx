import MainLayout from '../../components/Layout/MainLayout'
import Card from '../../components/Common/Card'
import Button from '../../components/Common/Button'

/**
 * Notifications - Notification management page
 */
export default function Notifications({ onLogout }) {
  return (
    <MainLayout pageTitle="Notification Management" onLogout={onLogout}>
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant mb-1 block">
              Communications
            </span>
            <h2 className="text-4xl font-extrabold text-on-background tracking-tight">
              Notification Management
            </h2>
            <p className="text-on-surface-variant mt-2 text-sm max-w-lg">
              Send and manage notifications to students, teachers, and parents.
            </p>
          </div>
          <Button variant="primary" size="md">
            <span className="material-symbols-outlined text-lg">add_circle</span>
            Send Notification
          </Button>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card title="Total Sent" value="2,345" accentColor="primary" />
          <Card title="Pending" value="12" accentColor="secondary" />
          <Card title="Scheduled" value="8" accentColor="primary" />
          <Card title="Delivery Rate" value="99.2%" accentColor="secondary" />
        </section>

        {/* Notification Templates */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[
            { title: 'Important Announcement', icon: 'announcement', color: 'primary' },
            { title: 'Event Update', icon: 'event', color: 'secondary' },
            { title: 'Holiday Notice', icon: 'calendar_today', color: 'primary' },
            { title: 'Emergency Alert', icon: 'warning', color: 'error' },
          ].map((template, idx) => (
            <div key={idx} className="bg-surface-container-lowest rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start gap-4">
                <div className={`
                  w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0
                  ${template.color === 'primary' ? 'bg-primary-fixed' : template.color === 'secondary' ? 'bg-secondary-fixed' : 'bg-error-container'}
                `}>
                  <span className={`material-symbols-outlined ${template.color === 'primary' ? 'text-primary' : template.color === 'secondary' ? 'text-secondary' : 'text-error'}`}>
                    {template.icon}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-on-surface mb-1">{template.title}</h3>
                  <p className="text-xs text-on-surface-variant mb-4">Click to customize and send</p>
                  <Button variant="tertiary" size="sm">Use Template</Button>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Recent Notifications */}
        <section className="bg-surface-container-lowest rounded-lg overflow-hidden">
          <div className="p-6 border-b border-outline-variant">
            <h3 className="text-lg font-semibold text-on-surface">Recent Notifications</h3>
          </div>
          <div className="divide-y divide-outline-variant max-h-96 overflow-y-auto">
            {[
              { title: 'School Holiday Declaration', recipient: '1,234 students', status: 'Delivered', time: '2 hours ago' },
              { title: 'Parent-Teacher Meeting', recipient: '890 parents', status: 'Delivered', time: '1 day ago' },
              { title: 'Fee Payment Reminder', recipient: '45 parents', status: 'Delivered', time: '3 days ago' },
              { title: 'Exam Schedule Update', recipient: '1,234 students', status: 'Delivered', time: '1 week ago' },
            ].map((notif, idx) => (
              <div key={idx} className="px-6 py-4 flex items-center justify-between hover:bg-surface-container-low transition-colors">
                <div>
                  <p className="text-sm font-medium text-on-surface">{notif.title}</p>
                  <p className="text-xs text-on-surface-variant mt-1">To: {notif.recipient}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 bg-secondary-fixed text-on-secondary-fixed text-xs font-semibold rounded-full mb-1">
                    {notif.status}
                  </span>
                  <p className="text-xs text-on-surface-variant">{notif.time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
