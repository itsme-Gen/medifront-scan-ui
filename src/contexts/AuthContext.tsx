import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'doctor' | 'nurse' | 'admin';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock users for demo
const mockUsers: User[] = [
  { id: '1', name: 'Dr. Sarah Johnson', role: 'doctor', email: 'sarah@hospital.com' },
  { id: '2', name: 'Nurse Maria Garcia', role: 'nurse', email: 'maria@hospital.com' },
  { id: '3', name: 'Admin John Smith', role: 'admin', email: 'admin@hospital.com' },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app, this would be an API call
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === 'demo123') {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};