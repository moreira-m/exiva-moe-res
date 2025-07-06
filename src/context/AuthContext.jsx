import React, { createContext, useEffect, useState } from 'react';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../firebase/firebase';

export const AuthContext = createContext({
  user: null,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        console.error('Invalid user in storage', e);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      localStorage.setItem('user', JSON.stringify(result.user));
    } catch (error) {
      console.error('Login error', error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Logout error', err);
    }
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
