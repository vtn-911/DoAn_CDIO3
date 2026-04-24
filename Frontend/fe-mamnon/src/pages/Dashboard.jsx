import { useState } from 'react';
import { MainLayout } from '../components/Layout/MainLayout';
import UserManagement from './UserManagement';

import PersonalAccount from './PersonalAccount';

export default function Dashboard() {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <MainLayout activeItem={activeItem} onItemClick={setActiveItem}>
      {activeItem?.id === 'user-accounts' ? (
        <UserManagement />
      ) : activeItem?.id === 'my-account' ? (
        <PersonalAccount />
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-slate-400">
          <span className="material-symbols-outlined text-6xl mb-4 opacity-20">dashboard</span>
          <p className="text-lg">Dashboard Content Placeholder</p>
          <p className="text-sm mt-2">Select menu item from sidebar to view content</p>
        </div>
      )}
    </MainLayout>
  );
}
