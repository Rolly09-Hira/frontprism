import { Bell, Search, Menu } from 'lucide-react';
import { useState } from 'react';

interface AdminNavbarProps {
  onMenuClick?: () => void;
}

export default function AdminNavbar({ onMenuClick }: AdminNavbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, message: 'Nouvel étudiant inscrit', time: 'Il y a 5 minutes', read: false },
    { id: 2, message: 'Cours mis à jour', time: 'Il y a 1 heure', read: false },
    { id: 3, message: 'Message reçu', time: 'Il y a 2 heures', read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Menu button for mobile */}
          <div className="flex items-center md:hidden">
            <button
              onClick={onMenuClick}
              className="text-gray-500 hover:text-gray-600 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-lg mx-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="text-gray-500 hover:text-gray-600 focus:outline-none relative"
              >
                <Bell className="h-6 w-6" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Dropdown notifications */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50">
                  <div className="p-3 border-b border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 hover:bg-gray-50 cursor-pointer ${
                          !notification.read ? 'bg-blue-50' : ''
                        }`}
                      >
                        <p className="text-sm text-gray-900">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-gray-200">
                    <button className="text-sm text-indigo-600 hover:text-indigo-700 w-full text-center">
                      Voir toutes les notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Date */}
            <div className="hidden sm:block">
              <span className="text-sm text-gray-600">
                {new Date().toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}