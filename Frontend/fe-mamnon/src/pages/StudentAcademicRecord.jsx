import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';

export default function StudentAcademicRecord() {
  const { user, role } = useAuth();

  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentDetail, setStudentDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [search, setSearch] = useState('');

  // Active tab
  const [activeTab, setActiveTab] = useState('grades');

  // Grade modal
  const [isGradeModalOpen, setIsGradeModalOpen] = useState(false);
  const [gradeForm, setGradeForm] = useState({
    monHoc: '', diemSo: '', nhanXet: '', kyHoc: 'HK1', namHoc: '2025-2026'
  });

  // Evaluation modal
  const [isEvalModalOpen, setIsEvalModalOpen] = useState(false);
  const [evalForm, setEvalForm] = useState({
    nhanXetChung: '', xepLoai: 'Tốt', kyHoc: 'HK1', namHoc: '2025-2026'
  });

  useEffect(() => {
    fetchStudents();
  }, [search]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const params = {
        search,
        role: role === 'PRINCIPAL' ? 'BGH' : 'GIAOVIEN',
        userId: user?.idND
      };
      const res = await api.get('/students', { params });
      setStudents(res.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const selectStudent = async (student) => {
    setSelectedStudent(student);
    setDetailLoading(true);
    try {
      const res = await api.get(`/students/${student.maHS}`);
      setStudentDetail(res.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleAddGrade = async (e) => {
    e.preventDefault();
    try {
      // We need a backend endpoint for this. For now, let's use a generic approach.
      const teacherId = await getTeacherId();
      await api.post(`/students/${selectedStudent.maHS}/grades`, {
        ...gradeForm,
        diemSo: gradeForm.diemSo ? parseFloat(gradeForm.diemSo) : null,
        giaoVienId: teacherId
      });
      setIsGradeModalOpen(false);
      setGradeForm({ monHoc: '', diemSo: '', nhanXet: '', kyHoc: 'HK1', namHoc: '2025-2026' });
      selectStudent(selectedStudent);
    } catch (error) {
      console.error("Error:", error);
      alert("Lưu điểm thất bại!");
    }
  };

  const handleAddEval = async (e) => {
    e.preventDefault();
    try {
      const teacherId = await getTeacherId();
      await api.post(`/students/${selectedStudent.maHS}/evaluations`, {
        ...evalForm,
        giaoVienId: teacherId
      });
      setIsEvalModalOpen(false);
      setEvalForm({ nhanXetChung: '', xepLoai: 'Tốt', kyHoc: 'HK1', namHoc: '2025-2026' });
      selectStudent(selectedStudent);
    } catch (error) {
      console.error("Error:", error);
      alert("Lưu đánh giá thất bại!");
    }
  };

  const getTeacherId = async () => {
    try {
      const res = await api.get(`/students/teacher-id?userId=${user?.idND}`);
      return res.data.maGV;
    } catch {
      return null;
    }
  };

  const computeAverage = (grades) => {
    const scored = grades.filter(g => g.diemSo !== null && g.diemSo !== undefined);
    if (scored.length === 0) return null;
    const sum = scored.reduce((acc, g) => acc + g.diemSo, 0);
    return (sum / scored.length).toFixed(1);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('vi-VN');
  };

  // If no student selected, show student list
  if (!selectedStudent) {
    return (
      <div className="flex-1 flex flex-col min-w-0 bg-surface">
        <header className="w-full sticky top-0 z-40 border-b border-outline-variant/20 bg-white/80 backdrop-blur-md flex items-center px-8 py-4">
          <h2 className="text-2xl font-bold tracking-tight text-on-surface">Hồ sơ học tập</h2>
        </header>

        <div className="px-8 py-4">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                search
              </span>
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm học sinh..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/30 bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
            />
          </div>
        </div>

        <div className="px-8 py-2 flex-1 overflow-auto">
          <p className="text-xs text-on-surface-variant mb-4 font-medium">Chọn một học sinh để xem hồ sơ học tập</p>
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <span className="material-symbols-outlined animate-spin text-4xl text-primary">hourglass_empty</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {students.map(s => (
                <button
                  key={s.maHS}
                  onClick={() => selectStudent(s)}
                  className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/10 text-left hover:shadow-lg hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <span className="text-xl font-bold text-white">{s.hoTen?.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-bold text-on-surface text-sm">{s.hoTen}</p>
                      <p className="text-xs text-on-surface-variant mt-0.5">{s.lop?.tenLop || 'Chưa xếp lớp'}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Student detail view with tabs
  return (
    <div className="flex-1 flex flex-col min-w-0 bg-surface">
      {/* Header with back button */}
      <header className="w-full sticky top-0 z-40 border-b border-outline-variant/20 bg-white/80 backdrop-blur-md flex items-center gap-4 px-8 py-4">
        <button
          onClick={() => { setSelectedStudent(null); setStudentDetail(null); }}
          className="p-2 rounded-xl hover:bg-surface-container-high transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <h2 className="text-xl font-bold tracking-tight text-on-surface">
            Hồ sơ học tập — {selectedStudent.hoTen}
          </h2>
          <p className="text-xs text-on-surface-variant">Lớp: {selectedStudent.lop?.tenLop || '—'}</p>
        </div>
      </header>

      {detailLoading ? (
        <div className="flex items-center justify-center py-20">
          <span className="material-symbols-outlined animate-spin text-4xl text-primary">hourglass_empty</span>
        </div>
      ) : studentDetail && (
        <>
          {/* Tabs */}
          <div className="px-8 pt-4 flex gap-1 border-b border-outline-variant/10">
            {[
              { id: 'grades', label: 'Bảng điểm', icon: 'grade' },
              { id: 'evaluations', label: 'Đánh giá', icon: 'rate_review' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 text-sm font-semibold rounded-t-xl transition-all flex items-center gap-2 ${activeTab === tab.id
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-high'
                  }`}
              >
                <span className="material-symbols-outlined text-lg">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-auto px-8 py-6">
            {/* GRADES TAB */}
            {activeTab === 'grades' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-on-surface">Bảng điểm</h3>
                    {studentDetail.bangDiem.length > 0 && (
                      <p className="text-sm text-on-surface-variant mt-1">
                        Điểm trung bình: <span className="font-bold text-primary text-lg">{computeAverage(studentDetail.bangDiem) || '—'}</span>
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => setIsGradeModalOpen(true)}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all shadow-md active:scale-95"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                    Nhập điểm
                  </button>
                </div>

                {studentDetail.bangDiem.length === 0 ? (
                  <div className="text-center py-12 text-on-surface-variant">
                    <span className="material-symbols-outlined text-5xl opacity-20 mb-3 block">assignment</span>
                    <p>Chưa có dữ liệu bảng điểm</p>
                  </div>
                ) : (
                  <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-surface-container-low border-b border-outline-variant/10">
                          <th className="text-center px-5 py-3 font-bold text-on-surface-variant uppercase text-[11px] tracking-wider">Môn học</th>
                          <th className="text-center px-5 py-3 font-bold text-on-surface-variant uppercase text-[11px] tracking-wider">Điểm</th>
                          <th className="text-center px-5 py-3 font-bold text-on-surface-variant uppercase text-[11px] tracking-wider">Nhận xét</th>
                          <th className="text-center px-5 py-3 font-bold text-on-surface-variant uppercase text-[11px] tracking-wider">Kỳ học</th>
                          <th className="text-center px-5 py-3 font-bold text-on-surface-variant uppercase text-[11px] tracking-wider">Năm học</th>
                        </tr>
                      </thead>
                      <tbody>
                        {studentDetail.bangDiem.map((g, idx) => (
                          <tr key={g.id} className={`border-b border-outline-variant/5 ${idx % 2 !== 0 ? 'bg-surface-container-low/30' : ''}`}>
                            <td className="px-5 py-3 font-semibold text-on-surface">{g.monHoc}</td>
                            <td className="px-5 py-3">
                              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${g.diemSo >= 8 ? 'bg-green-100 text-green-700' : g.diemSo >= 5 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                                }`}>
                                {g.diemSo ?? '—'}
                              </span>
                            </td>
                            <td className="px-5 py-3 text-on-surface-variant">{g.nhanXet || '—'}</td>
                            <td className="px-5 py-3 text-on-surface-variant">{g.kyHoc}</td>
                            <td className="px-5 py-3 text-on-surface-variant">{g.namHoc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* EVALUATIONS TAB */}
            {activeTab === 'evaluations' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-on-surface">Đánh giá tổng kết</h3>
                  <button
                    onClick={() => setIsEvalModalOpen(true)}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all shadow-md active:scale-95"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                    Thêm đánh giá
                  </button>
                </div>

                {studentDetail.danhGia.length === 0 ? (
                  <div className="text-center py-12 text-on-surface-variant">
                    <span className="material-symbols-outlined text-5xl opacity-20 mb-3 block">rate_review</span>
                    <p>Chưa có đánh giá nào</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {studentDetail.danhGia.map(ev => (
                      <div key={ev.id} className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/10 hover:shadow-sm transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${ev.xepLoai === 'Tốt' ? 'bg-green-100 text-green-700'
                              : ev.xepLoai === 'Khá' ? 'bg-blue-100 text-blue-700'
                                : 'bg-yellow-100 text-yellow-700'
                              }`}>
                              {ev.xepLoai || 'Chưa xếp loại'}
                            </span>
                            <span className="text-xs text-on-surface-variant font-medium">{ev.kyHoc} — {ev.namHoc}</span>
                          </div>
                        </div>
                        <p className="text-sm text-on-surface leading-relaxed">{ev.nhanXetChung}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}

      {/* Grade Modal */}
      {isGradeModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setIsGradeModalOpen(false)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="px-8 py-6 border-b border-outline-variant/10 flex items-center justify-between">
              <h3 className="text-xl font-bold text-on-surface">Nhập điểm mới</h3>
              <button onClick={() => setIsGradeModalOpen(false)} className="p-1.5 rounded-lg hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleAddGrade} className="px-8 py-6 space-y-5">
              <div>
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wide mb-2">Môn học *</label>
                <input type="text" value={gradeForm.monHoc} onChange={(e) => setGradeForm({ ...gradeForm, monHoc: e.target.value })} required placeholder="VD: Toán, Tiếng Việt"
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface uppercase tracking-wide mb-2">Điểm số</label>
                  <input type="number" step="0.1" min="0" max="10" value={gradeForm.diemSo} onChange={(e) => setGradeForm({ ...gradeForm, diemSo: e.target.value })} placeholder="0–10"
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface uppercase tracking-wide mb-2">Kỳ học</label>
                  <select value={gradeForm.kyHoc} onChange={(e) => setGradeForm({ ...gradeForm, kyHoc: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none">
                    <option value="HK1">Học kỳ 1</option>
                    <option value="HK2">Học kỳ 2</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wide mb-2">Năm học</label>
                <input type="text" value={gradeForm.namHoc} onChange={(e) => setGradeForm({ ...gradeForm, namHoc: e.target.value })} placeholder="2025-2026"
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wide mb-2">Nhận xét</label>
                <textarea value={gradeForm.nhanXet} onChange={(e) => setGradeForm({ ...gradeForm, nhanXet: e.target.value })} rows={3} placeholder="Nhận xét về kết quả..."
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none" />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setIsGradeModalOpen(false)} className="px-5 py-2.5 rounded-xl border border-outline-variant text-sm font-semibold text-on-surface-variant hover:bg-surface-container transition-colors">Hủy</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all shadow-md active:scale-95">Lưu điểm</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Evaluation Modal */}
      {isEvalModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setIsEvalModalOpen(false)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="px-8 py-6 border-b border-outline-variant/10 flex items-center justify-between">
              <h3 className="text-xl font-bold text-on-surface">Thêm đánh giá tổng kết</h3>
              <button onClick={() => setIsEvalModalOpen(false)} className="p-1.5 rounded-lg hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleAddEval} className="px-8 py-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface uppercase tracking-wide mb-2">Kỳ học</label>
                  <select value={evalForm.kyHoc} onChange={(e) => setEvalForm({ ...evalForm, kyHoc: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none">
                    <option value="HK1">Học kỳ 1</option>
                    <option value="HK2">Học kỳ 2</option>
                    <option value="CN">Cả năm</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface uppercase tracking-wide mb-2">Năm học</label>
                  <input type="text" value={evalForm.namHoc} onChange={(e) => setEvalForm({ ...evalForm, namHoc: e.target.value })} placeholder="2025-2026"
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wide mb-2">Xếp loại</label>
                <select value={evalForm.xepLoai} onChange={(e) => setEvalForm({ ...evalForm, xepLoai: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none">
                  <option value="Tốt">Tốt</option>
                  <option value="Khá">Khá</option>
                  <option value="Trung bình">Trung bình</option>
                  <option value="Yếu">Yếu</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wide mb-2">Nhận xét chung *</label>
                <textarea value={evalForm.nhanXetChung} onChange={(e) => setEvalForm({ ...evalForm, nhanXetChung: e.target.value })} required rows={4} placeholder="Viết nhận xét tổng kết cho học sinh..."
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none" />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setIsEvalModalOpen(false)} className="px-5 py-2.5 rounded-xl border border-outline-variant text-sm font-semibold text-on-surface-variant hover:bg-surface-container transition-colors">Hủy</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all shadow-md active:scale-95">Lưu đánh giá</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
