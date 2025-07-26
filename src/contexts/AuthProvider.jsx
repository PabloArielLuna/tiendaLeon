import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';   // <- mismo contexto

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ─── Load session from localStorage ────────────────────────────
  useEffect(() => {
    const saved = localStorage.getItem('session');
    if (saved) setUser(JSON.parse(saved));
    setLoading(false);
  }, []);

  // ─── Helpers ───────────────────────────────────────────────────
  const saveSession = (u) => {
    setUser(u);
    localStorage.setItem('session', JSON.stringify(u));
  };

  const logout = () => {
    localStorage.removeItem('session');
    setUser(null);
    navigate('/');           // redirige al Home
  };

  /** SIGN‑UP (antes “register”): crea usuario pero **NO** inicia sesión */
  const signUp = ({ username, password }) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.find((u) => u.username === username)) {
      return false;
    }

    users.push({
      username,
      password,
      role: username === 'admin' ? 'admin' : 'user',
    });

    localStorage.setItem('users', JSON.stringify(users));
    return true; // El componente decide adónde navegar (→ /login)
  };

  /** LOGIN: valida y, si ok, guarda sesión */
  const login = ({ username, password }) => {
    let users = JSON.parse(localStorage.getItem('users') || '[]');

    // crea admin por defecto si no existe
    if (!users.find((u) => u.username === 'admin'))
      users.push({ username: 'admin', password: '123456', role: 'admin' });

    const match = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!match) {
      return false;
    }

    saveSession({ username: match.username, role: match.role });
    return true; // El componente decide → navigate('/')
  };

  // ─── Context value ─────────────────────────────────────────────
  return (
    <AuthContext.Provider
      value={{ user, isAuth: !!user, isAdmin: user?.role === 'admin', loading, login, signUp, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}