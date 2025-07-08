'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  role: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedAuth = localStorage.getItem('isAuthenticated') === 'true';
      setIsAuthenticated(storedAuth);
      if (storedAuth) {
        // Optionally, restore user info from localStorage
        const email = localStorage.getItem('userEmail');
        const role = localStorage.getItem('userRole');
        if (email && role) {
          setUser({ id: 'unknown', email, role, name: '' });
        }
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - replace with real API later
    const mockUsers = {
      'admin@shefa.ly': { id: '1', email: 'admin@shefa.ly', role: 'admin', name: 'Admin User' },
      'doctor@shefa.ly': { id: '2', email: 'doctor@shefa.ly', role: 'doctor', name: 'Dr. Ahmed' },
      'nurse@shefa.ly': { id: '3', email: 'nurse@shefa.ly', role: 'nurse', name: 'Nurse Fatima' },
      'patient@shefa.ly': { id: '4', email: 'patient@shefa.ly', role: 'patient', name: 'Patient Ali' },
      'technician@shefa.ly': { id: '5', email: 'technician@shefa.ly', role: 'technician', name: 'Tech Omar' }
    };

    const mockPasswords = {
      'admin@shefa.ly': 'admin123',
      'doctor@shefa.ly': 'doctor123',
      'nurse@shefa.ly': 'nurse123',
      'patient@shefa.ly': 'patient123',
      'technician@shefa.ly': 'tech123'
    };

    if (mockUsers[email as keyof typeof mockUsers] && mockPasswords[email as keyof typeof mockPasswords] === password) {
      const userData = mockUsers[email as keyof typeof mockUsers];
      setUser(userData);
      setIsAuthenticated(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', userData.role);
        localStorage.setItem('userEmail', userData.email);
      }
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userEmail');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext };
