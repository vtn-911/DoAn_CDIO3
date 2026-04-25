import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';

export default function StudentManagement() {
  const { user, role } = useAuth();
  const isBGH = role === 'PRINCIPAL' || role === 'BGH';

  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 7;

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    hoTen: '', ngaySinh: '', gioiTinh: 'Nam', lopId: '', phuHuynhId: ''
  });

  // Parent autocomplete
  const [parentSearch, setParentSearch] = useState('');
  const [parentSuggestions, setParentSuggestions] = useState([]);
  const [selectedParent, setSelectedParent] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const parentInputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Detail view
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetchClassList();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    const delay = setTimeout(() => fetchStudents(), 300);
    return () => clearTimeout(delay);
  }, [search, classFilter]);

  // Parent search debounce
  useEffect(() => {
    if (!parentSearch.trim() || selectedParent) {
      setParentSuggestions([]);
      return;
    }
    const delay = setTimeout(async () => {
      try {
        const res = await api.get('/parents/search', { params: { q: parentSearch } });
        setParentSuggestions(res.data);
        setShowSuggestions(res.data.length > 0);
      } catch {
        setParentSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [parentSearch]);

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target) &&
        parentInputRef.current && !parentInputRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchClassList = async () => {
    try {
      const res = await api.get('/classes', { params: { role, userId: user?.idND } });
      setClasses(res.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const params = {
        search,
        role: role === 'PRINCIPAL' ? 'BGH' : 'GIAOVIEN',
        userId: user?.idND
      };
      if (classFilter) params.lopId = classFilter;
      const response = await api.get('/students', { params });
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  const selectParentSuggestion = (parent) => {
    setSelectedParent(parent);
    setParentSearch(parent.hoTen);
    setFormData(prev => ({ ...prev, phuHuynhId: parent.maPH }));
    setShowSuggestions(false);
    setParentSuggestions([]);
  };

  const clearParent = () => {
    setSelectedParent(null);
    setParentSearch('');
    setFormData(prev => ({ ...prev, phuHuynhId: '' }));
  };

  const openModal = (student = null) => {
    setEditingStudent(student);
    if (student) {
      setFormData({
        hoTen: student.hoTen || '',
        ngaySinh: student.ngaySinh ? student.ngaySinh.split('T')[0] : '',
        gioiTinh: student.gioiTinh || 'Nam',
        lopId: student.lopId || '',
        phuHuynhId: student.phuHuynhId || ''
      });
      if (student.phuHuynh) {
        setSelectedParent({ maPH: student.phuHuynhId, hoTen: student.phuHuynh.hoTen });
        setParentSearch(student.phuHuynh.hoTen);
      } else {
        setSelectedParent(null);
        setParentSearch('');
      }
    } else {
      setFormData({ hoTen: '', ngaySinh: '', gioiTinh: 'Nam', lopId: '', phuHuynhId: '' });
      setSelectedParent(null);
      setParentSearch('');
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      if (!payload.lopId) delete payload.lopId;
      if (!payload.phuHuynhId) delete payload.phuHuynhId;

      if (editingStudent) {
        await api.put(`/students/${editingStudent.maHS}`, payload);
      } else {
        await api.post('/students', payload);
      }
      setIsModalOpen(false);
      fetchStudents();
    } catch (error) {
      console.error("Error saving student:", error);
      const msg = error.response?.data?.error || "Lưu thất bại. Vui lòng thử lại!";
      alert(msg);
    }
  };

  const handleDelete = async (maHS) => {
    if (!confirm("Bạn có chắc muốn xóa học sinh này?")) return;
    try {
      await api.delete(`/students/${maHS}`);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const totalPages = Math.ceil(students.length / studentsPerPage);
  const startIndex = (currentPage - 1) * studentsPerPage;
  const paginatedStudents = students.slice(startIndex, startIndex + studentsPerPage);

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('vi-VN');
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-surface">
      {/* Header */}
      <header className="w-full sticky top-0 z-40 border-b border-outline-variant/20 bg-white/80 backdrop-blur-md flex items-center justify-between px-8 py-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-on-surface">Thông tin học sinh</h2>
          <p className="text-sm text-on-surface-variant mt-0.5">{students.length} học sinh</p>
        </div>
        {isBGH && (
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <span className="material-symbols-outlined text-sm">person_add</span>
            Thêm học sinh
          </button>
        )}
      </header>

      {/* Filters */}
      <div className="px-8 py-4 flex gap-4 items-center border-b border-outline-variant/10">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">search</span>
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm theo tên học sinh..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/30 bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
          />
        </div>
        <select
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-outline-variant/30 bg-surface-container-lowest text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          <option value="">Tất cả lớp</option>
          {classes.map(c => (
            <option key={c.maLop} value={c.maLop}>{c.tenLop}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto px-8 py-4">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <span className="material-symbols-outlined animate-spin text-4xl text-primary">hourglass_empty</span>
          </div>
        ) : paginatedStudents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-on-surface-variant">
            <span className="material-symbols-outlined text-6xl mb-4 opacity-20">person_off</span>
            <p className="text-lg">Không tìm thấy học sinh nào</p>
          </div>
        ) : (
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 overflow-hidden shadow-sm">
            <table className="w-full text-sm table-fixed">
              <colgroup>
                <col className="w-32" />
                <col className="w-48" />
                <col className="w-32" />
                <col className="w-24" />
                <col className="w-28" />
                <col className="w-40" />
                {isBGH && <col className="w-24" />}
              </colgroup>
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant/10">
                  <th className="text-center px-4 py-3.5 font-bold text-on-surface-variant uppercase text-[11px] tracking-wider">Mã HS</th>
                  <th className="text-center px-4 py-3.5 font-bold text-on-surface-variant uppercase text-[11px] tracking-wider">Họ và tên</th>
                  <th className="text-center px-4 py-3.5 font-bold text-on-surface-variant uppercase text-[11px] tracking-wider">Ngày sinh</th>
                  <th className="text-center px-4 py-3.5 font-bold text-on-surface-variant uppercase text-[11px] tracking-wider">Giới tính</th>
                  <th className="text-center px-4 py-3.5 font-bold text-on-surface-variant uppercase text-[11px] tracking-wider">Lớp</th>
                  <th className="text-center px-4 py-3.5 font-bold text-on-surface-variant uppercase text-[11px] tracking-wider">Phụ huynh</th>
                  {isBGH && (
                    <th className="text-center px-4 py-3.5 font-bold text-on-surface-variant uppercase text-[11px] tracking-wider">Thao tác</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {paginatedStudents.map((student, idx) => (
                  <tr
                    key={student.maHS}
                    className={`border-b border-outline-variant/5 hover:bg-primary/5 transition-colors cursor-pointer ${idx % 2 !== 0 ? 'bg-surface-container-low/30' : ''}`}
                    onClick={() => setSelectedStudent(student)}
                  >
                    <td className="px-4 py-3.5">
                      <span className="font-semibold text-on-surface truncate block">{student.maHS}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="font-semibold text-on-surface truncate block">{student.hoTen}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-on-surface-variant text-xs">{formatDate(student.ngaySinh)}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${student.gioiTinh === 'Nam' ? 'bg-blue-100 text-blue-700' : student.gioiTinh === 'Nữ' ? 'bg-pink-100 text-pink-700' : 'bg-gray-100 text-gray-500'}`}>
                        {student.gioiTinh || '—'}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      {student.lop ? (
                        <span className="px-2 py-1 rounded-lg text-xs font-bold bg-primary/10 text-primary">{student.lop.tenLop}</span>
                      ) : (
                        <span className="text-on-surface-variant text-xs">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="font-semibold text-on-surface truncate block">{student.phuHuynh?.hoTen || '—'}</span>
                    </td>
                    {isBGH && (
                      <td className="px-4 py-3.5 text-center" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center gap-1">
                          <button onClick={() => openModal(student)} className="p-1.5 rounded-lg hover:bg-primary/10 text-primary transition-colors" title="Sửa">
                            <span className="material-symbols-outlined text-lg">edit</span>
                          </button>
                          <button onClick={() => handleDelete(student.maHS)} className="p-1.5 rounded-lg hover:bg-error/10 text-error transition-colors" title="Xóa">
                            <span className="material-symbols-outlined text-lg">delete</span>
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-8 py-4 border-t border-outline-variant/10 flex items-center justify-between">
          <p className="text-xs text-on-surface-variant">
            Hiển thị {startIndex + 1}–{Math.min(startIndex + studentsPerPage, students.length)} / {students.length}
          </p>
          <div className="flex items-center gap-1">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-lg hover:bg-surface-container-high disabled:opacity-30 transition-colors">
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i + 1} onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${currentPage === i + 1 ? 'bg-primary text-white shadow-sm' : 'hover:bg-surface-container-high text-on-surface-variant'}`}>
                {i + 1}
              </button>
            ))}
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-lg hover:bg-surface-container-high disabled:opacity-30 transition-colors">
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>
        </div>
      )}

      {/* Detail Panel */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setSelectedStudent(null)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="h-20 bg-gradient-to-r from-primary to-primary-container relative">
              <button onClick={() => setSelectedStudent(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors">
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
            <div className="px-8 pb-8 relative">
              <div className="absolute -top-10 left-8">
                <div className="w-20 h-20 rounded-full border-4 border-white bg-primary-container flex items-center justify-center shadow-lg">
                  <span className="text-3xl font-bold text-white">{selectedStudent.hoTen?.charAt(0)}</span>
                </div>
              </div>
              <div className="pt-14">
                <h3 className="text-2xl font-bold text-on-surface">{selectedStudent.hoTen}</h3>
                <p className="text-sm text-primary font-bold uppercase tracking-wide mt-1">Mã: {selectedStudent.maHS}</p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="p-4 rounded-xl bg-surface-container-low">
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Ngày sinh</p>
                    <p className="text-sm font-semibold text-on-surface">{formatDate(selectedStudent.ngaySinh)}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-container-low">
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Giới tính</p>
                    <p className="text-sm font-semibold text-on-surface">{selectedStudent.gioiTinh || '—'}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-container-low">
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Lớp</p>
                    <p className="text-sm font-semibold text-on-surface">{selectedStudent.lop?.tenLop || '—'}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-container-low">
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Phụ huynh</p>
                    <p className="text-sm font-semibold text-on-surface">{selectedStudent.phuHuynh?.hoTen || '—'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="px-8 py-6 border-b border-outline-variant/10 flex items-center justify-between sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-on-surface">
                {editingStudent ? 'Chỉnh sửa học sinh' : 'Thêm học sinh mới'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-lg hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="px-8 py-6 space-y-5">
              {/* Họ tên */}
              <div>
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wide mb-2">Họ và tên *</label>
                <input type="text" value={formData.hoTen} onChange={(e) => setFormData({ ...formData, hoTen: e.target.value })} required
                  placeholder="Nhập họ và tên học sinh"
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" />
              </div>

              {/* Ngày sinh + Giới tính */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface uppercase tracking-wide mb-2">Ngày sinh</label>
                  <input type="date" value={formData.ngaySinh} onChange={(e) => setFormData({ ...formData, ngaySinh: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface uppercase tracking-wide mb-2">Giới tính</label>
                  <select value={formData.gioiTinh} onChange={(e) => setFormData({ ...formData, gioiTinh: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none">
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                </div>
              </div>

              {/* Lớp học */}
              <div>
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wide mb-2">Lớp học</label>
                <select value={formData.lopId} onChange={(e) => setFormData({ ...formData, lopId: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none">
                  <option value="">— Chưa xếp lớp —</option>
                  {classes.map(c => (
                    <option key={c.maLop} value={c.maLop}>{c.tenLop}</option>
                  ))}
                </select>
              </div>

              {/* Phụ huynh autocomplete */}
              <div>
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wide mb-2">Phụ huynh</label>
                <div className="relative">
                  <input
                    ref={parentInputRef}
                    type="text"
                    value={parentSearch}
                    onChange={(e) => {
                      setParentSearch(e.target.value);
                      setSelectedParent(null);
                      setFormData(prev => ({ ...prev, phuHuynhId: '' }));
                    }}
                    onFocus={() => parentSuggestions.length > 0 && setShowSuggestions(true)}
                    placeholder="Nhập tên phụ huynh để tìm kiếm..."
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none pr-10"
                  />
                  {selectedParent && (
                    <button type="button" onClick={clearParent} className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-error transition-colors">
                      <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                  )}

                  {/* Suggestions dropdown */}
                  {showSuggestions && parentSuggestions.length > 0 && (
                    <div ref={suggestionsRef} className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-outline-variant/20 z-50 overflow-hidden max-h-52 overflow-y-auto">
                      {parentSuggestions.map(p => (
                        <button
                          key={p.maPH}
                          type="button"
                          onClick={() => selectParentSuggestion(p)}
                          className="w-full text-left px-4 py-3 hover:bg-primary/5 transition-colors border-b border-outline-variant/5 last:border-0"
                        >
                          <p className="font-semibold text-on-surface text-sm">{p.hoTen}</p>
                          <p className="text-xs text-on-surface-variant mt-0.5">
                            {p.soDienThoai || p.email || 'Chưa có thông tin liên hệ'}
                          </p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Selected parent info card */}
                {selectedParent && (
                  <div className="mt-2 px-4 py-3 rounded-xl bg-primary/5 border border-primary/20 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-white">{selectedParent.hoTen?.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-primary">{selectedParent.hoTen}</p>
                      {selectedParent.soDienThoai && (
                        <p className="text-xs text-on-surface-variant mt-0.5">📞 {selectedParent.soDienThoai}</p>
                      )}
                    </div>
                    <span className="material-symbols-outlined text-primary ml-auto text-lg">check_circle</span>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-outline-variant text-sm font-semibold text-on-surface-variant hover:bg-surface-container transition-colors">
                  Hủy
                </button>
                <button type="submit"
                  className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all shadow-md active:scale-95">
                  {editingStudent ? 'Cập nhật' : 'Thêm mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
