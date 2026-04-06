import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Calendar,
  Settings,
  LogOut,
  BarChart3,
  MessageSquare
} from 'lucide-react';

export default function AdminSidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Tableau de bord' },
    { path: '/admin/users', icon: Users, label: 'Utilisateurs' },
    { path: '/admin/courses', icon: BookOpen, label: 'Cours' },
    { path: '/admin/formations', icon: BookOpen, label: 'Formations' },
    { path: '/admin/schedule', icon: Calendar, label: 'Emploi du temps' },
    { path: '/admin/statistics', icon: BarChart3, label: 'Statistiques' },
    { path: '/admin/messages', icon: MessageSquare, label: 'Messages' },
    { path: '/admin/settings', icon: Settings, label: 'Paramètres' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col h-screen sticky top-0">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <p className="text-xs text-gray-400 mt-1">Gestion de la plateforme</p>
      </div>
      
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-indigo-600 text-white'
                    : 'hover:bg-gray-800 text-gray-300'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold">{user?.name?.charAt(0) || 'A'}</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{user?.name || 'Administrateur'}</p>
            <p className="text-xs text-gray-400">Administrateur</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg hover:bg-red-600 transition-colors text-red-400 hover:text-white"
        >
          <LogOut className="w-5 h-5" />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}