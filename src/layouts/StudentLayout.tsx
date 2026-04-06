import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function StudentLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar Étudiant */}
      <nav className="bg-indigo-700 text-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/student/dashboard" className="text-xl font-bold">
                Espace Étudiant
              </Link>
              <div className="hidden md:flex space-x-4 ml-8">
                <Link to="/student/dashboard" className="hover:text-indigo-200 transition">
                  Tableau de bord
                </Link>
                <Link to="/student/courses" className="hover:text-indigo-200 transition">
                  Mes cours
                </Link>
                <Link to="/student/grades" className="hover:text-indigo-200 transition">
                  Notes
                </Link>
                <Link to="/student/schedule" className="hover:text-indigo-200 transition">
                  Emploi du temps
                </Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm">
                <span className="block font-semibold">{user?.name}</span>
                <span className="text-xs text-indigo-200">{user?.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition text-sm"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenu principal */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-auto">
        <div className="container mx-auto px-4 py-4 text-center text-sm">
          <p>Espace Étudiant - © 2024 Tous droits réservés</p>
        </div>
      </footer>
    </div>
  );
}