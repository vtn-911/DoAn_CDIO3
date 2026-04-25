import { useState, useEffect } from 'react';
import StudentSelector from '../components/StudentSelector';
import api from '../services/api';

export default function ChildHealth() {
  const [selectedChild, setSelectedChild] = useState(null);
  const [healthData, setHealthData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedChild) {
      fetchHealthData(selectedChild.maHS);
    }
  }, [selectedChild]);

  const fetchHealthData = async (studentId) => {
    try {
      setLoading(true);
      const res = await api.get(`/parents/children/${studentId}/health`);
      const lifoData = [...res.data].sort((a, b) => {
        const idA = parseInt(a.maSK.replace(/\D/g, '')) || 0;
        const idB = parseInt(b.maSK.replace(/\D/g, '')) || 0;
        return idB - idA;
      });
      setHealthData(lifoData);
    } catch (error) {
      console.error("Error fetching health data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-slate-50">
      <header className="w-full sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md px-8 py-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Hồ sơ sức khỏe</h2>
            <p className="text-sm text-slate-500 mt-1 font-medium">Theo dõi thể trạng và sức khỏe của con định kỳ</p>
          </div>
          <StudentSelector onSelect={setSelectedChild} selectedId={selectedChild?.maHS} />
        </div>
      </header>

      <main className="flex-1 overflow-auto p-8">
        {selectedChild ? (
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Latest Stats Card */}
            {healthData.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                       <span className="material-symbols-outlined text-3xl">height</span>
                    </div>
                    <div>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Chiều cao hiện tại</p>
                       <p className="text-2xl font-black text-slate-900">{healthData[0].chieuCao} <span className="text-sm font-bold text-slate-400">cm</span></p>
                    </div>
                 </div>
                 <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                       <span className="material-symbols-outlined text-3xl">weight</span>
                    </div>
                    <div>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cân nặng hiện tại</p>
                       <p className="text-2xl font-black text-slate-900">{healthData[0].canNang} <span className="text-sm font-bold text-slate-400">kg</span></p>
                    </div>
                 </div>
              </div>
            )}

            {/* Health History Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
               <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-indigo-600">history</span>
                    <h4 className="font-bold text-slate-800 uppercase text-xs tracking-wider">Lịch sử kiểm tra sức khỏe</h4>
                  </div>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50/30">
                      <tr>
                        <th className="px-6 py-3 text-[10px] uppercase font-bold text-slate-400">Ngày kiểm tra</th>
                        <th className="px-6 py-3 text-[10px] uppercase font-bold text-slate-400">Chiều cao</th>
                        <th className="px-6 py-3 text-[10px] uppercase font-bold text-slate-400">Cân nặng</th>
                        <th className="px-6 py-3 text-[10px] uppercase font-bold text-slate-400">Tình trạng / Nhận xét</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {healthData.length === 0 ? (
                        <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-400 italic text-sm">Chưa có dữ liệu sức khỏe</td></tr>
                      ) : (
                        healthData.map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4 text-sm font-bold text-slate-700">
                               {new Date(item.ngayKiemTra).toLocaleDateString('vi-VN')}
                            </td>
                            <td className="px-6 py-4 text-sm font-semibold text-slate-600">{item.chieuCao} cm</td>
                            <td className="px-6 py-4 text-sm font-semibold text-slate-600">{item.canNang} kg</td>
                            <td className="px-6 py-4">
                               <div className="flex flex-col gap-1">
                                  <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase w-fit ${
                                     item.tinhTrang?.includes('Tốt') ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                  }`}>
                                     {item.tinhTrang || 'Bình thường'}
                                  </span>
                                  <p className="text-xs text-slate-500 italic">Kiểm tra định kỳ</p>
                               </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
               </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-slate-400 italic">Vui lòng chọn con để xem hồ sơ sức khỏe</p>
          </div>
        )}
      </main>
    </div>
  );
}
