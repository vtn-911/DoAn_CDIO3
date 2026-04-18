/**
 * CamerasPage - Camera surveillance mock
 */
export default function CamerasPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <section>
        <h2 className="text-4xl font-extrabold text-on-background tracking-tight">
          Camera Giám Sát
        </h2>
        <p className="text-on-surface-variant mt-2 text-sm max-w-lg">
          Theo dõi các lớp học qua camera
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((num) => (
          <div key={num} className="bg-surface-container-lowest rounded-lg overflow-hidden">
            <div className="aspect-video bg-surface-container-low flex items-center justify-center relative">
              <span className="material-symbols-outlined text-6xl text-on-surface-variant opacity-30">
                videocam
              </span>
              <div className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded">
                LIVE
              </div>
            </div>
            <div className="p-4">
              <p className="font-semibold text-on-surface">Phòng {100 + num}</p>
              <p className="text-sm text-on-surface-variant">Lớp Mầm {num > 2 ? 'B' : 'A'}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
