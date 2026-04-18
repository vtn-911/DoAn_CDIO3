import { activitiesData } from '../../data/dummyData'

/**
 * ActivitiesPage - View activities and photos
 */
export default function ActivitiesPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <section>
        <h2 className="text-4xl font-extrabold text-on-background tracking-tight">
          Hoạt Động
        </h2>
        <p className="text-on-surface-variant mt-2 text-sm max-w-lg">
          Xem hoạt động hàng ngày, ảnh và video từ trường
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activitiesData.map((activity) => (
          <div key={activity.id} className="bg-surface-container-lowest rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <img
              src={activity.image}
              alt={activity.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="font-semibold text-on-surface mb-2">{activity.title}</h3>
              <p className="text-sm text-on-surface-variant mb-3">{activity.description}</p>
              <div className="flex justify-between items-center text-xs text-on-surface-variant">
                <span>{activity.date} {activity.time}</span>
                <span>{activity.photos.length} ảnh</span>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
