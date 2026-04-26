import { useState } from 'react';

export default function RevenueManagement() {
  const [activeTab, setActiveTab] = useState('view');
  const [newExpense, setNewExpense] = useState({
    expenseType: 'tuition',
    amount: '',
    date: '',
    notes: ''
  });
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      type: 'tuition',
      typeName: 'Học phí',
      amount: '15,000,000',
      date: '2025-04-20',
      notes: 'Học phí tháng 4',
      status: 'paid'
    },
    {
      id: 2,
      type: 'activity',
      typeName: 'Chi phí hoạt động',
      amount: '2,500,000',
      date: '2025-04-22',
      notes: 'Chi phí hoạt động ngoài trời',
      status: 'paid'
    },
    {
      id: 3,
      type: 'uniform',
      typeName: 'Đồng phục, ăn trưa',
      amount: '1,200,000',
      date: '2025-04-23',
      notes: 'Mua đồng phục và ăn trưa',
      status: 'pending'
    },
  ]);

  const expenseTypes = [
    { value: 'tuition', label: 'Học phí' },
    { value: 'activity', label: 'Chi phí hoạt động' },
    { value: 'facility', label: 'Cơ sở vật chất' },
    { value: 'ngoai_khoa', label: 'Ngoại khóa' },
    { value: 'uniform', label: 'Đồng phục, ăn trưa' },
    { value: 'other', label: 'Khác' },
  ];

  const summaryData = {
    totalRevenue: '18,700,000',
    thisMonth: '15,000,000',
    thisYear: '120,000,000',
    pending: '1,200,000',
  };

  const handleAddExpense = () => {
    if (!newExpense.expenseType || !newExpense.amount || !newExpense.date) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }

    const newItem = {
      id: expenses.length + 1,
      type: newExpense.expenseType,
      typeName: expenseTypes.find(t => t.value === newExpense.expenseType)?.label,
      amount: newExpense.amount,
      date: newExpense.date,
      notes: newExpense.notes,
      status: 'paid'
    };

    setExpenses([newItem, ...expenses]);
    setNewExpense({
      expenseType: 'tuition',
      amount: '',
      date: '',
      notes: ''
    });
    setActiveTab('view');
    alert('Thêm chi phí thành công!');
  };

  const handleDeleteExpense = (id) => {
    if (confirm('Bạn chắc chắn muốn xóa chi phí này?')) {
      setExpenses(expenses.filter(e => e.id !== id));
      alert('Xóa chi phí thành công!');
    }
  };

  const handleEditExpense = (id) => {
    alert('Chức năng chỉnh sửa sẽ được triển khai sớm');
  };

  const handleExportReport = (format) => {
    alert(`Xuất báo cáo thu chi sang ${format.toUpperCase()} thành công!`);
  };

  const renderViewExpenses = () => {
    return (
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Tổng Thu', value: summaryData.totalRevenue, icon: 'trending_up', color: 'green' },
            { label: 'Tháng Này', value: summaryData.thisMonth, icon: 'calendar_today', color: 'blue' },
            { label: 'Năm Nay', value: summaryData.thisYear, icon: 'date_range', color: 'purple' },
            { label: 'Chờ Xử Lý', value: summaryData.pending, icon: 'schedule', color: 'yellow' },
          ].map((item, idx) => (
            <div key={idx} className={`bg-${item.color}-50 border border-${item.color}-200 rounded-lg p-4 shadow-sm`}>
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 bg-${item.color}-100 rounded-lg flex items-center justify-center`}>
                  <span className={`material-symbols-outlined text-${item.color}-600`}>{item.icon}</span>
                </div>
                <div>
                  <p className="text-xs text-slate-600 uppercase tracking-wide">{item.label}</p>
                  <p className={`text-lg font-bold text-${item.color}-900 mt-1`}>{item.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Expenses List */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900">Danh Sách Chi Phí</h3>
              <p className="text-sm text-slate-600 mt-1">Các khoản chi phí đã ghi nhận gần đây</p>
            </div>
            <button
              onClick={() => setActiveTab('add')}
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">add</span>
              Thêm Chi Phí
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Loại Chi Phí</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-slate-700">Số Tiền</th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-slate-700">Ngày</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Ghi Chú</th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-slate-700">Trạng Thái</th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-slate-700">Hành Động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {expenses.map(expense => (
                  <tr key={expense.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm font-medium text-slate-900">{expense.typeName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-semibold text-slate-900">{expense.amount} đ</span>
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-slate-600">{expense.date}</td>
                    <td className="px-6 py-4 text-left text-slate-600">{expense.notes}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        expense.status === 'paid'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {expense.status === 'paid' ? 'Đã Thanh Toán' : 'Chờ Xử Lý'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEditExpense(expense.id)}
                          className="p-1 hover:bg-blue-100 text-blue-600 rounded transition-colors"
                          title="Chỉnh sửa"
                        >
                          <span className="material-symbols-outlined text-base">edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteExpense(expense.id)}
                          className="p-1 hover:bg-red-100 text-red-600 rounded transition-colors"
                          title="Xóa"
                        >
                          <span className="material-symbols-outlined text-base">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Export Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined">file_download</span>
            Xuất Báo Cáo
          </h3>
          <div className="flex gap-4">
            <button
              onClick={() => handleExportReport('pdf')}
              className="flex-1 px-4 py-3 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">picture_as_pdf</span>
              Xuất PDF
            </button>
            <button
              onClick={() => handleExportReport('excel')}
              className="flex-1 px-4 py-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">table_chart</span>
              Xuất Excel
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderAddExpense = () => {
    return (
      <div className="max-w-2xl">
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined">add_circle</span>
            Ghi Nhận Chi Phí Mới
          </h3>

          <div className="space-y-5">
            {/* Expense Type */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Loại Chi Phí <span className="text-red-500">*</span>
              </label>
              <select
                value={newExpense.expenseType}
                onChange={(e) => setNewExpense({ ...newExpense, expenseType: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {expenseTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Số Tiền <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                  placeholder="Nhập số tiền (VNĐ)"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <span className="absolute right-4 top-2.5 text-slate-500 text-sm">VNĐ</span>
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Ngày <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={newExpense.date}
                onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Ghi Chú
              </label>
              <textarea
                value={newExpense.notes}
                onChange={(e) => setNewExpense({ ...newExpense, notes: e.target.value })}
                placeholder="Thêm ghi chú (tùy chọn)"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-vertical"
                rows="4"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end pt-4 border-t border-slate-200">
              <button
                onClick={() => setActiveTab('view')}
                className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleAddExpense}
                className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined">check</span>
                Lưu Chi Phí
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Quản Lý Thu Chi</h1>
        <p className="text-slate-600 text-sm mt-1">Ghi nhận, theo dõi và cập nhật các khoản chi phí của trường</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab('view')}
            className={`px-6 py-3 font-medium text-sm transition-colors flex items-center gap-2 border-b-2 -mb-px ${
              activeTab === 'view'
                ? 'text-primary border-primary'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-base">receipt</span>
            Xem Chi Phí
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`px-6 py-3 font-medium text-sm transition-colors flex items-center gap-2 border-b-2 -mb-px ${
              activeTab === 'add'
                ? 'text-primary border-primary'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-base">add_circle</span>
            Thêm Chi Phí
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'view' ? renderViewExpenses() : renderAddExpense()}
    </div>
  );
}
