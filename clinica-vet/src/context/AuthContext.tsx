import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../api';

interface AuthContextType {
  user: { id: number; name: string; email: string } | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<{ id: number; name: string; email: string } | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      api.get('/users/me', {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
        .then((response) => setUser(response.data))
        .catch(() => {
          setToken(null);
          localStorage.removeItem('token');
        });
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await api.post('/users/login', { email, password });
    const { id, name, email: userEmail, token: newToken } = response.data;
    setUser({ id, name, email: userEmail });
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const register = async (name: string, email: string, password: string) => {
    await api.post('/users/register', { name, email, password });
    await login(email, password); 
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};