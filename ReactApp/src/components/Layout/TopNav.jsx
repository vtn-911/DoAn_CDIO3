/**
 * TopNav Component - Header with search and notifications
 */
export default function TopNav({ pageTitle = 'Dashboard' }) {
  return (
    <header className="w-full sticky top-0 z-40 bg-white border-b border-slate-100 shadow-sm px-6 py-3 flex items-center justify-between">
      {/* Left section */}
      <div className="flex items-center space-x-8">
        <span className="text-xl font-bold tracking-tight text-slate-900">
          {pageTitle}
        </span>

        {/* Search bar */}
        <div className="relative hidden lg:block">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
            <span className="material-symbols-outlined text-lg">search</span>
          </span>
          <input
            className="pl-10 pr-4 py-1.5 bg-surface-container-low border-none rounded-lg text-sm focus:ring-2 focus:ring-primary w-64"
            placeholder="Search..."
            type="text"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-4">
        {/* Notifications button */}
        <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors active:scale-95 duration-150">
          <span className="material-symbols-outlined">notifications</span>
        </button>

        {/* User avatar */}
        <div className="h-8 w-8 rounded-full bg-primary-fixed flex items-center justify-center border border-outline-variant overflow-hidden">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  )
}
