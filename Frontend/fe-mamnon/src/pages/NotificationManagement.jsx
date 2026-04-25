import { useState } from 'react';

export default function NotificationManagement() {
  const [activeTab, setActiveTab] = useState('received');
  const [newNotification, setNewNotification] = useState({
    recipientType: 'teachers',
    notificationType: 'system',
    content: ''
  });
  const [showComposer, setShowComposer] = useState(false);
  const [expandedNotification, setExpandedNotification] = useState(null);

  // Mock notifications data
  const receivedNotifications = [
    {
      id: 1,
      sender: 'Cô Hương',
      title: 'Thông báo về hoạt động ngoại khóa',
      content: 'Lớp của con em sẽ tham gia hoạt động ngoài trời vào chiều mai. Vui lòng chuẩn bị đồ chơi và nước uống cho con.',
      timestamp: '2025-04-25 10:30',
      type: 'system',
      read: false,
    },
    {
      id: 2,
      sender: 'Ban Giám Hiệu',
      title: 'Thông báo lịch nghỉ lễ 30/4',
      content: 'Trường sẽ nghỉ từ ngày 28/4 đến hết ngày 30/4. Học sinh quay lại học từ ngày 1/5.',
      timestamp: '2025-04-24 14:15',
      type: 'system',
      read: true,
    },
    {
      id: 3,
      sender: 'Tài vụ',
      title: 'Thông báo đóng học phí',
      content: 'Vui lòng đóng học phí tháng 5 trước ngày 30/4. Học phí sẽ được thu theo lịch thông thường.',
      timestamp: '2025-04-23 09:00',
      type: 'email',
      read: true,
    },
    {
      id: 4,
      sender: 'Cô Liên',
      title: 'Kết quả kiểm tra giữa kỳ',
      content: 'Con em đã hoàn thành bài kiểm tra và đạt kết quả tốt. Chi tiết sẽ được gửi qua email.',
      timestamp: '2025-04-22 16:45',
      type: 'system',
      read: true,
    },
  ];

  const recipientOptions = [
    { value: 'teachers', label: 'Giáo viên' },
    { value: 'parents', label: 'Phụ huynh' },
    { value: 'finance', label: 'Tài vụ' },
    { value: 'all', label: 'Tất cả' },
  ];

  const notificationTypeOptions = [
    { value: 'system', label: 'Hệ thống' },
    { value: 'email', label: 'Email' },
    { value: 'sms', label: 'SMS' },
  ];

  const handleSendNotification = () => {
    if (!newNotification.content.trim()) {
      alert('Vui lòng nhập nội dung thông báo');
      return;
    }

    alert(`Gửi thông báo thành công!\n- Người nhận: ${recipientOptions.find(r => r.value === newNotification.recipientType)?.label}\n- Loại: ${notificationTypeOptions.find(t => t.value === newNotification.notificationType)?.label}`);

    setNewNotification({
      recipientType: 'teachers',
      notificationType: 'system',
      content: ''
    });
    setShowComposer(false);
  };

  const renderReceivedNotifications = () => {
    return (
      <div className="space-y-4">
        {receivedNotifications.map(notif => (
          <div
            key={notif.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
              notif.read ? 'bg-white border-slate-200' : 'bg-blue-50 border-blue-200'
            }`}
            onClick={() => setExpandedNotification(expandedNotification === notif.id ? null : notif.id)}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {!notif.read && (
                    <span className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></span>
                  )}
                  <h3 className="font-semibold text-slate-900">{notif.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    notif.type === 'system' ? 'bg-blue-100 text-blue-700' :
                    notif.type === 'email' ? 'bg-purple-100 text-purple-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {notif.type === 'system' ? 'Hệ thống' : notif.type === 'email' ? 'Email' : 'SMS'}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-2">Từ: {notif.sender}</p>
                {expandedNotification === notif.id && (
                  <p className="text-sm text-slate-700 mb-3 py-3 border-t border-slate-200 mt-3 pt-3">
                    {notif.content}
                  </p>
                )}
                <p className="text-xs text-slate-500">{notif.timestamp}</p>
              </div>
              <span className="material-symbols-outlined text-slate-400 flex-shrink-0">
                {expandedNotification === notif.id ? 'expand_less' : 'expand_more'}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderSendNotification = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined">edit</span>
            Tạo Thông Báo Mới
          </h3>

          <div className="space-y-4">
            {/* Recipient Type */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Chọn Người Nhận:
              </label>
              <div className="grid grid-cols-2 gap-3">
                {recipientOptions.map(option => (
                  <label
                    key={option.value}
                    className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <input
                      type="radio"
                      name="recipient"
                      value={option.value}
                      checked={newNotification.recipientType === option.value}
                      onChange={(e) => setNewNotification({
                        ...newNotification,
                        recipientType: e.target.value
                      })}
                      className="w-4 h-4 accent-primary"
                    />
                    <span className="text-sm font-medium text-slate-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Notification Type */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Chọn Loại Thông Báo:
              </label>
              <div className="grid grid-cols-3 gap-3">
                {notificationTypeOptions.map(option => (
                  <label
                    key={option.value}
                    className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <input
                      type="radio"
                      name="type"
                      value={option.value}
                      checked={newNotification.notificationType === option.value}
                      onChange={(e) => setNewNotification({
                        ...newNotification,
                        notificationType: e.target.value
                      })}
                      className="w-4 h-4 accent-primary"
                    />
                    <span className="text-sm font-medium text-slate-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Nội Dung Thông Báo:
              </label>
              <textarea
                value={newNotification.content}
                onChange={(e) => setNewNotification({
                  ...newNotification,
                  content: e.target.value
                })}
                placeholder="Nhập nội dung thông báo tại đây..."
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-vertical"
                rows="6"
              />
              <p className="text-xs text-slate-500 mt-2">
                Ký tự: {newNotification.content.length}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end pt-4">
              <button
                onClick={() => setShowComposer(false)}
                className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleSendNotification}
                className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined">send</span>
                Gửi Thông Báo
              </button>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="font-semibold text-blue-900 mb-4">Xem Trước</h4>
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex-shrink-0"></div>
              <div className="flex-1">
                <p className="text-xs text-slate-500 mb-1">
                  Người nhận: {recipientOptions.find(r => r.value === newNotification.recipientType)?.label}
                </p>
                <p className="text-sm text-slate-700">
                  {newNotification.content || 'Nội dung thông báo sẽ hiển thị tại đây'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Quản Lý Thông Báo</h1>
          <p className="text-slate-600 text-sm mt-1">Gửi và nhận thông báo qua Hệ thống, Email hoặc SMS</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex gap-1">
          <button
            onClick={() => { setActiveTab('received'); setShowComposer(false); }}
            className={`px-6 py-3 font-medium text-sm transition-colors flex items-center gap-2 border-b-2 -mb-px ${
              activeTab === 'received'
                ? 'text-primary border-primary'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-base">mail</span>
            Nhận Thông Báo
            <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full font-bold">3</span>
          </button>
          <button
            onClick={() => setActiveTab('send')}
            className={`px-6 py-3 font-medium text-sm transition-colors flex items-center gap-2 border-b-2 -mb-px ${
              activeTab === 'send'
                ? 'text-primary border-primary'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-base">send</span>
            Gửi Thông Báo
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'received' ? (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Thông Báo Nhận ({receivedNotifications.length})</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm hover:bg-slate-100 rounded-lg transition-colors">
                <span className="material-symbols-outlined">check_circle</span>
              </button>
              <button className="px-3 py-1 text-sm hover:bg-slate-100 rounded-lg transition-colors">
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          </div>
          {renderReceivedNotifications()}
        </div>
      ) : (
        <div>
          {!showComposer ? (
            <div className="bg-slate-50 rounded-lg border border-slate-200 border-dashed p-12 text-center">
              <span className="material-symbols-outlined text-6xl text-slate-400 inline-block mb-4">mail_outline</span>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Tạo Thông Báo Mới</h3>
              <p className="text-slate-600 text-sm mb-6">Bắt đầu soạn thông báo để gửi tới người dùng</p>
              <button
                onClick={() => setShowComposer(true)}
                className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors inline-flex items-center gap-2"
              >
                <span className="material-symbols-outlined">create</span>
                Soạn Thông Báo
              </button>
            </div>
          ) : (
            renderSendNotification()
          )}
        </div>
      )}
    </div>
  );
}
