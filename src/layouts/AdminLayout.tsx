import { useState } from 'react';
import { AdminSidebar } from '@/features/admin/components/AdminSidebar';
import { AdminHeader } from '@/features/admin/components/AdminHeader';
import { AdminDashboard } from '@/features/admin/components/AdminDashboard';

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <AdminHeader onMenuToggle={() => setSidebarOpen(true)} />
        
        {/* Dashboard */}
        <main className="flex-1 overflow-y-auto p-4">
          <AdminDashboard />
        </main>
      </div>
    </div>
  );
}