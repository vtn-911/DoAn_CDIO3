import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedRole = localStorage.getItem('role');
    if (savedUser && savedRole) {
      setUser(JSON.parse(savedUser));
      setRole(savedRole);
    }
  }, []);

  const login = async (tenDangNhap, matKhau) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/login', { tenDangNhap, matKhau });
      const userData = response.data;
      
      setUser(userData);
      setRole(userData.vaiTro);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('role', userData.vaiTro);
      return userData;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Login failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };


  const logout = () => {
    setUser(null);
    setRole(null);
    setError(null);
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
