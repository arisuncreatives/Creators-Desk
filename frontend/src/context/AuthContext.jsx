import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Check for saved token when the app loads
  useEffect(() => {
    const savedToken = localStorage.getItem('creator_token');
    const savedUser = localStorage.getItem('creator_user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (newToken, userData) => {
    setToken(newToken);
    setUser(userData);
    localStorage.setItem('creator_token', newToken);
    localStorage.setItem('creator_user', JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('creator_token');
    localStorage.removeItem('creator_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};