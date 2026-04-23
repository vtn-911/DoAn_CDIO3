import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('ADMIN');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsLoading(true);
    setTimeout(() => {
      login({ email, name: email.split('@')[0] }, role);
      setIsLoading(false);
    }, 500);
  };

  const roles = [
    { value: 'ADMIN', label: 'Admin', icon: 'admin_panel_settings' },
    { value: 'PRINCIPAL', label: 'Principal', icon: 'domain' },
    { value: 'TEACHER', label: 'Teacher', icon: 'school' },
    { value: 'FINANCE', label: 'Finance', icon: 'receipt_long' },
    { value: 'PARENT', label: 'Parent', icon: 'family_restroom' },
  ];

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
            <div className="relative">
              <label className="block text-xs font-bold text-on-surface uppercase tracking-wide mb-2">
                Email Address
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-xl">mail</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@mamnon.edu.vn"
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-outline bg-surface text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-xs font-bold text-on-surface uppercase tracking-wide mb-2">
                Password
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-xl">lock</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3 rounded-lg border border-outline bg-surface text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface uppercase tracking-wide mb-2">
                Select Role
              </label>
              <div className="grid grid-cols-5 gap-2">
                {roles.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRole(r.value)}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-200 ${
                      role === r.value
                        ? 'bg-primary text-on-primary shadow-md'
                        : 'bg-surface-container text-on-surface border border-outline hover:border-primary'
                    }`}
                    title={r.label}
                  >
                    <span className="material-symbols-outlined text-2xl mb-1">{r.icon}</span>
                    <span className="text-xs font-bold">{r.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold uppercase tracking-wide hover:shadow-lg active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-xl">hourglass_empty</span>
                  Signing in...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-xl">login</span>
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="px-8 pb-8 pt-6 border-t border-outline-variant">
            <p className="text-xs font-bold text-on-surface uppercase tracking-wide mb-3">
              📋 Demo Credentials
            </p>
            <div className="grid grid-cols-1 gap-2">
              <button
                type="button"
                onClick={() => {
                  setEmail('admin@mamnon.edu.vn');
                  setPassword('admin123');
                  setRole('ADMIN');
                }}
                className="text-left px-4 py-2 rounded-lg bg-surface-container hover:bg-primary hover:text-on-primary text-sm transition-all"
              >
                <span className="font-semibold">👤 Admin</span>
                <span className="text-xs opacity-75 block">admin@mamnon.edu.vn</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmail('principal@mamnon.edu.vn');
                  setPassword('principal123');
                  setRole('PRINCIPAL');
                }}
                className="text-left px-4 py-2 rounded-lg bg-surface-container hover:bg-primary hover:text-on-primary text-sm transition-all"
              >
                <span className="font-semibold">🏫 Principal</span>
                <span className="text-xs opacity-75 block">principal@mamnon.edu.vn</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmail('teacher@mamnon.edu.vn');
                  setPassword('teacher123');
                  setRole('TEACHER');
                }}
                className="text-left px-4 py-2 rounded-lg bg-surface-container hover:bg-primary hover:text-on-primary text-sm transition-all"
              >
                <span className="font-semibold">👨‍🏫 Teacher</span>
                <span className="text-xs opacity-75 block">teacher@mamnon.edu.vn</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmail('finance@mamnon.edu.vn');
                  setPassword('finance123');
                  setRole('FINANCE');
                }}
                className="text-left px-4 py-2 rounded-lg bg-surface-container hover:bg-primary hover:text-on-primary text-sm transition-all"
              >
                <span className="font-semibold">💰 Finance</span>
                <span className="text-xs opacity-75 block">finance@mamnon.edu.vn</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmail('parent@mamnon.edu.vn');
                  setPassword('parent123');
                  setRole('PARENT');
                }}
                className="text-left px-4 py-2 rounded-lg bg-surface-container hover:bg-primary hover:text-on-primary text-sm transition-all"
              >
                <span className="font-semibold">👨‍👩‍👧 Parent</span>
                <span className="text-xs opacity-75 block">parent@mamnon.edu.vn</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-surface opacity-90">
          <p>Scholar Metric - Kindergarten Management System</p>
        </div>
      </div>
    </div>
  );
}