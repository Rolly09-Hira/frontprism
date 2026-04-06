// src/components/public/Navbar.tsx
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold">
            Mon Application
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-blue-200 transition">
              Accueil
            </Link>
            <Link to="/login" className="hover:text-blue-200 transition">
              Connexion
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}