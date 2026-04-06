import { 
  Users, 
  BookOpen, 
  Calendar, 
  TrendingUp,
  UserCheck,
  Award,
  Activity,
  Eye
} from 'lucide-react';

export default function AdminDashboard() {
  // Données statistiques simulées
  const stats = [
    { title: 'Total étudiants', value: '156', change: '+12%', icon: Users, color: 'bg-blue-500' },
    { title: 'Total professeurs', value: '24', change: '+5%', icon: UserCheck, color: 'bg-green-500' },
    { title: 'Cours actifs', value: '32', change: '+8%', icon: BookOpen, color: 'bg-purple-500' },
    { title: 'Taux de réussite', value: '87%', change: '+3%', icon: Award, color: 'bg-yellow-500' },
  ];

  const recentActivities = [
    { user: 'Jean Dupont', action: 's\'est inscrit au cours', course: 'Programmation Web', date: 'Il y a 2 heures' },
    { user: 'Marie Martin', action: 'a soumis un devoir', course: 'Base de données', date: 'Il y a 5 heures' },
    { user: 'Admin', action: 'a ajouté un nouveau cours', course: 'Intelligence Artificielle', date: 'Hier' },
    { user: 'Pierre Durand', action: 'a modifié son profil', course: '', date: 'Hier' },
  ];

  const upcomingEvents = [
    { title: 'Réunion des professeurs', date: '2024-03-25', time: '14:00', location: 'Salle de conférence' },
    { title: 'Remise des diplômes', date: '2024-03-28', time: '18:00', location: 'Grand amphithéâtre' },
    { title: 'Fin des cours', date: '2024-04-15', time: '17:00', location: 'Tous les départements' },
  ];

  const topCourses = [
    { name: 'Programmation Web', students: 45, completion: 78 },
    { name: 'Base de données', students: 38, completion: 65 },
    { name: 'Algorithmique', students: 42, completion: 82 },
    { name: 'Intelligence Artificielle', students: 28, completion: 45 },
  ];

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
        <p className="text-gray-600 mt-1">Bienvenue dans votre espace d'administration</p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                <p className="text-green-600 text-sm mt-1">{stat.change} vs mois dernier</p>
              </div>
              <div className={`${stat.color} p-3 rounded-full`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activités récentes */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b p-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Activités récentes
            </h2>
          </div>
          <div className="divide-y">
            {recentActivities.map((activity, index) => (
              <div key={index} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-800">
                      <span className="font-semibold">{activity.user}</span>
                      {' '}{activity.action}
                      {activity.course && (
                        <span className="text-indigo-600"> {activity.course}</span>
                      )}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{activity.date}</p>
                  </div>
                  <Eye className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Événements à venir */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b p-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Événements à venir
            </h2>
          </div>
          <div className="divide-y">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="p-4">
                <h3 className="font-medium text-gray-800">{event.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  📅 {event.date} à {event.time}
                </p>
                <p className="text-sm text-gray-500">📍 {event.location}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cours populaires */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b p-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Cours les plus suivis
          </h2>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            {topCourses.map((course, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-gray-800">{course.name}</span>
                  <span className="text-sm text-gray-600">{course.students} étudiants</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 rounded-full h-2 transition-all duration-500"
                      style={{ width: `${course.completion}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600">{course.completion}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}