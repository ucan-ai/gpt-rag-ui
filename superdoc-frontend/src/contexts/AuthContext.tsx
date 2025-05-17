import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  name: string;
  // Add other user properties as needed
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const auth = localStorage.getItem('auth');
    if (auth) {
      setIsAuthenticated(true);
      // Set a default user for demo purposes
      setUser({ name: 'Demo User' });
    }
  }, []);

  const login = () => {
    // For demo purposes, we're doing a simple login
    // In a real app, this would authenticate with a backend
    localStorage.setItem('auth', 'true');
    setIsAuthenticated(true);
    setUser({ name: 'Demo User' });
  };

  const logout = () => {
    localStorage.removeItem('auth');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};