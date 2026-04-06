export interface LoginCredentials {
  email: string;
  motDePasse: string;
}

export interface LoginResponse {
  token: string;
  nom: string;
  email: string;
  photoProfil: string | null;
}

export interface User {
  id?: number;
  name: string;
  email: string;
  role: 'student' | 'admin' | 'public';
  photoProfil?: string;
  token?: string;
}