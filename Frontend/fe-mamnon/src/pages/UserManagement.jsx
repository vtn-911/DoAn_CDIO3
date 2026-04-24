import { useState, useEffect } from 'react';
import api from '../services/api';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 7;

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    tenDangNhap: '',
    email: '',
    soDienThoai: '',
    matKhau: '',
    vaiTro: 'GIAOVIEN'
  });

  useEffect(() => {
    // Debounce for search
    setCurrentPage(1);
    const delayDebounceFn = setTimeout(() => {
      fetchUsers();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [search, roleFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users', {
        params: { search, role: roleFilter }
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (user = null) => {
    setEditingUser(user);
    if (user) {
      setFormData({
        tenDangNhap: user.tenDangNhap,
        email: user.email || '',
        soDienThoai: user.soDienThoai || '',
        matKhau: '', // don't show password
        vaiTro: user.vaiTro
      });
    } else {
      setFormData({
        tenDangNhap: '',
        email: '',
        soDienThoai: '',
        matKhau: '',
        vaiTro: 'GIAOVIEN'
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        // Update
        const payload = { ...formData };
        if (!payload.matKhau) delete payload.matKhau;
        await api.put(`/users/${editingUser.idND}`, payload);
      } else {
        // Create
        await api.post('/users', formData);
      }
      closeModal();
      fetchUsers(); // refresh list
    } catch (error) {
      console.error("Error saving user:", error);
      alert("Error saving user. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await api.delete(`/users/${id}`);
        setUsers(users.filter(u => u.idND !== id));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const getRoleBadgeClass = (role) => {
    switch (role) {
      case 'ADMIN':
      case 'BGH':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'GIAOVIEN':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'TAICHINH':
      case 'PHUHUYNH':
      default:
        return 'bg-orange-50 text-orange-700 border-orange-200';
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 relative">
      {/* TopAppBar (Shared Component) */}
      <header className="w-full sticky top-0 z-40 border-b border-slate-100 dark:border-slate-800 shadow-sm dark:shadow-none bg-white dark:bg-slate-900 flex items-center justify-between px-6 py-3 font-inter antialiased">
        <div className="flex items-center gap-8">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Tài khoản người dùng</h2>
          <div className="relative w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                search
              </span>
            </div>            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              placeholder="Search accounts, names, or emails..."
              type="text"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => openModal()}
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-container transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              Add User
            </button>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <div className="p-8 space-y-8 bg-surface text-on-surface min-h-[calc(100vh-64px)]">
        {/* Filter Area */}
        <div className="flex items-end justify-end mb-4">
          <div className="flex items-center gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-on-surface-variant uppercase ml-1">Role Filter</label>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="bg-surface-container-lowest border border-outline-variant/30 text-sm rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary/10"
              >
                <option value="All Roles">All Roles</option>
                <option value="ADMIN">Admin</option>
                <option value="BGH">BGH</option>
                <option value="GIAOVIEN">Giáo viên</option>
                <option value="TAICHINH">Tài chính</option>
                <option value="PHUHUYNH">Phụ huynh</option>
              </select>
            </div>
            {/* Status Filter left as mock for visual consistency */}

            <button className="mt-5 p-2 bg-surface-container-high rounded-lg text-on-surface-variant hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined">filter_list</span>
            </button>
          </div>
        </div>

        {/* Main Data Table Container */}
        <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm border border-outline-variant/10">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-high">
              <tr>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-on-surface-variant w-16">Avatar</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">User Profile</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Access Role</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Số điện thoại</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-on-surface-variant text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-on-surface-variant">Loading users...</td>
                </tr>
              ) : currentUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-on-surface-variant">No users found.</td>
                </tr>
              ) : (
                currentUsers.map(user => (
                  <tr key={user.idND} className="hover:bg-surface-container-low transition-colors group">
                    <td className="px-6 py-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {user.tenDangNhap ? user.tenDangNhap[0].toUpperCase() : 'U'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-on-surface">{user.tenDangNhap}</span>
                        <span className="text-xs text-on-surface-variant">{user.email || 'No email'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight border ${getRoleBadgeClass(user.vaiTro)}`}>
                        {user.vaiTro}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-on-surface">
                        {user.soDienThoai || 'Chưa cập nhật'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openModal(user)}
                          className="p-1.5 text-on-surface-variant hover:text-primary transition-colors hover:bg-white rounded-md border border-transparent hover:border-outline-variant/20"
                        >
                          <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(user.idND)}
                          className="p-1.5 text-on-surface-variant hover:text-error transition-colors hover:bg-white rounded-md border border-transparent hover:border-outline-variant/20"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="px-6 py-4 bg-surface-container-low flex items-center justify-between">
            <span className="text-xs text-on-surface-variant">
              Showing {users.length === 0 ? 0 : indexOfFirstUser + 1} to {Math.min(indexOfLastUser, users.length)} of {users.length} users
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg text-on-surface-variant hover:bg-white transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${currentPage === number ? 'bg-primary text-white font-bold' : 'hover:bg-white text-on-surface-variant'}`}
                >
                  {number}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-2 rounded-lg text-on-surface-variant hover:bg-white transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
            <h3 className="text-xl font-bold mb-4">{editingUser ? 'Edit User' : 'Add User'}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Tên đăng nhập</label>
                <input
                  required
                  value={formData.tenDangNhap}
                  onChange={e => setFormData({ ...formData, tenDangNhap: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                <input
                  type="tel"
                  required
                  value={formData.soDienThoai}
                  onChange={e => setFormData({ ...formData, soDienThoai: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Mật khẩu {editingUser && <span className="text-xs text-slate-400 font-normal">(Bỏ trống nếu không đổi)</span>}</label>
                <input
                  type="password"
                  required={!editingUser}
                  value={formData.matKhau}
                  onChange={e => setFormData({ ...formData, matKhau: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Vai trò</label>
                <select
                  value={formData.vaiTro}
                  onChange={e => setFormData({ ...formData, vaiTro: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                >
                  <option value="ADMIN">Admin</option>
                  <option value="BGH">BGH</option>
                  <option value="GIAOVIEN">Giáo viên</option>
                  <option value="TAICHINH">Tài chính</option>
                  <option value="PHUHUYNH">Phụ huynh</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
                <button type="button" onClick={closeModal} className="px-4 py-2 border border-slate-200 rounded-lg text-sm hover:bg-slate-50 font-medium">Hủy</button>
                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-blue-700">Lưu</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
