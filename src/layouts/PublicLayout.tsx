// src/components/layouts/PublicLayout.tsx
import { Outlet } from 'react-router-dom';
import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}