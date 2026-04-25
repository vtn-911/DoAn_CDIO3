import { useState } from 'react';

export default function CameraMonitoring() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [connectionError, setConnectionError] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [selectedClass, setSelectedClass] = useState('all');

  // Mock class data - thay thế bằng API call
  const classes = [
    { id: 'all', name: 'Tất cả lớp' },
    { id: 'lop1', name: 'Lớp Lá' },
    { id: 'lop2', name: 'Lớp Hoa' },
    { id: 'lop3', name: 'Lớp Sao' },
  ];

  const handleConnectCamera = async () => {
    setIsLoading(true);
    setConnectionError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsConnected(true);
    } catch (error) {
      setConnectionError('Không thể kết nối camera. Vui lòng thử lại.');
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setZoomLevel(100);
    setSelectedClass('all');
  };

  const handleZoom = (type) => {
    if (type === 'in' && zoomLevel < 300) {
      setZoomLevel(zoomLevel + 25);
    } else if (type === 'out' && zoomLevel > 50) {
      setZoomLevel(zoomLevel - 25);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Giám sát Camera</h1>
          <p className="text-slate-600 text-sm mt-1">Xem camera trực tuyến của lớp học</p>
        </div>
        <div className={`px-4 py-2 rounded-lg text-sm font-medium ${
          isConnected 
            ? 'bg-green-100 text-green-700' 
            : 'bg-slate-100 text-slate-700'
        }`}>
          {isConnected ? '● Đã kết nối' : '● Chưa kết nối'}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Camera Viewer */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
            {/* Video Container */}
            <div className="bg-black relative" style={{ aspectRatio: '16/9' }}>
              {isConnected ? (
                <div 
                  className="w-full h-full flex items-center justify-center bg-slate-900 transition-transform"
                  style={{ transform: `scale(${zoomLevel / 100})` }}
                >
                  {/* Mock Video Stream */}
                  <div className="text-center">
                    <div className="w-48 h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 animate-pulse">
                      <span className="material-symbols-outlined text-white text-6xl">videocam</span>
                    </div>
                    <p className="text-white text-sm">Stream: {selectedClass === 'all' ? 'Tất cả lớp' : classes.find(c => c.id === selectedClass)?.name}</p>
                    <p className="text-slate-400 text-xs mt-1">Độ phân giải: 1920x1080 • FPS: 30</p>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <span className="material-symbols-outlined text-slate-600 text-6xl mb-4 opacity-30">videocam_off</span>
                  <p className="text-slate-400 text-sm">Chưa kết nối camera</p>
                </div>
              )}
            </div>

            {/* Video Controls */}
            {isConnected && (
              <div className="border-t border-slate-200 bg-slate-50 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleZoom('out')}
                    className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                    title="Thu nhỏ"
                  >
                    <span className="material-symbols-outlined">zoom_out</span>
                  </button>
                  <span className="text-sm font-medium text-slate-600 w-12 text-center">{zoomLevel}%</span>
                  <button
                    onClick={() => handleZoom('in')}
                    className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                    title="Phóng to"
                  >
                    <span className="material-symbols-outlined">zoom_in</span>
                  </button>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="material-symbols-outlined text-sm">fiber_manual_record</span>
                  Đang ghi hình
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-4">
          {/* Connection Card */}
          <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">settings</span>
              Kết nối
            </h3>

            {connectionError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm flex items-start gap-2">
                <span className="material-symbols-outlined text-base flex-shrink-0 mt-0.5">error</span>
                <span>{connectionError}</span>
              </div>
            )}

            {!isConnected ? (
              <button
                onClick={handleConnectCamera}
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 disabled:bg-slate-300 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin">
                      <span className="material-symbols-outlined">autorenew</span>
                    </span>
                    Đang kết nối...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined">play_arrow</span>
                    Kết nối Camera
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleDisconnect}
                className="w-full bg-red-100 hover:bg-red-200 text-red-700 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">stop</span>
                Đóng Kết Nối
              </button>
            )}
          </div>

          {/* Lớp học */}
          <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">groups</span>
              Chọn Lớp
            </h3>
            <div className="space-y-2">
              {classes.map(cls => (
                <label
                  key={cls.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <input
                    type="radio"
                    name="class"
                    value={cls.id}
                    checked={selectedClass === cls.id}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    disabled={!isConnected}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-sm text-slate-700">{cls.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Camera Info */}
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2 text-sm">
              <span className="material-symbols-outlined text-base">info</span>
              Thông Tin
            </h3>
            <ul className="space-y-2 text-xs text-blue-800">
              <li className="flex justify-between">
                <span>Trạng thái:</span>
                <span className="font-semibold">{isConnected ? 'Hoạt động' : 'Ngừng'}</span>
              </li>
              <li className="flex justify-between">
                <span>Độ phân giải:</span>
                <span className="font-semibold">1920x1080</span>
              </li>
              <li className="flex justify-between">
                <span>FPS:</span>
                <span className="font-semibold">30</span>
              </li>
              <li className="flex justify-between">
                <span>Kết nối:</span>
                <span className="font-semibold">HTTPS</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
