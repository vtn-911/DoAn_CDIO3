import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';

export default function TeacherManagement() {
  const { user, role } = useAuth();
  const isBGH = role === 'PRINCIPAL' || role === 'BGH';

  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const teachersPerPage = 7;

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [formData, setFormData] = useState({
    hoTen: '', tenDangNhap: '', email: '', soDienThoai: '',
    ngaySinh: '', gioiTinh: 'Nam', diaChi: '', chuyenMon: ''
  });

  // Assign Class Modal
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');

  // Schedule Modal
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [teacherSchedule, setTeacherSchedule] = useState([]);
  const [newScheduleItem, setNewScheduleItem] = useState({
    thu: 2, caHoc: 'Sáng', monHoc: '', maLop: ''
  });

  useEffect(() => {
    fetchTeachers();
  }, [search]);

  useEffect(() => {
    if (isBGH) fetchClasses();
  }, [role, user]);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/teachers', { params: { search } });
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchClasses = async () => {
    try {
      const res = await api.get('/classes', { params: { role, userId: user?.idND } });
      setClasses(res.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const openModal = (teacher = null) => {
    setEditingTeacher(teacher);
    if (teacher) {
      setFormData({
        hoTen: teacher.hoTen || '',
        tenDangNhap: teacher.nguoidung_rel?.tenDangNhap || '',
        email: teacher.nguoidung_rel?.email || '',
        soDienThoai: teacher.nguoidung_rel?.soDienThoai || '',
        ngaySinh: teacher.ngaySinh ? teacher.ngaySinh.split('T')[0] : '',
        gioiTinh: teacher.gioiTinh || 'Nam',
        diaChi: teacher.diaChi || '',
        chuyenMon: teacher.chuyenMon || ''
      });
    } else {
      setFormData({
        hoTen: '', tenDangNhap: '', email: '', soDienThoai: '',
        ngaySinh: '', gioiTinh: 'Nam', diaChi: '', chuyenMon: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTeacher) {
        await api.put(`/teachers/${editingTeacher.maGV}`, formData);
      } else {
        await api.post('/teachers', formData);
      }
      setIsModalOpen(false);
      fetchTeachers();
    } catch (error) {
      console.error("Error saving teacher:", error);
      alert(error.response?.data?.error || "Lưu thất bại!");
    }
  };

  const handleDelete = async (maGV) => {
    if (!confirm("Bạn có chắc muốn xóa giáo viên này? Hồ sơ người dùng liên quan cũng sẽ bị xóa.")) return;
    try {
      await api.delete(`/teachers/${maGV}`);
      fetchTeachers();
    } catch (error) {
      console.error("Error deleting teacher:", error);
      alert(error.response?.data?.error || "Xóa thất bại! Vui lòng thử lại.");
    }
  };

  const openAssignModal = (teacher) => {
    setEditingTeacher(teacher);
    setSelectedClass('');
    setIsAssignModalOpen(true);
  };

  const handleAssignClass = async () => {
    if (!selectedClass) return;
    try {
      await api.post('/teachers/assign-class', {
        maGV: editingTeacher.maGV,
        maLop: selectedClass
      });
      setIsAssignModalOpen(false);
      fetchTeachers();
    } catch (error) {
      console.error("Error assigning class:", error);
    }
  };

  const openScheduleModal = async (teacher) => {
    setEditingTeacher(teacher);
    try {
      const res = await api.get(`/teachers/${teacher.maGV}`);
      setTeacherSchedule(res.data.lichGiangDay || []);
      setIsScheduleModalOpen(true);
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };

  const handleAddScheduleItem = () => {
    if (!newScheduleItem.maLop) return;
    setTeacherSchedule([...teacherSchedule, { ...newScheduleItem, id: Date.now().toString() }]);
    setNewScheduleItem({ thu: 2, caHoc: 'Sáng', monHoc: '', maLop: '' });
  };

  const handleRemoveScheduleItem = (id) => {
    setTeacherSchedule(teacherSchedule.filter(item => item.id !== id));
  };

  const handleSaveSchedule = async () => {
    try {
      await api.post(`/teachers/${editingTeacher.maGV}/schedule`, {
        schedule: teacherSchedule
      });
      setIsScheduleModalOpen(false);
    } catch (error) {
      console.error("Error saving schedule:", error);
    }
  };

  const totalPages = Math.ceil(teachers.length / teachersPerPage);
  const startIndex = (currentPage - 1) * teachersPerPage;
  const paginatedTeachers = teachers.slice(startIndex, startIndex + teachersPerPage);

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('vi-VN');
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-surface">
      {/* Header */}
      <header className="w-full sticky top-0 z-40 border-b border-outline-variant/20 bg-white/80 backdrop-blur-md flex items-center justify-between px-8 py-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-on-surface">Quản lý giáo viên</h2>
          <p className="text-sm text-on-surface-variant mt-0.5">{teachers.length} giáo viên</p>
        </div>
        {isBGH && (
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <span className="material-symbols-outlined text-sm">person_add</span>
            Thêm giáo viên
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
            placeholder="Tìm kiếm theo tên giáo viên..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/30 bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto px-8 py-4">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <span className="material-symbols-outlined animate-spin text-4xl text-primary">hourglass_empty</span>
          </div>
        ) : paginatedTeachers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-on-surface-variant">
            <span className="material-symbols-outlined text-6xl mb-4 opacity-20">person_off</span>
            <p className="text-lg">Không tìm thấy giáo viên nào</p>
          </div>
        ) : (
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 overflow-hidden shadow-sm">
            <table className="w-full text-sm table-fixed">
              {/* Giữ nguyên colgroup đã sửa ở trên */}
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant/10">
                  <th className="text-center px-4 py-3.5 font-bold text-on-surface-variant uppercase text-[11px] tracking-wider">Mã GV</th>
                  {/* Họ tên nên text-left cho dễ đọc */}
                  <th className="text-left px-4 py-3.5 font-bold text-on-surface-variant uppercase text-[11px] tracking-wider">Họ và tên</th>
                  <th className="text-center px-4 py-3.5 font-bold text-on-surface-variant uppercase text-[11px] tracking-wider">Chuyên môn</th>
                  <th className="text-center px-4 py-3.5 font-bold text-on-surface-variant uppercase text-[11px] tracking-wider">Số điện thoại</th>
                  <th className="text-center px-4 py-3.5 font-bold text-on-surface-variant uppercase text-[11px] tracking-wider">Lớp phụ trách</th>
                  <th className="text-center px-4 py-3.5 font-bold text-on-surface-variant uppercase text-[11px] tracking-wider">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTeachers.map((teacher, idx) => (
                  <tr key={teacher.maGV} className="border-b border-outline-variant/5 hover:bg-primary/5 transition-colors">
                    <td className="px-4 py-3.5 text-center">
                      <span className="font-mono font-bold text-primary text-xs bg-primary/5 px-2 py-1 rounded">
                        {teacher.maGV}
                      </span>
                    </td>

                    {/* Họ tên căn trái + Avatar giả (nếu muốn đẹp hơn) */}
                    <td className="px-4 py-3.5 text-left">
                      <div className="flex flex-col">
                        <span className="font-semibold text-on-surface leading-none mb-1">{teacher.hoTen}</span>
                        <span className="text-[10px] text-on-surface-variant italic opacity-70">@{teacher.nguoidung_rel?.tenDangNhap}</span>
                      </div>
                    </td>

                    <td className="px-4 py-3.5 text-center text-on-surface-variant">
                      {teacher.chuyenMon || '—'}
                    </td>

                    <td className="px-4 py-3.5 text-center font-medium text-on-surface-variant">
                      {teacher.nguoidung_rel?.soDienThoai || '—'}
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex flex-wrap gap-1 justify-center">
                        {teacher.lopHoc?.length > 0 ? (
                          teacher.lopHoc.map(l => (
                            <span key={l.maLop} className="px-2 py-0.5 rounded bg-secondary/10 text-secondary text-[10px] font-bold border border-secondary/20">
                              {l.tenLop}
                            </span>
                          ))
                        ) : (
                          <span className="text-outline/50">--</span>
                        )}
                      </div>
                    </td>

                    {/* Cột thao tác: dùng flex-nowrap để không bao giờ bị rớt dòng */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center justify-center gap-1 flex-nowrap">
                        {isBGH && (
                          <>
                            <button onClick={() => openAssignModal(teacher)} className="p-1.5 rounded-md hover:bg-blue-100 text-blue-600 transition-colors" title="Phân công">
                              <span className="material-symbols-outlined text-[18px]">assignment_ind</span>
                            </button>
                            <button onClick={() => openScheduleModal(teacher)} className="p-1.5 rounded-md hover:bg-amber-100 text-amber-600 transition-colors" title="Lịch">
                              <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                            </button>
                            <button onClick={() => openModal(teacher)} className="p-1.5 rounded-md hover:bg-emerald-100 text-emerald-600 transition-colors" title="Sửa">
                              <span className="material-symbols-outlined text-[18px]">edit</span>
                            </button>
                            <button onClick={() => handleDelete(teacher.maGV)} className="p-1.5 rounded-md hover:bg-red-100 text-red-600 transition-colors" title="Xóa">
                              <span className="material-symbols-outlined text-[18px]">delete</span>
                            </button>
                          </>
                        )}
                      </div>
                    </td>
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
            Hiển thị {startIndex + 1}–{Math.min(startIndex + teachersPerPage, teachers.length)} / {teachers.length}
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

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="px-8 py-6 border-b border-outline-variant/10 flex items-center justify-between sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-on-surface">
                {editingTeacher ? 'Chỉnh sửa hồ sơ giáo viên' : 'Thêm giáo viên mới'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-lg hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                {/* Column 1: Personal Info */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-primary uppercase tracking-widest">Thông tin cá nhân</h4>
                  <div>
                    <label className="block text-[10px] font-bold text-on-surface-variant uppercase mb-1.5">Họ và tên *</label>
                    <input type="text" value={formData.hoTen} onChange={(e) => setFormData({ ...formData, hoTen: e.target.value })} required
                      className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/50 bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-on-surface-variant uppercase mb-1.5">Ngày sinh</label>
                      <input type="date" value={formData.ngaySinh} onChange={(e) => setFormData({ ...formData, ngaySinh: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/50 bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-on-surface-variant uppercase mb-1.5">Giới tính</label>
                      <select value={formData.gioiTinh} onChange={(e) => setFormData({ ...formData, gioiTinh: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/50 bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm">
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-on-surface-variant uppercase mb-1.5">Địa chỉ</label>
                    <textarea value={formData.diaChi} onChange={(e) => setFormData({ ...formData, diaChi: e.target.value })} rows={2}
                      className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/50 bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm resize-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-on-surface-variant uppercase mb-1.5">Chuyên môn</label>
                    <input type="text" value={formData.chuyenMon} onChange={(e) => setFormData({ ...formData, chuyenMon: e.target.value })}
                      placeholder="VD: Sư phạm mầm non"
                      className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/50 bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm" />
                  </div>
                </div>

                {/* Column 2: Account Info */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-primary uppercase tracking-widest">Thông tin tài khoản</h4>
                  {!editingTeacher && (
                    <div>
                      <label className="block text-[10px] font-bold text-on-surface-variant uppercase mb-1.5">Tên đăng nhập *</label>
                      <input type="text" value={formData.tenDangNhap} onChange={(e) => setFormData({ ...formData, tenDangNhap: e.target.value })} required
                        className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/50 bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm" />
                    </div>
                  )}
                  <div>
                    <label className="block text-[10px] font-bold text-on-surface-variant uppercase mb-1.5">Email</label>
                    <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/50 bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-on-surface-variant uppercase mb-1.5">Số điện thoại</label>
                    <input type="text" value={formData.soDienThoai} onChange={(e) => setFormData({ ...formData, soDienThoai: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/50 bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm" />
                  </div>
                  {editingTeacher && (
                    <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20">
                      <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-1">Mã giáo viên</p>
                      <p className="text-sm font-mono font-bold text-primary">{editingTeacher.maGV}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/10">
                <button type="button" onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-outline-variant text-sm font-semibold text-on-surface-variant hover:bg-surface-container transition-colors">
                  Hủy
                </button>
                <button type="submit"
                  className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all shadow-md active:scale-95">
                  {editingTeacher ? 'Cập nhật' : 'Thêm mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign Class Modal */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setIsAssignModalOpen(false)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="px-8 py-6 border-b border-outline-variant/10">
              <h3 className="text-xl font-bold text-on-surface">Phân công lớp học</h3>
              <p className="text-sm text-on-surface-variant mt-1">Giao giáo viên {editingTeacher?.hoTen} phụ trách lớp</p>
            </div>
            <div className="px-8 py-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase mb-2">Chọn lớp học</label>
                <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm">
                  <option value="">— Chọn lớp —</option>
                  {classes.map(c => (
                    <option key={c.maLop} value={c.maLop}>{c.tenLop}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setIsAssignModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-outline-variant text-sm font-semibold text-on-surface-variant hover:bg-surface-container transition-colors">
                  Hủy
                </button>
                <button onClick={handleAssignClass} disabled={!selectedClass}
                  className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all shadow-md disabled:opacity-50">
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Modal */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setIsScheduleModalOpen(false)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl mx-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="px-8 py-6 border-b border-outline-variant/10 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-on-surface">Lịch giảng dạy</h3>
                <p className="text-sm text-on-surface-variant mt-1">Giáo viên: {editingTeacher?.hoTen}</p>
              </div>
              <button onClick={() => setIsScheduleModalOpen(false)} className="p-1.5 rounded-lg hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="px-8 py-6 max-h-[70vh] overflow-y-auto">
              {/* Add New Schedule Item */}
              <div className="grid grid-cols-5 gap-3 mb-6 p-4 bg-surface-container-low rounded-2xl border border-outline-variant/10 items-end">
                <div>
                  <label className="block text-[10px] font-bold uppercase mb-1">Thứ</label>
                  <select value={newScheduleItem.thu} onChange={(e) => setNewScheduleItem({ ...newScheduleItem, thu: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-outline-variant/50 text-sm">
                    {[2, 3, 4, 5, 6, 7, 8].map(t => <option key={t} value={t}>{t === 8 ? 'Chủ nhật' : `Thứ ${t}`}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase mb-1">Ca học</label>
                  <select value={newScheduleItem.caHoc} onChange={(e) => setNewScheduleItem({ ...newScheduleItem, caHoc: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-outline-variant/50 text-sm">
                    <option value="Sáng">Sáng</option>
                    <option value="Chiều">Chiều</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase mb-1">Môn học</label>
                  <input type="text" value={newScheduleItem.monHoc} onChange={(e) => setNewScheduleItem({ ...newScheduleItem, monHoc: e.target.value })}
                    placeholder="VD: Múa" className="w-full px-3 py-2 rounded-lg border border-outline-variant/50 text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase mb-1">Lớp</label>
                  <select value={newScheduleItem.maLop} onChange={(e) => setNewScheduleItem({ ...newScheduleItem, maLop: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-outline-variant/50 text-sm">
                    <option value="">— Lớp —</option>
                    {classes.map(c => <option key={c.maLop} value={c.maLop}>{c.tenLop}</option>)}
                  </select>
                </div>
                <button onClick={handleAddScheduleItem} className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center">
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>

              {/* Schedule Table */}
              <div className="border border-outline-variant/10 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-surface-container-low">
                    <tr>
                      <th className="px-4 py-2 text-left text-[11px] uppercase font-bold text-on-surface-variant">Thứ</th>
                      <th className="px-4 py-2 text-left text-[11px] uppercase font-bold text-on-surface-variant">Ca</th>
                      <th className="px-4 py-2 text-left text-[11px] uppercase font-bold text-on-surface-variant">Môn</th>
                      <th className="px-4 py-2 text-left text-[11px] uppercase font-bold text-on-surface-variant">Lớp</th>
                      <th className="px-4 py-2 text-center text-[11px] uppercase font-bold text-on-surface-variant">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teacherSchedule.length === 0 ? (
                      <tr><td colSpan={5} className="px-4 py-8 text-center text-on-surface-variant opacity-50">Chưa có lịch giảng dạy</td></tr>
                    ) : (
                      [...teacherSchedule].sort((a, b) => a.thu - b.thu).map((item, idx) => (
                        <tr key={item.id || idx} className="border-t border-outline-variant/10">
                          <td className="px-4 py-2 font-semibold">{item.thu === 8 ? 'Chủ nhật' : `Thứ ${item.thu}`}</td>
                          <td className="px-4 py-2">{item.caHoc}</td>
                          <td className="px-4 py-2">{item.monHoc || '—'}</td>
                          <td className="px-4 py-2">{item.lop?.tenLop || classes.find(c => c.maLop === item.maLop)?.tenLop || '—'}</td>
                          <td className="px-4 py-2 text-center">
                            <button onClick={() => handleRemoveScheduleItem(item.id)} className="text-error hover:bg-error/10 p-1 rounded">
                              <span className="material-symbols-outlined text-lg">delete</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="px-8 py-4 bg-surface-container-low border-t border-outline-variant/10 flex justify-end gap-3">
              <button onClick={() => setIsScheduleModalOpen(false)} className="px-5 py-2 text-sm font-semibold text-on-surface-variant">Hủy</button>
              <button onClick={handleSaveSchedule} className="px-5 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all shadow-md active:scale-95">Lưu lịch dạy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
