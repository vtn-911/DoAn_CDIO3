import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const { login, loading, error } = useAuth();
  const [tenDangNhap, setTenDangNhap] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tenDangNhap || !matKhau) return;

    setLoginError('');
    try {
      await login(tenDangNhap, matKhau);
    } catch (err) {
      setLoginError(err.message);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary via-primary-container to-surface">
      <div className="w-full max-w-md">
        <div className="bg-surface-container-lowest rounded-2xl shadow-2xl overflow-hidden">
          <div className="px-8 pt-12 pb-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
                <span className="material-symbols-outlined text-white text-5xl">school</span>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-on-surface mb-2">Mầm Non Plus</h1>
            <p className="text-sm text-on-surface-variant">Admin Management System</p>
          </div>

          <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-5">
            {loginError && (
              <div className="p-3 rounded-lg bg-error-container text-error text-sm">
                ❌ {loginError}
              </div>
            )}

            <div className="relative">
              <label className="block text-xs font-bold text-on-surface uppercase tracking-wide mb-2">
                Tên đăng nhập
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-xl">person</span>
                <input
                  type="text"
                  value={tenDangNhap}
                  onChange={(e) => setTenDangNhap(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-outline bg-surface text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-xs font-bold text-on-surface uppercase tracking-wide mb-2">
                Mật khẩu
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-xl">lock</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={matKhau}
                  onChange={(e) => setMatKhau(e.target.value)}
                  placeholder="Nhập mật khẩu"
                  className="w-full pl-12 pr-12 py-3 rounded-lg border border-outline bg-surface text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-on-surface-variant hover:text-on-surface transition-colors"
                  disabled={loading}
                >
                  <span className="material-symbols-outlined text-xl">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !tenDangNhap || !matKhau}
              className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold uppercase tracking-wide hover:shadow-lg active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-xl">hourglass_empty</span>
                  Đang đăng nhập...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-xl">login</span>
                  Đăng nhập
                </>
              )}
            </button>
          </form>

          <div className="px-8 pb-8 pt-6 border-t border-outline-variant bg-surface-container-low">
            <p className="text-xs font-bold text-on-surface uppercase tracking-wide mb-3">
              📋 Tài khoản demo
            </p>
            <div className="space-y-2 text-xs text-on-surface-variant">
              <p><span className="font-semibold">Admin:</span> admin / 123456</p>
              <p><span className="font-semibold">Ban giám hiệu:</span> bgh1 / 123456</p>
              <p><span className="font-semibold">Giáo viên:</span> giaovien1 / 123456</p>
              <p><span className="font-semibold">Tài chính:</span> taichinh1 / 123456</p>
              <p><span className="font-semibold">Phụ huynh:</span> phuhuynh1 / 123456</p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-surface opacity-90">
          <p>Mầm Non Plus - Kindergarten Management System</p>
        </div>
      </div>
    </div>
  );
}