import { useState, useEffect } from 'react';
import StudentSelector from '../components/StudentSelector';
import api from '../services/api';

export default function ChildProfile() {
  const [selectedChild, setSelectedChild] = useState(null);

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-slate-50">
      <header className="w-full sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md px-8 py-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Thông tin cá nhân của con</h2>
            <p className="text-sm text-slate-500 mt-1 font-medium">Xem thông tin chi tiết hồ sơ của con em tại trường</p>
          </div>
          <StudentSelector onSelect={setSelectedChild} selectedId={selectedChild?.maHS} />
        </div>
      </header>

      <main className="flex-1 overflow-auto p-8">
        {selectedChild ? (
          <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Main Info Card */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="h-32 bg-indigo-600 relative">
                <div className="absolute -bottom-12 left-8">
                  <div className="w-24 h-24 rounded-3xl bg-white p-1 shadow-xl">
                    <div className="w-full h-full rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-3xl">
                      {selectedChild.hoTen.split(' ').pop().charAt(0)}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-16 pb-8 px-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">{selectedChild.hoTen}</h3>
                    <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest mt-1">{selectedChild.maHS}</p>
                  </div>
                  <div className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider">
                    {selectedChild.lop?.tenLop || 'Chưa xếp lớp'}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ngày sinh</p>
                    <p className="text-sm font-bold text-slate-700">
                      {selectedChild.ngaySinh ? new Date(selectedChild.ngaySinh).toLocaleDateString('vi-VN') : '—'}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Giới tính</p>
                    <p className="text-sm font-bold text-slate-700">{selectedChild.gioiTinh || '—'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Giáo viên chủ nhiệm</p>
                    <p className="text-sm font-bold text-slate-700">{selectedChild.lop?.giaoVien?.hoTen || '—'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* School Contact Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                      <span className="material-symbols-outlined">contact_phone</span>
                    </div>
                    <h4 className="font-bold text-slate-800">Liên hệ giáo viên</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-slate-50">
                      <span className="text-xs text-slate-500 font-medium">Họ và tên</span>
                      <span className="text-sm font-bold text-slate-700">{selectedChild.lop?.giaoVien?.hoTen || '—'}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-xs text-slate-500 font-medium">Số điện thoại</span>
                      <span className="text-sm font-bold text-indigo-600">{selectedChild.lop?.giaoVien?.nguoidung_rel?.soDienThoai || '—'}</span>
                    </div>
                  </div>
               </div>

               <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <span className="material-symbols-outlined">meeting_room</span>
                    </div>
                    <h4 className="font-bold text-slate-800">Thông tin lớp học</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-slate-50">
                      <span className="text-xs text-slate-500 font-medium">Tên lớp</span>
                      <span className="text-sm font-bold text-slate-700">{selectedChild.lop?.tenLop || '—'}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-xs text-slate-500 font-medium">Mã lớp</span>
                      <span className="text-sm font-bold text-slate-700">{selectedChild.lop?.maLop || '—'}</span>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-slate-400 italic">Vui lòng chọn học sinh để xem thông tin</p>
          </div>
        )}
      </main>
    </div>
  );
}
