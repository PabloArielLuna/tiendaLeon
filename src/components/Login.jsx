import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm';
import { AuthContext } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!form.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!form.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones de campos
    if (validateForm()) {
      // Si los datos son válidos, intentamos loguear
      if (login(form)) {
        localStorage.setItem('authToken', `fake-token-${form.username}`);
        navigate('/');
      } else {
        // Mostrar error de credenciales SOLO por Toastify
        toast.error('Invalid credentials');
        // Limpiar errores previos de campos
        setErrors({});
      }
    }
  };

  return (
    <AuthForm
      type="login"
      form={form}
      setForm={setForm}
      onSubmit={handleSubmit}
      errors={errors}
    />

  );
}