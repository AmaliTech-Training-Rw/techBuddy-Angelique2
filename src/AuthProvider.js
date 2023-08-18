import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  const login = async ({ email, password }) => {
    try {

      const response = await axios.post('/login', { email, password });
      setUser(response.data.user);

    } catch (error) {
      console.error('Login error:', error);
      
    }
  };

  const register = async (email, password) => {
    try {

      const response = await axios.post('/register', { email, password });

      setUser(response.data.user);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
export default AuthProvider;