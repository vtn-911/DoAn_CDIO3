import { MainLayout } from '../components/Layout/MainLayout';

export default function Dashboard() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center h-full text-slate-400">
        <span className="material-symbols-outlined text-6xl mb-4 opacity-20">dashboard</span>
        <p className="text-lg">Dashboard Content Placeholder</p>
        <p className="text-sm mt-2">Select menu item from sidebar to view content</p>
      </div>
    </MainLayout>
  );
}
