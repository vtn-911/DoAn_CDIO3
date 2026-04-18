import SideNav from './SideNav'
import TopNav from './TopNav'

/**
 * MainLayout Component - Wrapper for all dashboard pages
 * Combines SideNav and TopNav with content area
 */
export default function MainLayout({ 
  children, 
  pageTitle = 'Dashboard',
  onLogout 
}) {
  return (
    <div className="flex min-h-screen bg-surface">
      {/* Sidebar */}
      <SideNav onLogout={onLogout} />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top navigation */}
        <TopNav pageTitle={pageTitle} />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-surface">
          {children}
        </main>
      </div>
    </div>
  )
}
