import { useState } from 'react';
import { Sidebar } from '../Sidebar';

export function MainLayout({ children }) {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeItem={activeItem} onItemClick={setActiveItem} />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-slate-200 bg-white flex items-center px-8">
          <h2 className="text-lg font-semibold text-on-surface">
            {activeItem?.label || 'Dashboard'}
          </h2>
        </header>

        <div className="flex-1 overflow-auto p-8">
          {children || (
            <div className="flex items-center justify-center h-full text-slate-400">
              <p>Select an item from the sidebar to continue</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
