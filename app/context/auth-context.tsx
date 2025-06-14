"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define types for our auth context
type AuthContextType = {
  user: string | null;
  userId: string | null;
  login: (userData: { name: string; id: string }) => void;
  logout: () => void;
};

// Create context with initial null value but specify the type
const AuthContext = createContext<AuthContextType | null>(null);

// Define props type for AuthProvider
type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Initialize from localStorage
    const storedUser = localStorage.getItem("user");
    const storedId = localStorage.getItem("turiya_auth_id");
    if (storedUser && storedId) {
      setUser(storedUser);
      setUserId(storedId);
    }
  }, []);

  const login = (userData: { name: string; id: string }) => {
    localStorage.setItem("user", userData.name);
    localStorage.setItem("turiya_auth_id", userData.id);
    setUser(userData.name);
    setUserId(userData.id);
  };

  const logout = () => {
    localStorage.removeItem("turiya_auth_id");
    localStorage.removeItem("turiya_auth_token");
    localStorage.removeItem("user");
    setUser(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ user, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}