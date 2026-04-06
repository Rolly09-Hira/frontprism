import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminNavbar from '../components/admin/AdminNavbar';

export default function AdminLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar pour desktop - fixe */}
      <div className="hidden md:block fixed inset-y-0 z-30">
        <AdminSidebar />
      </div>

      {/* Sidebar mobile - overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="absolute inset-0 bg-gray-600 opacity-75" 
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-64">
            <AdminSidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="md:pl-64 flex flex-col min-h-screen">
        <AdminNavbar onMenuClick={() => setMobileSidebarOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}