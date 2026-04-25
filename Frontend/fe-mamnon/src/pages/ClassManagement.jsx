import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';

export default function ClassManagement() {
  const { user, role } = useAuth();
  const isBGH = role === 'PRINCIPAL' || role === 'BGH';

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [formData, setFormData] = useState({ maLop: '', tenLop: '', siSo: '' });

  // Student list modal
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [classStudents, setClassStudents] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);

  // Teacher list for assignment
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetchClasses();
    if (isBGH) {
      fetchTeachers();
      fetchAvailableStudents();
    }
  }, [user, role]);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const res = await api.get('/classes', {
        params: { role: isBGH ? 'BGH' : 'GIAOVIEN', userId: user?.idND }
      });
      setClasses(res.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTeachers = async () => {
    try {
      const res = await api.get('/teachers');
      setTeachers(res.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const fetchAvailableStudents = async () => {
    try {
      const res = await api.get('/students');
      setAllStudents(res.data.filter(s => !s.lopId));
    } catch (error) {
      console.error("Error fetching available students:", error);
    }
  };

  const openModal = (cls = null) => {
    if (cls) {
      setEditingClass(cls);
      setFormData({ maLop: cls.maLop, tenLop: cls.tenLop, siSo: cls.siSo || '' });
    } else {
      setEditingClass(null);
      setFormData({ maLop: '', tenLop: '', siSo: '' });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingClass) {
        await api.put(`/classes/${editingClass.maLop}`, formData);
      } else {
        await api.post('/classes', formData);
      }
      setIsModalOpen(false);
      fetchClasses();
    } catch (error) {
      console.error("Error saving class:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa lớp học này?")) {
      try {
        await api.delete(`/classes/${id}`);
        fetchClasses();
      } catch (error) {
        console.error("Error deleting class:", error);
      }
    }
  };

  const handleAssignTeacher = async (maLop, maGV) => {
    try {
      await api.post('/classes/assign-teacher', { maLop, maGV });
      fetchClasses();
    } catch (error) {
      console.error("Error assigning teacher:", error);
    }
  };

  const openStudentList = async (cls) => {
    setSelectedClass(cls);
    try {
      const res = await api.get(`/classes/${cls.maLop}/students`);
      setClassStudents(res.data);
      setIsStudentModalOpen(true);
    } catch (error) {
      console.error("Error fetching class students:", error);
    }
  };

  const addStudentToClass = async (maHS) => {
    try {
      await api.post(`/classes/${selectedClass.maLop}/students`, { maHS });
      const res = await api.get(`/classes/${selectedClass.maLop}/students`);
      setClassStudents(res.data);
      fetchAvailableStudents();
      fetchClasses();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC]">
      {/* Header */}
      <header className="w-full sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-8 py-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Quản lý lớp học</h2>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            {isBGH ? "Hệ thống quản lý danh sách, nhân sự và sĩ số lớp học" : "Các lớp học bạn đang trực tiếp phụ trách"}
          </p>
        </div>
        {isBGH && (
          <button onClick={() => openModal()} className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center gap-2 active:scale-95">
            <span className="material-symbols-outlined text-lg">add</span>
            Tạo lớp mới
          </button>
        )}
      </header>

      {/* Content */}
      <div className="flex-1 overflow-auto px-8 py-8">
        <div className="flex flex-wrap gap-6 p-4">
          {classes.map((cls) => {
            const isHomeroom = cls.giaoVienId && teachers.find(t => t.maGV === cls.giaoVienId)?.nguoiDung === user?.idND;
            const currentCount = cls._count?.hocSinh || 0;
            const targetSiSo = cls.siSo || 20;
            const percent = Math.min(100, (currentCount / targetSiSo) * 100);

            return (
              <div key={cls.maLop} className="w-full max-w-[380px] bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col group relative overflow-hidden h-full">
                {/* Status Badge */}
                {!isBGH && (
                  <div className={`absolute top-0 right-0 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-bl-xl shadow-sm ${isHomeroom ? 'bg-indigo-600 text-white' : 'bg-amber-500 text-white'}`}>
                    {isHomeroom ? 'Chủ nhiệm' : 'Giảng dạy'}
                  </div>
                )}

                {/* Header: Gom gọn icon và tên */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    <span className="material-symbols-outlined text-xl">school</span>
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="text-base font-bold text-slate-900 leading-tight truncate">{cls.tenLop}</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{cls.maLop}</p>
                  </div>
                </div>

                <div className="space-y-4 flex-1">
                  {/* Sĩ số - Làm gọn font chữ */}
                  <div>
                    <div className="flex justify-between items-end mb-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">Sĩ số</span>
                      <span className="text-xs font-bold text-slate-900">
                        {currentCount}<span className="text-slate-300 mx-0.5">/</span>{targetSiSo}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${percent > 90 ? 'bg-rose-500' : 'bg-indigo-500'}`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>

                  {/* GVCN Section - Giảm padding */}
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Giáo viên chủ nhiệm</p>
                    {isBGH ? (
                      <select
                        value={cls.giaoVienId || ''}
                        onChange={(e) => handleAssignTeacher(cls.maLop, e.target.value)}
                        className="w-full bg-transparent text-sm font-semibold text-slate-700 focus:outline-none cursor-pointer"
                      >
                        <option value="">Chưa phân công</option>
                        {teachers.map(t => <option key={t.maGV} value={t.maGV}>{t.hoTen}</option>)}
                      </select>
                    ) : (
                      <p className="text-sm font-semibold text-slate-700 truncate">{cls.giaoVien?.hoTen || 'Chưa phân công'}</p>
                    )}
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="mt-5 flex gap-2">
                  <button
                    onClick={() => openStudentList(cls)}
                    className="flex-1 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                  >
                    Học sinh
                  </button>
                  {isBGH && (
                    <div className="flex gap-1">
                      <button onClick={() => openModal(cls)} className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button onClick={() => handleDelete(cls.maLop)} className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all">
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Class Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSave}>
              <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">{editingClass ? 'Cập nhật thông tin lớp' : 'Tạo lớp học mới'}</h3>
                <button type="button" onClick={() => setIsModalOpen(false)} className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors">
                  <span className="material-symbols-outlined text-slate-400">close</span>
                </button>
              </div>

              <div className="px-8 py-8 space-y-5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-2 ml-1">Mã lớp định danh</label>
                  <input
                    type="text" required disabled={!!editingClass}
                    value={formData.maLop} onChange={(e) => setFormData({ ...formData, maLop: e.target.value })}
                    placeholder="VD: LOP-MG-01" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-2 ml-1">Tên lớp hiển thị</label>
                  <input
                    type="text" required
                    value={formData.tenLop} onChange={(e) => setFormData({ ...formData, tenLop: e.target.value })}
                    placeholder="VD: Mầm non 1" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-2 ml-1">Sĩ số tối đa</label>
                  <input
                    type="number"
                    value={formData.siSo} onChange={(e) => setFormData({ ...formData, siSo: e.target.value })}
                    placeholder="20" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all font-medium"
                  />
                </div>
              </div>

              <div className="px-8 py-5 bg-slate-50 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 text-sm font-bold text-slate-500">Hủy bỏ</button>
                <button type="submit" className="px-8 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">Lưu dữ liệu</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Student List Modal */}
      {isStudentModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setIsStudentModalOpen(false)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Danh sách học sinh</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-wider">{selectedClass?.maLop}</span>
                  <span className="text-sm text-slate-500 font-medium">{selectedClass?.tenLop}</span>
                </div>
              </div>
              <button onClick={() => setIsStudentModalOpen(false)} className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-slate-400">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              {isBGH && (
                <div className="mb-8">
                  <button
                    onClick={() => setIsAddStudentOpen(!isAddStudentOpen)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${isAddStudentOpen ? 'bg-slate-100 text-slate-600' : 'bg-indigo-50 text-indigo-600'}`}
                  >
                    <span className="material-symbols-outlined text-lg">{isAddStudentOpen ? 'remove' : 'add'}</span>
                    {isAddStudentOpen ? 'Ẩn bảng thêm' : 'Thêm học sinh mới'}
                  </button>

                  {isAddStudentOpen && (
                    <div className="mt-4 p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100">
                      <p className="text-[10px] font-bold text-indigo-400 uppercase mb-4 tracking-widest">Học sinh chưa có lớp ({allStudents.length})</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {allStudents.length === 0 ? (
                          <div className="col-span-full text-center py-6 text-slate-400 italic text-sm">Không còn học sinh nào đang chờ xếp lớp</div>
                        ) : (
                          allStudents.map(s => (
                            <div key={s.maHS} className="flex items-center justify-between p-3 rounded-xl bg-white border border-indigo-100 shadow-sm">
                              <div>
                                <p className="text-sm font-bold text-slate-900">{s.hoTen}</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase">{s.maHS}</p>
                              </div>
                              <button onClick={() => addStudentToClass(s.maHS)} className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 transition-all active:scale-90">
                                <span className="material-symbols-outlined text-lg">add</span>
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-4 text-[10px] uppercase font-bold text-slate-400 tracking-wider">Học sinh</th>
                      <th className="px-6 py-4 text-[10px] uppercase font-bold text-slate-400 tracking-wider">Ngày sinh</th>
                      <th className="px-6 py-4 text-[10px] uppercase font-bold text-slate-400 tracking-wider">Phụ huynh</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {classStudents.length === 0 ? (
                      <tr><td colSpan={3} className="px-6 py-12 text-center text-slate-400 italic text-sm">Lớp học hiện chưa có học sinh nào</td></tr>
                    ) : (
                      classStudents.map(s => (
                        <tr key={s.maHS} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-[10px]">
                                {s.hoTen.split(' ').pop().charAt(0)}
                              </div>
                              <div>
                                <p className="text-sm font-bold text-slate-900 leading-tight">{s.hoTen}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase">{s.maHS}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-xs font-bold text-slate-600">{s.ngaySinh ? new Date(s.ngaySinh).toLocaleDateString('vi-VN') : '—'}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-slate-700">
                              <span className="material-symbols-outlined text-[16px] text-slate-400">person</span>
                              <span className="text-xs font-bold">{s.phuHuynh?.hoTen || 'Chưa cập nhật'}</span>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="px-8 py-5 bg-slate-50 flex justify-end sticky bottom-0">
              <button onClick={() => setIsStudentModalOpen(false)} className="px-8 py-2 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-black transition-all">Hoàn tất</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
