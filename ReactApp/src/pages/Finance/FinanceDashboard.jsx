import { financeData } from '../../data/dummyData'
import Card from '../../components/Common/Card'
import Button from '../../components/Common/Button'

/**
 * FinanceDashboard - Dashboard for finance team
 */
export default function FinanceDashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-extrabold text-on-background tracking-tight">
            Quản Lý Tài Chính
          </h2>
          <p className="text-on-surface-variant mt-2 text-sm max-w-lg">
            Theo dõi doanh thu, chi phí, và học phí
          </p>
        </div>
        <Button variant="primary" size="md">
          <span className="material-symbols-outlined text-lg">add</span>
          Thêm Giao Dịch
        </Button>
      </section>

      {/* Financial KPI Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
          <p className="text-sm uppercase tracking-widest opacity-80">Doanh Thu</p>
          <p className="text-4xl font-bold mt-2">
            ₫{(financeData.revenue / 1000000).toFixed(1)}M
          </p>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-6 text-white">
          <p className="text-sm uppercase tracking-widest opacity-80">Chi Phí</p>
          <p className="text-4xl font-bold mt-2">
            ₫{(financeData.expenses / 1000000).toFixed(1)}M
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <p className="text-sm uppercase tracking-widest opacity-80">Lợi Nhuận</p>
          <p className="text-4xl font-bold mt-2">
            ₫{(financeData.balance / 1000000).toFixed(1)}M
          </p>
        </div>
      </section>

      {/* Transactions */}
      <section className="bg-surface-container-lowest rounded-lg p-6">
        <h3 className="text-lg font-semibold text-on-surface mb-4">Giao Dịch Gần Đây</h3>
        <div className="space-y-2">
          {financeData.transactions.map((txn) => (
            <div key={txn.id} className="flex items-center justify-between p-3 bg-surface-container-low rounded hover:bg-surface-container-high transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  txn.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <span className={`material-symbols-outlined ${
                    txn.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {txn.type === 'income' ? 'trending_up' : 'trending_down'}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-on-surface">{txn.description}</p>
                  <p className="text-xs text-on-surface-variant">{txn.date}</p>
                </div>
              </div>
              <p className={`font-semibold ${
                txn.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}>
                {txn.type === 'income' ? '+' : '-'}₫{(txn.amount / 1000000).toFixed(1)}M
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
