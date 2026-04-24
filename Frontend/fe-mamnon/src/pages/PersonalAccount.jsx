import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';

export default function PersonalAccount() {
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    hoTen: '',
    email: '',
    soDienThoai: '',
    chucVu: '',
    matKhau: ''
  });

  useEffect(() => {
    if (user?.idND) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/users/${user.idND}/profile`);
      setProfile(response.data);
      setFormData({
        hoTen: response.data.hoTen || '',
        email: response.data.email || '',
        soDienThoai: response.data.soDienThoai || '',
        chucVu: response.data.chucVu || '',
        matKhau: ''
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      if (!payload.matKhau) delete payload.matKhau;

      await api.put(`/users/${user.idND}/profile`, payload);
      setIsEditing(false);
      fetchProfile(); // Refresh data
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Cập nhật thất bại. Vui lòng thử lại!");
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[calc(100vh-64px)] bg-surface">
        <span className="material-symbols-outlined animate-spin text-4xl text-primary">hourglass_empty</span>
      </div>
    );
  }

  if (!profile) {
    return <div className="p-8 text-center text-error bg-surface min-h-[calc(100vh-64px)]">Không tìm thấy thông tin tài khoản!</div>;
  }

  // Get avatar initial
  const avatarLetter = profile.hoTen ? profile.hoTen.charAt(0).toUpperCase() : profile.tenDangNhap.charAt(0).toUpperCase();

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-surface">
      {/* Page Content */}
      <div className="p-8 max-w-4xl mx-auto w-full">
        <div className="bg-surface-container-lowest rounded-3xl shadow-xl overflow-hidden border border-outline-variant/10">

          {/* Cover Background */}
          <div className="h-32 bg-gradient-to-r from-primary to-primary-container relative"></div>

          {/* Profile Content */}
          <div className="px-8 pb-8 relative">

            {/* Avatar - overlapping cover */}
            <div className="absolute -top-16 left-8">
              <div className="w-32 h-32 rounded-full border-4 border-white bg-primary-container flex items-center justify-center shadow-lg">
                <span className="text-5xl font-bold text-white">{avatarLetter}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end pt-4 mb-8">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg active:scale-95"
                >
                  <span className="material-symbols-outlined text-sm">edit</span>
                  Chỉnh sửa thông tin
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        hoTen: profile.hoTen || '',
                        email: profile.email || '',
                        soDienThoai: profile.soDienThoai || '',
                        chucVu: profile.chucVu || '',
                        matKhau: ''
                      });
                    }}
                    className="px-5 py-2.5 rounded-xl border border-outline-variant text-sm font-semibold text-on-surface-variant hover:bg-surface-container transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all shadow-md active:scale-95"
                  >
                    Lưu thay đổi
                  </button>
                </div>
              )}
            </div>

            {/* User Info Details */}
            <div className="mt-8">
              {!isEditing ? (
                <div className="animate-in fade-in duration-300">
                  <h3 className="text-3xl font-bold text-on-surface mb-1">
                    {profile.hoTen || <span className="text-outline italic font-normal">Chưa cập nhật họ tên</span>}
                  </h3>
                  <p className="text-primary font-bold flex items-center gap-1.5 mb-8 text-sm uppercase tracking-wide">
                    <span className="material-symbols-outlined text-[18px]">badge</span>
                    {profile.vaiTro}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/10 flex items-start gap-4 hover:shadow-sm transition-shadow">
                      <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                        <span className="material-symbols-outlined">person</span>
                      </div>
                      <div>
                        <p className="text-left text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Tên đăng nhập</p>
                        <p className="text-on-surface font-semibold text-sm text-left w-full">{profile.tenDangNhap}</p>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/10 flex items-start gap-4 hover:shadow-sm transition-shadow">
                      <div className="w-10 h-10 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary shrink-0">
                        <span className="material-symbols-outlined">mail</span>
                      </div>
                      <div>
                        <p className="text-left text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Email</p>
                        <p className="text-on-surface font-semibold text-sm text-left w-full">{profile.email || 'Chưa cập nhật'}</p>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/10 flex items-start gap-4 hover:shadow-sm transition-shadow">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <span className="material-symbols-outlined">call</span>
                      </div>
                      <div>
                        <p className="text-left text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Số điện thoại</p>
                        <p className="text-on-surface font-semibold text-sm text-left w-full">{profile.soDienThoai || 'Chưa cập nhật'}</p>
                      </div>
                    </div>

                    {profile.vaiTro === 'BGH' && (
                      <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/10 flex items-start gap-4 hover:shadow-sm transition-shadow">
                        <div className="w-10 h-10 rounded-full bg-error-container/30 flex items-center justify-center text-error shrink-0">
                          <span className="material-symbols-outlined">work</span>
                        </div>
                        <div>
                          <p className="text-left text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Chức vụ</p>
                          <p className="text-on-surface font-semibold text-sm text-left w-full">{profile.chucVu || 'Chưa cập nhật'}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <form className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-on-surface uppercase tracking-wide mb-2">Họ và tên</label>
                      <input
                        type="text"
                        value={formData.hoTen}
                        onChange={(e) => setFormData({ ...formData, hoTen: e.target.value })}
                        placeholder="Nhập họ và tên đầy đủ"
                        className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-on-surface uppercase tracking-wide mb-2 opacity-50">Tên đăng nhập (Không thể sửa)</label>
                      <input
                        type="text"
                        value={profile.tenDangNhap}
                        disabled
                        className="w-full px-4 py-3 rounded-xl border border-outline-variant/20 bg-surface-container-low text-on-surface-variant opacity-70 cursor-not-allowed outline-none font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-on-surface uppercase tracking-wide mb-2">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="example@domain.com"
                        className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-on-surface uppercase tracking-wide mb-2">Số điện thoại</label>
                      <input
                        type="tel"
                        value={formData.soDienThoai}
                        onChange={(e) => setFormData({ ...formData, soDienThoai: e.target.value })}
                        placeholder="0912345678"
                        className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                      />
                    </div>

                    {profile.vaiTro === 'BGH' && (
                      <div>
                        <label className="block text-xs font-bold text-on-surface uppercase tracking-wide mb-2">Chức vụ</label>
                        <input
                          type="text"
                          value={formData.chucVu}
                          onChange={(e) => setFormData({ ...formData, chucVu: e.target.value })}
                          placeholder="Nhập chức vụ (VD: Hiệu trưởng)"
                          className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                        />
                      </div>
                    )}

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-on-surface uppercase tracking-wide mb-2">
                        Mật khẩu mới <span className="text-[10px] font-normal text-on-surface-variant ml-2 normal-case tracking-normal">(Bỏ trống nếu không đổi)</span>
                      </label>
                      <input
                        type="password"
                        value={formData.matKhau}
                        onChange={(e) => setFormData({ ...formData, matKhau: e.target.value })}
                        placeholder="••••••••"
                        className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                      />
                    </div>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
