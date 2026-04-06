import { useAuth } from '../../contexts/AuthContext';
import { 
  BookOpen, 
  Calendar, 
  Award, 
  Clock, 
  Bell,
  ChevronRight
} from 'lucide-react';

export default function StudentDashboard() {
  const { user } = useAuth();

  // Données simulées pour le tableau de bord
  const stats = [
    { title: 'Cours inscrits', value: '5', icon: BookOpen, color: 'bg-blue-500' },
    { title: 'Moyenne générale', value: '15.6/20', icon: Award, color: 'bg-green-500' },
    { title: 'Heures de cours', value: '24h', icon: Clock, color: 'bg-purple-500' },
    { title: 'Événements', value: '3', icon: Calendar, color: 'bg-orange-500' },
  ];

  const upcomingCourses = [
    { name: 'Programmation Web', time: '10:00 - 12:00', room: 'Salle 101', teacher: 'M. Martin' },
    { name: 'Base de données', time: '14:00 - 16:00', room: 'Salle 203', teacher: 'Mme. Bernard' },
    { name: 'Algorithmique', time: '09:00 - 11:00', room: 'Amphi A', teacher: 'M. Dubois' },
  ];

  const recentGrades = [
    { course: 'Programmation Web', grade: '16/20', date: '2024-03-15', coefficient: 3 },
    { course: 'Base de données', grade: '14/20', date: '2024-03-10', coefficient: 2 },
    { course: 'Anglais', grade: '18/20', date: '2024-03-05', coefficient: 1 },
  ];

  const announcements = [
    { title: 'Examen final', date: '2024-04-15', content: 'Les examens finaux auront lieu du 15 au 30 avril' },
    { title: 'Stage obligatoire', date: '2024-03-20', content: 'Dépôt des conventions de stage avant le 30 mai' },
    { title: 'Journée portes ouvertes', date: '2024-03-25', content: 'Inscription pour les bénévoles avant le 20 mars' },
  ];

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Bienvenue, {user?.name} !
        </h1>
        <p className="text-gray-600 mt-1">
          Voici votre espace personnel où vous pouvez suivre votre progression académique.
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-full`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cours à venir */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b p-4">
            <h2 className="text-lg font-semibold text-gray-800">Cours à venir</h2>
          </div>
          <div className="p-4">
            {upcomingCourses.map((course, index) => (
              <div key={index} className="mb-4 last:mb-0 pb-4 last:pb-0 border-b last:border-b-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">{course.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {course.time} - {course.room}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Prof: {course.teacher}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notes récentes */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b p-4">
            <h2 className="text-lg font-semibold text-gray-800">Notes récentes</h2>
          </div>
          <div className="p-4">
            {recentGrades.map((grade, index) => (
              <div key={index} className="mb-4 last:mb-0 pb-4 last:pb-0 border-b last:border-b-0">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-800">{grade.course}</h3>
                    <p className="text-sm text-gray-500">
                      Coef. {grade.coefficient} - {grade.date}
                    </p>
                  </div>
                  <span className="text-xl font-bold text-green-600">{grade.grade}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Annonces */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b p-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Annonces importantes
          </h2>
        </div>
        <div className="divide-y">
          {announcements.map((announcement, index) => (
            <div key={index} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-800">{announcement.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{announcement.content}</p>
                </div>
                <span className="text-xs text-gray-400">{announcement.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}