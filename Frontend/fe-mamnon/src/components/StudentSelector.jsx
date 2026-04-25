import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';

export default function StudentSelector({ onSelect, selectedId }) {
  const { user } = useAuth();
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const res = await api.get('/parents/children', { params: { userId: user?.idND } });
        console.log("Fetched children for parent:", res.data);
        setChildren(res.data);
        if (res.data.length > 0) {
          // If no selectedId or selectedId doesn't exist in new data, select first child
          const exists = res.data.some(c => c.maHS === selectedId);
          if (!selectedId || !exists) {
            console.log("Auto-selecting first child:", res.data[0].hoTen);
            onSelect(res.data[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching children in StudentSelector:", error);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchChildren();
  }, [user]);

  if (loading) return <div className="h-10 w-48 bg-slate-100 animate-pulse rounded-xl" />;
  if (children.length === 0) return null;

  return (
    <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
      <span className="text-[10px] font-bold text-slate-400 uppercase ml-3">Đang xem:</span>
      <div className="flex gap-1">
        {children.length > 1 ? (
          children.map((child) => (
            <button
              key={child.maHS}
              onClick={() => onSelect(child)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedId === child.maHS
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {child.hoTen}
            </button>
          ))
        ) : (
          <span className="px-4 py-2 text-xs font-bold text-slate-700">{children[0].hoTen}</span>
        )}
      </div>
    </div>
  );
}
