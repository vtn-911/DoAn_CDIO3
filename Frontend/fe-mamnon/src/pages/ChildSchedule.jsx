import { useState, useEffect } from 'react';
import StudentSelector from '../components/StudentSelector';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';

export default function ChildSchedule() {
  const { user } = useAuth();
  const [selectedChild, setSelectedChild] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);

  const days = [
    { value: 2, label: 'Thứ 2' },
    { value: 3, label: 'Thứ 3' },
    { value: 4, label: 'Thứ 4' },
    { value: 5, label: 'Thứ 5' },
    { value: 6, label: 'Thứ 6' },
  ];

  const slots = ['Sáng', 'Chiều'];

  useEffect(() => {
    if (selectedChild && selectedChild.lopId) {
      fetchSchedule(selectedChild.lopId);
    } else {
      setSchedules([]);
    }
  }, [selectedChild]);

  const fetchSchedule = async (lopId) => {
    try {
      setLoading(true);
      // We can use the existing /schedules endpoint but we need to make sure it handles direct class filtering
      // Or we can just use the generic one with role=PHUHUYNH logic if we adapt it
      // For now, let's assume we can pass maLop to a specific endpoint or use existing logic
      const res = await api.get('/schedules', { 
        params: { role: 'PARENT', userId: user?.idND, maLop: lopId } 
      });
      setSchedules(res.data);
    } catch (error) {
      console.error("Error fetching schedule:", error);
    } finally {
      setLoading(false);
    }
  };

  const getScheduleAt = (day, slot) => {
    return schedules.find(s => s.thu === day && s.caHoc === slot);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-slate-50">
      <header className="w-full sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md px-8 py-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Thời khóa biểu của con</h2>
            <p className="text-sm text-slate-500 mt-1 font-medium">Theo dõi lịch học và hoạt động trong tuần</p>
          </div>
          <StudentSelector onSelect={setSelectedChild} selectedId={selectedChild?.maHS} />
        </div>
      </header>

      <main className="flex-1 overflow-auto p-8">
        {selectedChild ? (
          <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="p-6 text-left text-[10px] uppercase font-bold text-slate-400 w-32 border-r border-slate-200">Ca học</th>
                      {days.map(day => (
                        <th key={day.value} className="p-6 text-center text-sm font-bold text-slate-700 border-r border-slate-200 last:border-r-0">
                          {day.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {slots.map(slot => (
                      <tr key={slot} className="border-b border-slate-100 last:border-b-0">
                        <td className="p-6 bg-slate-50/30 border-r border-slate-200">
                           <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-slate-400 text-lg">
                                 {slot === 'Sáng' ? 'light_mode' : 'dark_mode'}
                              </span>
                              <span className="text-sm font-bold text-slate-600">{slot}</span>
                           </div>
                        </td>
                        {days.map(day => {
                          const item = getScheduleAt(day.value, slot);
                          return (
                            <td key={`${day.value}-${slot}`} className="p-4 border-r border-slate-100 last:border-r-0 h-32 align-top">
                              {item ? (
                                <div className="h-full p-4 rounded-2xl bg-indigo-50 border border-indigo-100 flex flex-col justify-center animate-in zoom-in-95 duration-300">
                                  <p className="text-sm font-black text-indigo-700 text-center leading-tight mb-2">
                                    {item.monHoc}
                                  </p>
                                  <div className="flex flex-col items-center gap-1">
                                     <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-tighter">Giáo viên</span>
                                     <span className="text-[11px] font-bold text-slate-600 text-center">
                                       {item.giaoVien?.hoTen || '—'}
                                     </span>
                                  </div>
                                </div>
                              ) : (
                                <div className="h-full rounded-2xl border-2 border-dashed border-slate-100 flex items-center justify-center">
                                   <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Nghỉ</span>
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="mt-6 flex items-center gap-4 p-4 rounded-2xl bg-amber-50 border border-amber-100">
               <span className="material-symbols-outlined text-amber-600">info</span>
               <p className="text-xs font-medium text-amber-800">
                  Lịch học có thể thay đổi tùy theo kế hoạch của nhà trường. Phụ huynh vui lòng theo dõi thông báo thường xuyên.
               </p>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-slate-400 italic">Vui lòng chọn con để xem thời khóa biểu</p>
          </div>
        )}
      </main>
    </div>
  );
}
