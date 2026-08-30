import React, { createContext, useContext, useState } from 'react';
import { User } from '../types/index.js';
import { api } from '../services/api.js';

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
  date_of_birth?: string;
  gender?: string;
  address?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (
    dataOrName: RegisterInput | string,
    email?: string,
    password?: string,
    phone?: string
  ) => Promise<User>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isStudent: boolean;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'ptgc_auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState<boolean>(false);

  const login = async (email: string, password: string): Promise<User> => {
    setLoading(true);
    try {
      const res = await api.loginUser({ email, password });
      setUser(res.user);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(res.user));
      return res.user;
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    dataOrName: RegisterInput | string,
    email?: string,
    password?: string,
    phone?: string
  ): Promise<User> => {
    setLoading(true);
    try {
      let payload: RegisterInput;
      if (typeof dataOrName === 'object' && dataOrName !== null) {
        payload = dataOrName;
      } else {
        payload = {
          name: String(dataOrName),
          email: email || '',
          password: password || '',
          phone: phone || '',
        };
      }

      const res = await api.registerUser(payload);
      setUser(res.user);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(res.user));
      return res.user;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const refreshUser = () => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isStudent: user?.role === 'student',
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
