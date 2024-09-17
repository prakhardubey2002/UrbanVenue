import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [usertype, setUsertype] = useState(localStorage.getItem('usertype'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (usertype) {
      localStorage.setItem('usertype', usertype);
    } else {
      localStorage.removeItem('usertype');
    }
  }, [usertype]);

  const logout = () => {
    setToken(null);
    setUsertype(null);
    localStorage.removeItem('token');
    localStorage.removeItem('usertype');
  };

  return (
    <AuthContext.Provider value={{ token, setToken, logout, usertype, setUsertype }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
