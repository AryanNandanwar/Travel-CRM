// src/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = ({ user: userInfo, accessToken }) => {
    setUser(userInfo);
    // optionally store accessToken if you need it
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = Boolean(user);

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated        // ← expose this
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
