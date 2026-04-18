import { notificationsData } from '../../data/dummyData'

/**
 * NotificationsPage - View notifications
 */
export default function NotificationsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <section>
        <h2 className="text-4xl font-extrabold text-on-background tracking-tight">
          Thông Báo
        </h2>
        <p className="text-on-surface-variant mt-2 text-sm max-w-lg">
          Nhận thông báo từ nhà trường
        </p>
      </section>

      <section className="bg-surface-container-lowest rounded-lg p-6">
        <h3 className="text-lg font-semibold text-on-surface mb-4">Thông Báo Gần Đây</h3>
        <div className="space-y-3">
          {notificationsData.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 rounded-lg border-l-4 ${
                notif.type === 'info' ? 'border-primary bg-primary-fixed' :
                notif.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
                'border-green-500 bg-green-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined mt-1">
                  {notif.type === 'info' ? 'info' : notif.type === 'warning' ? 'warning' : 'check_circle'}
                </span>
                <div className="flex-1">
                  <h4 className="font-semibold text-on-surface">{notif.title}</h4>
                  <p className="text-sm text-on-surface-variant mt-1">{notif.message}</p>
                  <p className="text-xs text-on-surface-variant mt-2">{notif.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
