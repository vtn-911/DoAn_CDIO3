import { useState } from 'react';
import { MainLayout } from '../components/Layout/MainLayout';
import UserManagement from './UserManagement';

import PersonalAccount from './PersonalAccount';
import StudentManagement from './StudentManagement';
import StudentAcademicRecord from './StudentAcademicRecord';
import StudentAttendance from './StudentAttendance';

export default function Dashboard() {
  const [activeItem, setActiveItem] = useState(null);

  const renderContent = () => {
    switch (activeItem?.id) {
      case 'user-accounts': return <UserManagement />;
      case 'accounts': return <PersonalAccount />;
      case 'my-account': return <PersonalAccount />;
      case 'student-info': return <StudentManagement />;
      case 'student-academic': return <StudentAcademicRecord />;
      case 'student-attendance': return <StudentAttendance />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <span className="material-symbols-outlined text-6xl mb-4 opacity-20">dashboard</span>
            <p className="text-lg">Dashboard Content Placeholder</p>
            <p className="text-sm mt-2">Select menu item from sidebar to view content</p>
          </div>
        );
    }
  };

  return (
    <MainLayout activeItem={activeItem} onItemClick={setActiveItem}>
      {renderContent()}
    </MainLayout>
  );
}
