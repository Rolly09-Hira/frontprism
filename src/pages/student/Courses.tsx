import { BookOpen, Clock, User, MapPin } from 'lucide-react';

export default function StudentCourses() {
  const courses = [
    {
      id: 1,
      name: 'Programmation Web',
      teacher: 'M. Martin',
      schedule: 'Lundi 10:00-12:00',
      room: 'Salle 101',
      credits: 6,
      progress: 75,
      description: 'HTML, CSS, JavaScript, React'
    },
    {
      id: 2,
      name: 'Base de données',
      teacher: 'Mme. Bernard',
      schedule: 'Mardi 14:00-16:00',
      room: 'Salle 203',
      credits: 5,
      progress: 60,
      description: 'SQL, MongoDB, Conception de bases de données'
    },
    {
      id: 3,
      name: 'Algorithmique',
      teacher: 'M. Dubois',
      schedule: 'Mercredi 09:00-11:00',
      room: 'Amphi A',
      credits: 6,
      progress: 80,
      description: 'Structures de données, algorithmes avancés'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800">Mes cours</h1>
        <p className="text-gray-600 mt-1">Consultez tous vos cours et votre progression</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-4">
              <h3 className="text-lg font-semibold text-white">{course.name}</h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center text-gray-600">
                <User className="w-4 h-4 mr-2" />
                <span className="text-sm">Professeur: {course.teacher}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-2" />
                <span className="text-sm">{course.schedule}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">{course.room}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <BookOpen className="w-4 h-4 mr-2" />
                <span className="text-sm">Crédits: {course.credits}</span>
              </div>
              
              <div className="mt-3">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progression</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 rounded-full h-2 transition-all duration-500"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
              
              <p className="text-sm text-gray-500 mt-2">{course.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}