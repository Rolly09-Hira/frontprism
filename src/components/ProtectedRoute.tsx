import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Array<'student' | 'admin'>;
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    // Vérifier si le rôle de l'utilisateur est autorisé
    // user.role peut être 'student', 'admin' ou 'public'
    // On ne vérifie que si le rôle est dans allowedRoles
    if (!allowedRoles.includes(user.role as 'student' | 'admin')) {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
}