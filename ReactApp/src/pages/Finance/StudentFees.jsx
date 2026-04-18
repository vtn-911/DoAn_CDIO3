import { financeData } from '../../data/dummyData'

/**
 * StudentFees - Student fee management
 */
export default function StudentFees() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <section>
        <h2 className="text-4xl font-extrabold text-on-background tracking-tight">
          Học Phí Học Sinh
        </h2>
        <p className="text-on-surface-variant mt-2 text-sm max-w-lg">
          Theo dõi tình trạng đóng học phí của các em
        </p>
      </section>

      <section className="bg-surface-container-lowest rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-container-low">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Tên Học Sinh
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Tháng
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Số Tiền
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Trạng Thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Ngày Đóng
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {financeData.studentFees.map((fee) => (
                <tr key={fee.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-on-surface">{fee.studentName}</td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">{fee.month}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-on-surface">
                    ₫{(fee.amount / 1000000).toFixed(1)}M
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      fee.status === 'Paid'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {fee.status === 'Paid' ? '✓ Đã đóng' : '⏳ Chưa đóng'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">{fee.paidDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
