import { useAuth } from '../../hooks/useAuth'
import Card from '../../components/Common/Card'
import Button from '../../components/Common/Button'

/**
 * Admin Dashboard - Overview of entire system
 * Shows KPI cards for students, teachers, classes, and finance
 */
export default function AdminDashboard() {
  const { user } = useAuth()

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Welcome Section */}
      <section>
        <span className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant mb-1 block">
          Chào mừng trở lại
        </span>
        <h2 className="text-4xl font-extrabold text-on-background tracking-tight">
          Dashboard Quản Trị
        </h2>
        <p className="text-on-surface-variant mt-2 text-sm max-w-lg">
          Xem tổng quan các thống kê quan trọng của hệ thống
        </p>
      </section>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          title="Tổng Học Sinh"
          value="45"
          trend="3 học sinh mới tháng này"
          accentColor="primary"
        />
        <Card
          title="Tổng Giáo Viên"
          value="12"
          trend="2 giáo viên mới"
          accentColor="secondary"
        />
        <Card
          title="Lớp Học"
          value="5"
          trend="Đầy đủ"
          accentColor="primary"
        />
        <Card
          title="Doanh Thu (Tháng)"
          value="₫ 22.5M"
          trend="↑ 10% so với tháng trước"
          accentColor="secondary"
        />
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Overview Chart */}
        <div className="bg-surface-container-lowest rounded-lg p-6">
          <h3 className="text-lg font-semibold text-on-surface mb-4">
            Tình Hình Điểm Danh Tháng 3
          </h3>
          <div className="h-64 bg-surface-container-low rounded flex items-center justify-center text-on-surface-variant">
            <div className="text-center">
              <span className="material-symbols-outlined text-4xl block mb-2">
                trending_up
              </span>
              <p>Biểu đồ sẽ hiển thị ở đây</p>
            </div>
          </div>
        </div>

        {/* Finance Overview */}
        <div className="bg-surface-container-lowest rounded-lg p-6">
          <h3 className="text-lg font-semibold text-on-surface mb-4">
            Tình Hình Tài Chính
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-on-surface-variant">Học phí nhận được</span>
                <span className="font-semibold">₫ 22.5M (94%)</span>
              </div>
              <div className="h-2 bg-surface-container-low rounded-full overflow-hidden">
                <div className="h-full w-11/12 bg-secondary" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-on-surface-variant">Học phí còn nợ</span>
                <span className="font-semibold">₫ 1.5M (6%)</span>
              </div>
              <div className="h-2 bg-surface-container-low rounded-full overflow-hidden">
                <div className="h-full w-1/12 bg-error" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-surface-container-lowest hover:shadow-md transition-shadow p-6 rounded-lg text-left">
          <span className="material-symbols-outlined text-3xl text-primary mb-3 block">
            person_add
          </span>
          <p className="font-semibold text-on-surface">Thêm Học Sinh</p>
          <p className="text-xs text-on-surface-variant mt-1">Đăng ký học sinh mới</p>
        </button>

        <button className="bg-surface-container-lowest hover:shadow-md transition-shadow p-6 rounded-lg text-left">
          <span className="material-symbols-outlined text-3xl text-secondary mb-3 block">
            event
          </span>
          <p className="font-semibold text-on-surface">Tạo Thông Báo</p>
          <p className="text-xs text-on-surface-variant mt-1">Gửi thông báo cho phụ huynh</p>
        </button>

        <button className="bg-surface-container-lowest hover:shadow-md transition-shadow p-6 rounded-lg text-left">
          <span className="material-symbols-outlined text-3xl text-primary mb-3 block">
            assessment
          </span>
          <p className="font-semibold text-on-surface">Xem Báo Cáo</p>
          <p className="text-xs text-on-surface-variant mt-1">Xem các báo cáo thống kê</p>
        </button>
      </section>

      {/* Recent Activity */}
      <section className="bg-surface-container-lowest rounded-lg p-6">
        <h3 className="text-lg font-semibold text-on-surface mb-4">Hoạt Động Gần Đây</h3>
        <div className="space-y-3">
          {[
            { icon: 'person_add', title: 'Thêm học sinh mới', time: '2 giờ trước' },
            { icon: 'event_note', title: 'Tạo lịch sự kiện', time: '5 giờ trước' },
            { icon: 'receipt', title: 'Cập nhật học phí', time: 'Hôm qua' }
          ].map((activity, idx) => (
            <div key={idx} className="flex items-center gap-3 py-3 border-b border-outline-variant last:border-0">
              <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-sm text-primary">{activity.icon}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-on-surface">{activity.title}</p>
                <p className="text-xs text-on-surface-variant">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
