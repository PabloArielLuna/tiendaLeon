import React, { useState } from "react";
import { Navbar, Nav as BootstrapNav, Container, Modal, Button, Form } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import "../Nav.css";

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
      <Container fluid>
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
          <div className="d-flex align-items-center ms-md-3 mt-2 mt-md-0">
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
            <Modal.Title>My Cart</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Your cart is empty.</p>
            {/* Aquí irán los productos cuando el carrito sea funcional */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCartClose}>
              Close
            </Button>
            <Button variant="success" disabled>
              Complete purchase
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Navbar>
  );
}

export default Nav;