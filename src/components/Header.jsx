import React, { useContext } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Header() {
  const { user } = useContext(AuthContext);
  return (
    <Navbar bg="dark" variant="dark" className="px-3 shadow-sm">
      <Container fluid className="d-flex justify-content-between">
        <Link to="/" className="d-flex align-items-center text-light text-decoration-none">
          <img
            src="/logo leon.jpg"
            alt="Logo"
            width="40"
            height="40"
            style={{ borderRadius: '50%', objectFit: 'cover' }}
            className="me-2 logo-hover"
          />
          <span className="fw-bold fs-5">Tienda León</span>
        </Link>
        {user && (
          <Navbar.Text className="text-white">
            <small>{user.username} – {user.role}</small>
          </Navbar.Text>
        )}
      </Container>
      <style>{`.logo-hover{transition:transform .3s}.logo-hover:hover{transform:scale(1.1)}`}</style>
    </Navbar>
  );
}