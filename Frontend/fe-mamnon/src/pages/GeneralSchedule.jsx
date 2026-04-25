import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';

export default function GeneralSchedule() {
  const { user, role } = useAuth();
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('class'); // 'class' or 'teacher'

  useEffect(() => {
    if (user && role) {
      fetchGeneralSchedule();
    }
  }, [user, role]);

  const fetchGeneralSchedule = async () => {
    try {
      setLoading(true);
      const res = await api.get('/test-schedules', {
        params: {
          role: role === 'PRINCIPAL' ? 'BGH' : role === 'TEACHER' ? 'GIAOVIEN' : role === 'PARENT' ? 'PHUHUYNH' : role,
          userId: user?.idND
        }
      });

      const allItems = res.data.map(item => ({
        ...item,
        teacherName: item.giaoVien?.hoTen || '—',
        className: item.lop?.tenLop || '—'
      }));
      setSchedule(allItems);
    } catch (error) {
      console.error("Error fetching schedule:", error);
    } finally {
      setLoading(false);
    }
  };

  const days = [2, 3, 4, 5, 6, 7]; // Mon to Sat
  const shifts = ['Sáng', 'Chiều'];

  const getDayName = (day) => day === 8 ? 'Chủ Nhật' : `Thứ ${day}`;

  const getItems = (day, shift) => {
    return schedule.filter(item => Number(item.thu) === Number(day) && item.caHoc === shift);
  };

  const getPageTitle = () => {
    if (role === 'TEACHER' || role === 'GIAOVIEN') return 'Lịch giảng dạy';
    return 'Thời khóa biểu';
  };

  const getPageSubtitle = () => {
    if (role === 'PRINCIPAL' || role === 'BGH') return 'Tổng hợp lịch giảng dạy của tất cả giáo viên';
    if (role === 'TEACHER' || role === 'GIAOVIEN') return 'Lịch giảng dạy cá nhân của bạn';
    if (role === 'PARENT' || role === 'PHUHUYNH') return 'Thời khóa biểu học tập của con';
    return '';
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-surface">
      {/* Header */}
      <header className="w-full sticky top-0 z-40 border-b border-outline-variant/20 bg-white/80 backdrop-blur-md flex items-center justify-between px-8 py-4">
        <div>
          <h2 className="text-left text-2xl font-bold tracking-tight text-on-surface mb-6 px-1">{getPageTitle()}</h2>
          <p className="text-left text-sm text-on-surface-variant mt-0.5">{getPageSubtitle()}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchGeneralSchedule} className="p-2 rounded-lg hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined text-lg">refresh</span>
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-auto px-8 py-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <span className="material-symbols-outlined animate-spin text-4xl text-primary">hourglass_empty</span>
          </div>
        ) : (
          <div className="grid grid-cols-6 gap-4">
            {days.map(day => (
              <div key={day} className="flex flex-col gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-xl text-center font-bold text-sm border border-primary/20 shadow-sm">
                  {getDayName(day)}
                </div>

                {shifts.map(shift => {
                  const items = getItems(day, shift);
                  return (
                    <div key={shift} className="flex-1 min-h-[200px] flex flex-col gap-3">
                      <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest px-1">
                        Ca {shift}
                      </div>
                      <div className="flex-1 bg-surface-container-lowest rounded-2xl border border-outline-variant/10 p-2 space-y-2 shadow-sm">
                        {items.length === 0 ? (
                          <div className="h-full flex items-center justify-center">
                            <span className="text-[10px] text-on-surface-variant italic opacity-30">Trống</span>
                          </div>
                        ) : (
                          items.map((item, idx) => (
                            <div key={idx} className="p-3 rounded-xl bg-surface border border-outline-variant/10 hover:border-primary/30 transition-all hover:shadow-md cursor-default group">
                              <p className="text-xs font-bold text-primary mb-1">{item.monHoc || 'Hoạt động chung'}</p>
                              <div className="flex items-center gap-1.5 mb-1 text-[11px] font-semibold text-on-surface">
                                <span className="material-symbols-outlined text-[14px] text-on-surface-variant">person</span>
                                {item.teacherName}
                              </div>
                              <div className="flex items-center gap-1.5 text-[10px] text-on-surface-variant">
                                <span className="material-symbols-outlined text-[14px]">door_open</span>
                                {item.className}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
