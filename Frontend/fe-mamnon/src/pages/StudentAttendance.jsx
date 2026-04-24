import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';

export default function StudentAttendance() {
  const { user, role } = useAuth();
  const isTeacher = role === 'TEACHER';

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [classFilter, setClassFilter] = useState('');
  const [classes, setClasses] = useState([]);

  // Attendance data for the selected date
  const [attendanceMap, setAttendanceMap] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, [classFilter]);

  useEffect(() => {
    if (students.length > 0) {
      fetchAttendanceForDate();
    }
  }, [selectedDate, students]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const params = {
        role: role === 'PRINCIPAL' ? 'BGH' : 'GIAOVIEN',
        userId: user?.idND
      };
      if (classFilter) params.lopId = classFilter;
      const res = await api.get('/students', { params });
      setStudents(res.data);

      // Extract classes
      const uniqueClasses = new Map();
      res.data.forEach(s => {
        if (s.lopId && s.lop) {
          uniqueClasses.set(s.lopId, s.lop.tenLop);
        }
      });
      setClasses(Array.from(uniqueClasses, ([id, name]) => ({ id, name })));
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendanceForDate = async () => {
    try {
      // For each student, check if attendance exists for selected date
      const map = {};
      for (const s of students) {
        const res = await api.get(`/students/${s.maHS}`);
        const record = res.data.diemDanh?.find(d =>
          d.ngay && d.ngay.split('T')[0] === selectedDate
        );
        map[s.maHS] = record ? record.trangThai : 'CoMat';
      }
      setAttendanceMap(map);
    } catch (error) {
      console.error("Error fetching attendance:", error);
      // Default all to CoMat
      const map = {};
      students.forEach(s => { map[s.maHS] = 'CoMat'; });
      setAttendanceMap(map);
    }
  };

  const handleStatusChange = (maHS, status) => {
    setAttendanceMap(prev => ({ ...prev, [maHS]: status }));
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      let teacherId = null;
      try {
        const teacherRes = await api.get(`/students/teacher-id?userId=${user?.idND}`);
        teacherId = teacherRes.data.maGV;
      } catch (err) {
        console.log("Not a teacher, saving without teacher ID");
      }

      for (const s of students) {
        await api.post(`/students/${s.maHS}/attendance`, {
          ngay: new Date(selectedDate).toISOString(),
          trangThai: attendanceMap[s.maHS] || 'CoMat',
          giaoVienId: teacherId
        });
      }
      alert("Lưu điểm danh thành công!");
    } catch (error) {
      console.error("Error saving attendance:", error);
      alert("Lưu thất bại!");
    } finally {
      setSaving(false);
    }
  };

  const statusConfig = {
    CoMat: { label: 'Có mặt', color: 'bg-green-100 text-green-700 border-green-200', icon: 'check_circle' },
    VangCoPhep: { label: 'Vắng có phép', color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: 'event_busy' },
    VangKhongPhep: { label: 'Vắng không phép', color: 'bg-red-100 text-red-700 border-red-200', icon: 'cancel' }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-surface">
      {/* Header */}
      <header className="w-full sticky top-0 z-40 border-b border-outline-variant/20 bg-white/80 backdrop-blur-md flex items-center justify-between px-8 py-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-on-surface">Điểm danh</h2>
          <p className="text-sm text-on-surface-variant mt-0.5">{students.length} học sinh</p>
        </div>
        {isTeacher && (
          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all shadow-md active:scale-95 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-sm">{saving ? 'hourglass_empty' : 'save'}</span>
            {saving ? 'Đang lưu...' : 'Lưu điểm danh'}
          </button>
        )}
      </header>

      {/* Filters */}
      <div className="px-8 py-4 flex gap-4 items-center border-b border-outline-variant/10">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-on-surface-variant">calendar_today</span>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-outline-variant/30 bg-surface-container-lowest text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <select
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-outline-variant/30 bg-surface-container-lowest text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          <option value="">Tất cả lớp</option>
          {classes.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Attendance List */}
      <div className="flex-1 overflow-auto px-8 py-4">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <span className="material-symbols-outlined animate-spin text-4xl text-primary">hourglass_empty</span>
          </div>
        ) : students.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-on-surface-variant">
            <span className="material-symbols-outlined text-6xl mb-4 opacity-20">person_off</span>
            <p className="text-lg">Không có học sinh nào</p>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Summary bar */}
            <div className="flex gap-4 mb-6">
              {Object.entries(statusConfig).map(([key, config]) => {
                const count = Object.values(attendanceMap).filter(v => v === key).length;
                return (
                  <div key={key} className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${config.color}`}>
                    <span className="material-symbols-outlined text-lg">{config.icon}</span>
                    <span className="text-sm font-bold">{count}</span>
                    <span className="text-xs">{config.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Student cards */}
            {students.map((student, idx) => {
              const status = attendanceMap[student.maHS] || 'CoMat';
              return (
                <div
                  key={student.maHS}
                  className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/10 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center">
                      <span className="text-lg font-bold text-white">{student.hoTen?.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-on-surface text-sm">{student.hoTen}</p>
                      <p className="text-xs text-on-surface-variant">{student.lop?.tenLop || '—'}</p>
                    </div>
                  </div>

                  {isTeacher ? (
                    <div className="flex gap-2">
                      {Object.entries(statusConfig).map(([key, config]) => (
                        <button
                          key={key}
                          onClick={() => handleStatusChange(student.maHS, key)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                            status === key
                              ? config.color + ' shadow-sm scale-105'
                              : 'bg-surface-container-low text-on-surface-variant border-outline-variant/20 hover:bg-surface-container-high'
                          }`}
                        >
                          {config.label}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${statusConfig[status]?.color || ''}`}>
                      {statusConfig[status]?.label || status}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
