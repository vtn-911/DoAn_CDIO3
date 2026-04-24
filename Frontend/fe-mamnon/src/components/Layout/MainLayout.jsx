import { Sidebar } from '../Sidebar';

export function MainLayout({ children, activeItem, onItemClick }) {
  const isFullBleed = activeItem?.id === 'user-accounts';

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeItem={activeItem} onItemClick={onItemClick} />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        {!isFullBleed && (
          <header className="h-16 border-b border-slate-200 bg-white flex items-center px-8">
            <h2 className="text-lg font-semibold text-on-surface">
              {activeItem?.label || 'Dashboard'}
            </h2>
          </header>
        )}

        <div className={`flex-1 overflow-auto ${!isFullBleed ? 'p-8' : ''}`}>
          {children}
        </div>
      </main>
    </div>
  );
}
