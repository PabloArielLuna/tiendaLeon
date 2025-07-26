import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import AuthForm from './AuthForm';
import { toast } from 'react-toastify';

export default function SignUp() {
  const { signUp } = useContext(AuthContext);
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

    if (validateForm()) {
      const success = signUp(form);
      if (success) {
        localStorage.setItem('authToken', `fake-token-${form.username}`);
        navigate('/login');
      } else {
        toast.error('User already exists');
        setErrors({});
      }
    }
  };

  return (
    <AuthForm
      type="signup"
      form={form}
      setForm={setForm}
      onSubmit={handleSubmit}
      errors={errors}
    />
  );
}