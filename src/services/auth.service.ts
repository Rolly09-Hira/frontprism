import api from './api';
import type { User, LoginCredentials } from '../types/auth.types';

class AuthService {
  private currentUser: User | null = null;

  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const response = await api.post('/auth/login', {
        email: credentials.email,
        motDePasse: credentials.motDePasse
      });

      const data = response.data;
      
      // Déterminer le rôle basé sur l'email
      let role: 'student' | 'admin' | 'public' = 'public';
      if (data.email === 'admin@prisme.com') {
        role = 'admin';
      } else if (data.email === 'etudiant@prisme.com') {
        role = 'student';
      }

      const user: User = {
        name: data.nom,
        email: data.email,
        role: role,
        photoProfil: data.photoProfil || undefined,
        token: data.token
      };

      // Stocker les données
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(user));
      
      this.currentUser = user;
      return user;
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.response?.data?.message || 'Email ou mot de passe incorrect');
    }
  }

  async loginWithMatricule(matricule: string, motDePasse: string): Promise<User> {
    try {
      const response = await api.post('/auth/login-matricule', {
        matricule,
        motDePasse
      });

      const data = response.data;
      
      const user: User = {
        name: data.nom,
        email: data.email,
        role: 'student',
        photoProfil: data.photoProfil || undefined,
        token: data.token
      };

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(user));
      
      this.currentUser = user;
      return user;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Matricule ou mot de passe incorrect');
    }
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getCurrentUser(): User | null {
    if (this.currentUser) return this.currentUser;
    
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      this.currentUser = JSON.parse(storedUser);
      return this.currentUser;
    }
    
    return null;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null && this.getCurrentUser() !== null;
  }

  async checkEmail(email: string): Promise<boolean> {
    try {
      const response = await api.get(`/auth/check-email?email=${encodeURIComponent(email)}`);
      return response.data.exists;
    } catch (error) {
      return false;
    }
  }
}

export default new AuthService();