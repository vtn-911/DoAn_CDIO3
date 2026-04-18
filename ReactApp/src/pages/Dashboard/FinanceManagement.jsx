import MainLayout from '../../components/Layout/MainLayout'
import Card from '../../components/Common/Card'
import Button from '../../components/Common/Button'

/**
 * FinanceManagement - Finance/Accounting page
 */
export default function FinanceManagement({ onLogout }) {
  return (
    <MainLayout pageTitle="Finance Management" onLogout={onLogout}>
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant mb-1 block">
              Financial Overview
            </span>
            <h2 className="text-4xl font-extrabold text-on-background tracking-tight">
              Finance Management
            </h2>
            <p className="text-on-surface-variant mt-2 text-sm max-w-lg">
              Track revenues, expenses, student fees, and financial analytics.
            </p>
          </div>
          <Button variant="primary" size="md">
            <span className="material-symbols-outlined text-lg">add_circle</span>
            New Transaction
          </Button>
        </section>

        {/* Finance KPI Cards */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card title="Total Revenue" value="₹ 45.2L" trend="↑ 8% this month" accentColor="secondary" />
          <Card title="Total Expenses" value="₹ 28.5L" trend="Payment Schedule" accentColor="primary" />
          <Card title="Outstanding" value="₹ 3.2L" trend="12 students" accentColor="primary" />
          <Card title="Surplus" value="₹ 16.7L" trend="↑ 12% YoY" accentColor="secondary" />
        </section>

        {/* Finance Stats Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-surface-container-lowest rounded-lg p-6">
            <h3 className="text-lg font-semibold text-on-surface mb-4">Monthly Revenue Trend</h3>
            <div className="h-64 bg-surface-container-low rounded flex items-center justify-center text-on-surface-variant">
              <div className="text-center">
                <span className="material-symbols-outlined text-4xl block mb-2">
                  trending_up
                </span>
                <p>Revenue chart would be displayed here</p>
              </div>
            </div>
          </div>

          {/* Payment Status */}
          <div className="bg-surface-container-lowest rounded-lg p-6">
            <h3 className="text-lg font-semibold text-on-surface mb-4">Payment Status</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-on-surface-variant">Paid</span>
                  <span className="font-semibold text-secondary">94%</span>
                </div>
                <div className="h-2 bg-surface-container-low rounded-full overflow-hidden">
                  <div className="h-full w-11/12 bg-secondary" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-on-surface-variant">Pending</span>
                  <span className="font-semibold text-tertiary">4%</span>
                </div>
                <div className="h-2 bg-surface-container-low rounded-full overflow-hidden">
                  <div className="h-full w-1/12 bg-tertiary" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Transactions */}
        <section className="bg-surface-container-lowest rounded-lg overflow-hidden">
          <div className="p-6 border-b border-outline-variant">
            <h3 className="text-lg font-semibold text-on-surface">Recent Transactions</h3>
          </div>
          <div className="divide-y divide-outline-variant">
            {[
              { desc: 'Monthly Salary', type: 'Expense', amount: '₹ 8,50,000', date: 'Today' },
              { desc: 'Student Fee Deposit', type: 'Income', amount: '₹ 2,50,000', date: 'Yesterday' },
              { desc: 'Utilities Payment', type: 'Expense', amount: '₹ 75,000', date: '2 days ago' },
            ].map((trans, idx) => (
              <div key={idx} className="px-6 py-4 flex items-center justify-between hover:bg-surface-container-low transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    ${trans.type === 'Income' ? 'bg-secondary-fixed' : 'bg-error-container'}
                  `}>
                    <span className="material-symbols-outlined">
                      {trans.type === 'Income' ? 'trending_up' : 'trending_down'}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-on-surface">{trans.desc}</p>
                    <p className="text-xs text-on-surface-variant">{trans.date}</p>
                  </div>
                </div>
                <p className={`font-semibold ${trans.type === 'Income' ? 'text-secondary' : 'text-error'}`}>
                  {trans.type === 'Income' ? '+' : '-'}{trans.amount}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
