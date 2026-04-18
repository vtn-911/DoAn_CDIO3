import SideNavRole from './SideNavRole'
import TopNav from './TopNav'

/**
 * MainLayoutRole Component - Main layout for role-based system
 * Combines sidebar with role-based navigation and content area
 */
export default function MainLayoutRole({ children, pageTitle = 'Dashboard' }) {
  return (
    <div className="flex min-h-screen bg-surface">
      {/* Sidebar with role-based navigation */}
      <SideNavRole />

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
