import React from "react";
import { Nav as BootstrapNav, Navbar, Container } from "react-bootstrap";

function Nav({ items, onSeleccion }) {
  return (
    <Navbar bg="light" expand="md">
      <Container>
        <Navbar.Brand className="fw-bold">Fancy Store</Navbar.Brand>

        <BootstrapNav className="me-auto">
          {items.map((item) => (
            <BootstrapNav.Link key={item} onClick={() => onSeleccion(item)}>
              {item}
            </BootstrapNav.Link>
          ))}
        </BootstrapNav>

        {/* Ícono del carrito */}
        <i className="bi bi-cart3 fs-4"></i>
      </Container>
    </Navbar>
  );
}

export default Nav;
