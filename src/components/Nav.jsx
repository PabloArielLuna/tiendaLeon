import React, { useState } from "react";
import {
  Navbar,
  Nav as BootstrapNav,
  Container,
  Modal,
  Button
} from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import "../Nav.css";

function Nav({ items, cart, removeFromCart }) {
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("auth") === "true";

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  const total = cart.reduce((acc, p) => acc + p.quantity * p.price, 0).toFixed(2);

  return (
    <Navbar expand="md" style={{ backgroundColor: "#2c3e50" }} variant="dark" className="shadow-sm">
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
            {items.map((item) => {
              const route = item.toLowerCase().replace(" ", "") === "productlist" ? "/products" : `/${item.toLowerCase().replace(" ", "")}`;
              return (
                <NavLink
                  key={item}
                  to={route === "/home" ? "/" : route}
                  className={({ isActive }) => `nav-link-custom ${isActive ? "active" : ""}`}
                  style={{ textDecoration: "none" }}
                >
                  {item}
                </NavLink>
              );
            })}
            {isLoggedIn ? (
              <>
                <NavLink
                  to="/admin"
                  className={({ isActive }) => `nav-link-custom ${isActive ? "active" : ""}`}
                  style={{ textDecoration: "none" }}
                >
                  Admin
                </NavLink>
                <Button
                  variant="outline-light"
                  size="sm"
                  className="ms-2"
                  style={{ textDecoration: "none" }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <NavLink
                to="/login"
                className="btn btn-outline-light btn-sm ms-2"
              >
                Login
              </NavLink>
            )}
          </BootstrapNav>

          <div className="d-flex align-items-center ms-md-3 mt-2 mt-md-0">
            <FaShoppingCart
              size={22}
              className="ms-3 text-white"
              title="Carrito"
              style={{ cursor: "pointer" }}
              onClick={() => setShowCart(true)}
            />
          </div>
        </Navbar.Collapse>

        {/* Modal del carrito */}
        <Modal show={showCart} onHide={() => setShowCart(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>My Cart</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                {cart.map((item) => (
                  <div key={item.id} className="mb-3 border-bottom pb-2">
                    <strong>{item.title}</strong>
                    <div>
                      {item.quantity} × U$S {item.price.toFixed(2)} = <strong>U$S {(item.quantity * item.price).toFixed(2)}</strong>
                    </div>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="mt-1"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <p className="fw-bold mt-3">Total: U$S {total}</p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowCart(false)}>
              Close
            </Button>
            <Button
              variant="success"
              disabled={cart.length === 0}
              onClick={() => {
                setShowCart(false);
                window.scrollTo(0, 0);
                navigate("/Checkout");
              }}
            >
              Go to Checkout
            </Button>

          </Modal.Footer>
        </Modal>
      </Container>
    </Navbar>
  );
}

export default Nav;