import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import StudentLayout from './layouts/StudentLayout';
import AdminLayout from './layouts/AdminLayout';

// Pages publiques
import Home from './pages/public/Home';
import Login from './pages/public/Login';

// Pages étudiantes
import StudentDashboard from './pages/student/Dashboard';
import StudentCourses from './pages/student/Courses';

// Pages admin
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminFormations from './pages/admin/Formations';

// Composant pour remonter en haut
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return null;
}

export default function AppRouter() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Routes>
        {/* Routes publiques */}
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
        </Route>

        {/* Routes étudiantes protégées */}
        <Route
          path="student"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<StudentDashboard />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="courses" element={<StudentCourses />} />
        </Route>

        {/* Routes admin protégées */}
        <Route
          path="admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="formations" element={<AdminFormations />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}