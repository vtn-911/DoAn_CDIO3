import { useState, useEffect } from 'react';
import StudentSelector from '../components/StudentSelector';
import api from '../services/api';

export default function ChildAcademic() {
  const [selectedChild, setSelectedChild] = useState(null);
  const [academicData, setAcademicData] = useState({ bangDiem: [], diemdanh: [], danhgia: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedChild) {
      fetchAcademicData(selectedChild.maHS);
    }
  }, [selectedChild]);

  const fetchAcademicData = async (studentId) => {
    try {
      setLoading(true);
      const res = await api.get(`/parents/children/${studentId}/academic`);
      setAcademicData(res.data);
    } catch (error) {
      console.error("Error fetching academic data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-slate-50">
      <header className="w-full sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md px-8 py-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Kết quả học tập</h2>
            <p className="text-sm text-slate-500 mt-1 font-medium">Theo dõi điểm số và chuyên cần của con</p>
          </div>
          <StudentSelector onSelect={setSelectedChild} selectedId={selectedChild?.maHS} />
        </div>
      </header>

      <main className="flex-1 overflow-auto p-8">
        {selectedChild ? (
          <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Grades Section */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
               <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
                  <span className="material-symbols-outlined text-indigo-600">grade</span>
                  <h4 className="font-bold text-slate-800 uppercase text-xs tracking-wider">Bảng điểm chi tiết</h4>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50/30">
                      <tr>
                        <th className="px-6 py-3 text-[10px] uppercase font-bold text-slate-400">Môn học</th>
                        <th className="px-6 py-3 text-[10px] uppercase font-bold text-slate-400 text-center">Điểm số</th>
                        <th className="px-6 py-3 text-[10px] uppercase font-bold text-slate-400">Nhận xét của giáo viên</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {academicData.bangDiem.length === 0 ? (
                        <tr><td colSpan={3} className="px-6 py-8 text-center text-slate-400 italic text-sm">Chưa có dữ liệu điểm số</td></tr>
                      ) : (
                        academicData.bangDiem.map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/50">
                            <td className="px-6 py-4 font-bold text-slate-700 text-sm">{item.monHoc}</td>
                            <td className="px-6 py-4 text-center">
                               <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm ${
                                  item.diemSo >= 8 ? 'bg-emerald-100 text-emerald-700' : 
                                  item.diemSo >= 5 ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                               }`}>
                                  {item.diemSo}
                               </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-500">{item.nhanXet || '—'}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               {/* Attendance Section */}
               <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                  <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
                    <span className="material-symbols-outlined text-emerald-600">calendar_today</span>
                    <h4 className="font-bold text-slate-800 uppercase text-xs tracking-wider">Chuyên cần (30 ngày gần nhất)</h4>
                  </div>
                  <div className="p-6 overflow-y-auto max-h-[400px]">
                     <div className="space-y-3">
                        {academicData.diemdanh.length === 0 ? (
                          <p className="text-center py-8 text-slate-400 italic text-sm">Chưa có dữ liệu điểm danh</p>
                        ) : (
                          academicData.diemdanh.map((record, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                               <div>
                                  <p className="text-sm font-bold text-slate-700">{new Date(record.ngay).toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'numeric' })}</p>
                                  <p className="text-[10px] text-slate-400 uppercase font-bold">{record.ghiChu}</p>
                               </div>
                               <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                                  record.trangThai === 'Có mặt' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                               }`}>
                                  {record.trangThai}
                               </span>
                            </div>
                          ))
                        )}
                     </div>
                  </div>
               </div>

               {/* Evaluation Section */}
               <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                  <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
                    <span className="material-symbols-outlined text-amber-600">comment</span>
                    <h4 className="font-bold text-slate-800 uppercase text-xs tracking-wider">Nhận xét định kỳ</h4>
                  </div>
                  <div className="p-6 space-y-4 overflow-y-auto max-h-[400px]">
                      {academicData.danhgia.length === 0 ? (
                        <p className="text-center py-8 text-slate-400 italic text-sm">Chưa có nhận xét nào</p>
                      ) : (
                        academicData.danhgia.map((evalItem, idx) => (
                          <div key={idx} className="relative pl-6 border-l-2 border-indigo-100 pb-6 last:pb-0">
                             <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-indigo-600" />
                             <p className="text-[10px] font-bold text-indigo-600 uppercase mb-1">Năm học: {evalItem.namHoc}</p>
                             <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                <p className="text-sm text-slate-700 leading-relaxed italic">"{evalItem.nhanXetChung}"</p>
                             </div>
                          </div>
                        ))
                      )}
                  </div>
               </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-slate-400 italic">Vui lòng chọn con để xem kết quả học tập</p>
          </div>
        )}
      </main>
    </div>
  );
}
