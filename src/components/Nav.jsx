import React, { useState } from "react";
import { Navbar, Nav as BootstrapNav, Container } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";

function Nav({ items, onSeleccion }) {
  const [activo, setActivo] = useState(items[0]); // Primera sección como activa

  const handleClick = (item) => {
    setActivo(item);
    onSeleccion(item);
  };

  return (
    <Navbar
      expand="md"
      style={{ backgroundColor: "#2c3e50" }}
      variant="dark"
      className="shadow-sm"
    >
      <Container>
        <Navbar.Brand className="fw-bold fs-4 text-light">
          <i className="bi bi-controller me-2"></i>Fancy Store
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <BootstrapNav className="me-auto">
            {items.map((item) => (
              <BootstrapNav.Link
                key={item}
                onClick={() => handleClick(item)}
                className={`nav-link-custom ${
                  activo === item ? "active" : ""
                }`}
              >
                {item}
              </BootstrapNav.Link>
            ))}
          </BootstrapNav>

          <div className="text-light d-flex align-items-center">
            <FaShoppingCart size={22} className="ms-3" title="Carrito" />
          </div>
        </Navbar.Collapse>
      </Container>

      {/* Estilos*/}
      <style>{`
        .nav-link-custom {
          color: #ccc;
          margin-right: 1rem;
          transition: all 0.3s ease;
        }

        .nav-link-custom:hover {
          color: #ffffff;
        }

        .nav-link-custom.active {
          color: #4CAF93;
          font-weight: bold;
        }
      `}</style>
    </Navbar>
  );
}

export default Nav;