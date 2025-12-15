import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("userInfo")) || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem("userInfo", JSON.stringify(user));
    else localStorage.removeItem("userInfo");
  }, [user]);

  const login = async (email, password) => {
    try {
      const { data } = await API.post("/auth/login", { email, password });
      setUser(data);
      return data;
    } catch (err) {
      throw err.response?.data?.message || "Login Failed";
    }
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await API.post("/auth/register", { name, email, password });
      setUser(data);
      return data;
    } catch (err) {
      throw err.response?.data?.message || "Registration Failed";
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
