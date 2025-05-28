import React, { useState } from "react";
import { Navbar, Nav as BootstrapNav, Container } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { Modal, Button, Form } from "react-bootstrap";


function Nav({ items, onSeleccion, seccionActiva }) {

  const handleClick = (item) => {
    onSeleccion(item);
  };

  const [showCart, setShowCart] = useState(false);

  const handleCartOpen = () => setShowCart(true);
  const handleCartClose = () => setShowCart(false);


  return (
    <Navbar
      expand="md"
      style={{ backgroundColor: "#2c3e50" }}
      variant="dark"
      className="shadow-sm"
    >
      <Container>
        <Navbar.Brand
          className="fw-bold fs-4 text-light d-flex align-items-center logo-hover"
          href="https://www.youtube.com/shorts/cUWpHRrMFOQ"
          target="_blank"
          rel="noopener noreferrer"
          style={{ cursor: "pointer", textDecoration: "none" }}
        >
          <i className="bi bi-controller me-2"></i>Fancy Store
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <BootstrapNav className="me-auto">
            {items.map((item) => (
              <BootstrapNav.Link
                key={item}
                onClick={() => handleClick(item)}
                className={`nav-link-custom ${seccionActiva === item ? "active" : ""}`}
              >
                {item}
              </BootstrapNav.Link>
            ))}
          </BootstrapNav>

          <div className="text-light d-flex align-items-center">
            <FaShoppingCart
              size={22}
              className="ms-3"
              title="Carrito"
              style={{ cursor: "pointer" }}
              onClick={handleCartOpen}
            />

          </div>
        </Navbar.Collapse>
        <Modal show={showCart} onHide={handleCartClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Mi Carrito</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Tu carrito está vacío.</p>
            {/* Aquí irán los productos cuando el carrito sea funcional */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCartClose}>
              Cerrar
            </Button>
            <Button variant="success" disabled>
              Finalizar compra
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>

      {/* Estilos*/}
      <style>{`
  .nav-link-custom {
    color: #ccc !important;
    margin-right: 1rem;
    transition: all 0.3s ease;
  }

  .nav-link-custom:hover {
    color: #ffffff !important;
  }

  .nav-link-custom.active {
    color: #4CAF93 !important;
    font-weight: bold;
  }
`}</style>

    </Navbar>
  );
}

export default Nav;