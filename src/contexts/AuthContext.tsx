import { createContext, useContext, useState, ReactNode } from "react";

// ✅ UserInfo sans photoProfil
interface UserInfo {
  nom: string;
  email: string;
  photoProfil: string; 
}

interface AuthContextType {
  token: string | null;
  role: string | null;
  user: UserInfo | null;
  login: (token: string, role: string, user: UserInfo, remember: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token") || sessionStorage.getItem("token")
  );

  const [role, setRole] = useState<string | null>(
    localStorage.getItem("role") || sessionStorage.getItem("role")
  );

  const [user, setUser] = useState<UserInfo | null>(
    JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user") || "null")
  );

  const login = (token: string, role: string, userData: UserInfo, remember: boolean) => {
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem("token", token);
    storage.setItem("role", role);
    storage.setItem("user", JSON.stringify(userData));

    setToken(token);
    setRole(role);
    setUser(userData);
  };

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setToken(null);
    setRole(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext error");
  return context;
};
