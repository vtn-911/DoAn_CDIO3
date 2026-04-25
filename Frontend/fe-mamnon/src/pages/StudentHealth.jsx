import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';

export default function StudentHealth() {
  const { user, role } = useAuth();
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [healthRecords, setHealthRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  // Modal for adding/editing health records
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [formData, setFormData] = useState({
    chieuCao: '',
    canNang: '',
    tinhTrang: '',
    ngayKiemTra: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (selectedStudent) {
      fetchHealthRecords(selectedStudent.maHS);
    }
  }, [selectedStudent]);

  const fetchStudents = async () => {
    try {
      const params = {
        role: role === 'PRINCIPAL' ? 'BGH' : 'GIAOVIEN',
        userId: user?.idND
      };
      const res = await api.get('/students', { params });
      setStudents(res.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchHealthRecords = async (studentId) => {
    try {
      setLoading(true);
      const res = await api.get(`/health/${studentId}`);
      const lifoData = [...res.data].sort((a, b) => {
        const idA = parseInt(a.maSK.replace(/\D/g, '')) || 0;
        const idB = parseInt(b.maSK.replace(/\D/g, '')) || 0;
        return idB - idA;
      });
      setHealthRecords(lifoData);
    } catch (error) {
      console.error("Error fetching health records:", error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (record = null) => {
    setEditingRecord(record);
    if (record) {
      setFormData({
        chieuCao: record.chieuCao,
        canNang: record.canNang,
        tinhTrang: record.tinhTrang || '',
        ngayKiemTra: record.ngayKiemTra ? record.ngayKiemTra.split('T')[0] : new Date().toISOString().split('T')[0]
      });
    } else {
      setFormData({
        chieuCao: '',
        canNang: '',
        tinhTrang: '',
        ngayKiemTra: new Date().toISOString().split('T')[0]
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingRecord) {
        await api.put(`/health/${editingRecord.maSK}`, formData);
      } else {
        await api.post('/health', { ...formData, hocSinhId: selectedStudent.maHS });
      }
      await fetchHealthRecords(selectedStudent.maHS);
      alert(editingRecord ? "Cập nhật thành công!" : "Thêm bản ghi thành công!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving health record:", error);
      alert(error.response?.data?.error || "Lỗi khi lưu dữ liệu sức khỏe!");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Bạn có chắc muốn xóa bản ghi sức khỏe này?")) return;
    try {
      await api.delete(`/health/${id}`);
      await fetchHealthRecords(selectedStudent.maHS);
      alert("Đã xóa bản ghi sức khỏe!");
    } catch (error) {
      console.error("Error deleting health record:", error);
      alert(error.response?.data?.error || "Lỗi khi xóa bản ghi sức khỏe!");
    }
  };

  const filteredStudents = students.filter(s =>
    s.hoTen.toLowerCase().includes(search.toLowerCase()) ||
    s.maHS.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-slate-50">
      <header className="w-full sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md px-8 py-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Theo dõi sức khỏe học sinh</h2>
          <p className="text-sm text-slate-500 mt-1 font-medium">Cập nhật chỉ số phát triển của học sinh định kỳ</p>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar: Student List */}
        <div className="w-80 border-r border-slate-200 bg-white flex flex-col">
          <div className="p-4 border-b border-slate-100">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                  search
                </span>
              </div>              <input
                type="text"
                placeholder="Tìm học sinh..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredStudents.length === 0 ? (
              <p className="p-4 text-center text-slate-400 text-xs italic">Không tìm thấy học sinh</p>
            ) : (
              filteredStudents.map(student => (
                <button
                  key={student.maHS}
                  onClick={() => setSelectedStudent(student)}
                  className={`w-full text-left px-6 py-4 border-b border-slate-50 hover:bg-slate-50 transition-colors flex items-center gap-3 ${selectedStudent?.maHS === student.maHS ? 'bg-indigo-50 border-r-4 border-r-indigo-500' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-sm ${student.gioiTinh === 'Nữ' ? 'bg-pink-400' : 'bg-blue-400'}`}>
                    {student.hoTen.charAt(0)}
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${selectedStudent?.maHS === student.maHS ? 'text-indigo-700' : 'text-slate-700'}`}>{student.hoTen}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{student.maHS} • {student.lop?.tenLop || 'Chưa xếp lớp'}</p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Right Content: Health Profile */}
        <main className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
          {selectedStudent ? (
            <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl text-white shadow-md ${selectedStudent.gioiTinh === 'Nữ' ? 'bg-pink-500' : 'bg-blue-500'}`}>
                    {selectedStudent.hoTen.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">{selectedStudent.hoTen}</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{selectedStudent.lop?.tenLop} • {selectedStudent.maHS}</p>
                  </div>
                </div>
                <button
                  onClick={() => openModal()}
                  className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-2xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95"
                >
                  <span className="material-symbols-outlined text-lg">add</span>
                  Thêm bản ghi mới
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">height</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Chiều cao mới nhất</p>
                    <p className="text-xl font-black text-slate-900">{healthRecords[0]?.chieuCao || '—'} <span className="text-xs font-bold text-slate-400">cm</span></p>
                  </div>
                </div>
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">weight</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Cân nặng mới nhất</p>
                    <p className="text-xl font-black text-slate-900">{healthRecords[0]?.canNang || '—'} <span className="text-xs font-bold text-slate-400">kg</span></p>
                  </div>
                </div>
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">monitoring</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Tình trạng</p>
                    <p className="text-sm font-black text-emerald-700">{healthRecords[0]?.tinhTrang || 'Bình thường'}</p>
                  </div>
                </div>
              </div>

              {/* History Table */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">Lịch sử theo dõi sức khỏe</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50/50">
                      <tr>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Ngày kiểm tra</th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Chiều cao</th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Cân nặng</th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tình trạng</th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {loading ? (
                        <tr><td colSpan={5} className="px-6 py-10 text-center text-slate-400 italic">Đang tải dữ liệu...</td></tr>
                      ) : healthRecords.length === 0 ? (
                        <tr><td colSpan={5} className="px-6 py-10 text-center text-slate-400 italic">Chưa có bản ghi nào cho học sinh này</td></tr>
                      ) : (
                        healthRecords.map(record => (
                          <tr key={record.maSK} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4 text-sm font-bold text-slate-700">{new Date(record.ngayKiemTra).toLocaleDateString('vi-VN')}</td>
                            <td className="px-6 py-4 text-sm font-semibold text-slate-600">{record.chieuCao} cm</td>
                            <td className="px-6 py-4 text-sm font-semibold text-slate-600">{record.canNang} kg</td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${record.tinhTrang?.includes('Tốt') ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                {record.tinhTrang || 'Bình thường'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button onClick={() => openModal(record)} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-100">
                                  <span className="material-symbols-outlined text-lg">edit</span>
                                </button>
                                <button onClick={() => handleDelete(record.maSK)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-100">
                                  <span className="material-symbols-outlined text-lg">delete</span>
                                </button>
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
            <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
              <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-5xl opacity-20">favorite</span>
              </div>
              <p className="text-sm font-medium italic">Vui lòng chọn học sinh ở danh sách bên trái để theo dõi sức khỏe</p>
            </div>
          )}
        </main>
      </div>

      {/* Modal Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-md p-8 animate-in zoom-in-95 duration-300">
            <h3 className="text-xl font-black text-slate-900 mb-6">{editingRecord ? 'Cập nhật chỉ số' : 'Thêm bản ghi sức khỏe'}</h3>
            <form onSubmit={handleSave} className="space-y-5">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Ngày kiểm tra</label>
                <input
                  type="date"
                  required
                  value={formData.ngayKiemTra}
                  onChange={e => setFormData({ ...formData, ngayKiemTra: e.target.value })}
                  className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-bold text-slate-700"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Chiều cao (cm)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formData.chieuCao}
                    onChange={e => setFormData({ ...formData, chieuCao: e.target.value })}
                    placeholder="VD: 105.5"
                    className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-bold text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Cân nặng (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formData.canNang}
                    onChange={e => setFormData({ ...formData, canNang: e.target.value })}
                    placeholder="VD: 18.2"
                    className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-bold text-slate-700"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Tình trạng / Nhận xét</label>
                <textarea
                  value={formData.tinhTrang}
                  onChange={e => setFormData({ ...formData, tinhTrang: e.target.value })}
                  placeholder="VD: Sức khỏe tốt, phát triển bình thường..."
                  rows={3}
                  className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-bold text-slate-700 resize-none"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 rounded-2xl text-sm font-bold text-slate-500 hover:bg-slate-100 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-indigo-600 text-white rounded-2xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95"
                >
                  Lưu dữ liệu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
