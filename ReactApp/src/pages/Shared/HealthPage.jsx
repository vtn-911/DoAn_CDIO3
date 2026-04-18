/**
 * HealthPage - Health information management
 */
export default function HealthPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <section>
        <h2 className="text-4xl font-extrabold text-on-background tracking-tight">
          Sức Khỏe
        </h2>
        <p className="text-on-surface-variant mt-2 text-sm max-w-lg">
          Theo dõi thông tin sức khỏe và tiêm chủng của trẻ
        </p>
      </section>

      <section className="bg-surface-container-lowest rounded-lg p-6">
        <h3 className="text-lg font-semibold text-on-surface mb-4">Kiểm Tra Sức Khỏe</h3>
        <div className="text-center py-12">
          <span className="material-symbols-outlined text-6xl text-primary mb-4 block">
            health_and_safety
          </span>
          <p className="text-on-surface-variant">Tính năng sẽ sớm được cập nhật</p>
        </div>
      </section>
    </div>
  )
}
