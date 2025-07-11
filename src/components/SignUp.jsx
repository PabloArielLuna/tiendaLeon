// src/components/SignUp.jsx
import React, { useContext, useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function SignUp() {
  const { signUp } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (signUp(form)) {
      navigate('/login');              // ⬅️ después del registro
    }
  };

  return (
    <Container className="my-5" style={{ maxWidth: 420 }}>
      <h2 className="mb-4">Create Account</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </Form.Group>
        <Button type="submit" variant="success" className="w-100">
          Sign Up
        </Button>
      </Form>
    </Container>
  );
}