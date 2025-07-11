import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

/**
 * @param {string[]} allowedRoles – e.g. ['admin'] or ['user','admin']
 */
export default function ProtectedRoute({ allowedRoles }) {
  const { loading, isAuth, user } = useContext(AuthContext);
  if (loading) return null;          // or a spinner
  if (!isAuth) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" replace />;
  return <Outlet />;
}