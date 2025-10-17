'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type AuthLevel = 'none' | 'user' | 'admin';

interface AuthContextType {
  authLevel: AuthLevel;
  login: (password: string) => boolean;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authLevel, setAuthLevel] = useState<AuthLevel>('none');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage on mount
    const stored = localStorage.getItem('authLevel');
    if (stored === 'user' || stored === 'admin') {
      setAuthLevel(stored);
    }
    setIsLoading(false);
  }, []);

  const login = (password: string): boolean => {
    const userPassword = process.env.NEXT_PUBLIC_USER_PASSWORD;
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    if (password === adminPassword) {
      setAuthLevel('admin');
      localStorage.setItem('authLevel', 'admin');
      return true;
    } else if (password === userPassword) {
      setAuthLevel('user');
      localStorage.setItem('authLevel', 'user');
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuthLevel('none');
    localStorage.removeItem('authLevel');
  };

  return (
    <AuthContext.Provider value={{ authLevel, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}