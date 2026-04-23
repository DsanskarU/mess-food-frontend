import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserFromToken } from "../api/getUserFromToken";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // load user on app start
  useEffect(() => {
    const tokenUser = getUserFromToken();
    setUser(tokenUser || null);
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const tokenUser = getUserFromToken();
    setUser(tokenUser); // 🔥 instant update
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);