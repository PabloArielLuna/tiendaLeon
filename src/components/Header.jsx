import React from "react";
import { Navbar, Container } from "react-bootstrap";

function Header({ usuario, tipo, irHome }) {
  return (
    <Navbar bg="dark" variant="dark" className="px-3 py-2 shadow-sm">
      <Container fluid className="d-flex align-items-center justify-content-between">
        <Navbar.Brand
          onClick={irHome}
          className="d-flex align-items-center text-light text-decoration-none"
        >
          <img
            src="/logo leon.jpg"
            alt="Logo Tienda León"
            width="40"
            height="40"
            className="me-2 logo-hover"
            style={{ borderRadius: '50%', objectFit: 'cover' }}
          />
          <span className="fw-bold fs-5">Tienda León</span>
        </Navbar.Brand>

        <Navbar.Text className="text-white text-end">
          <small>{usuario} - {tipo}</small>
        </Navbar.Text>
      </Container>

      <style>{`
        .logo-hover {
          transition: transform 0.3s ease;
        }
        .logo-hover:hover {
          transform: scale(1.1);
          cursor: pointer;
        }
      `}</style>
    </Navbar>
  );
}

export default Header;