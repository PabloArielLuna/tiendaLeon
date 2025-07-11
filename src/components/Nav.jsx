import React, { useContext, useState } from 'react';
import {
  Navbar,
  Nav as BootstrapNav,
  Container,
  Modal,
  Button,
} from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import '../Nav.css';

function Nav({ items, cart, removeFromCart }) {
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  // ─── Auth state ────────────────────────────────────────────────
  const { isAuth, isAdmin, logout } = useContext(AuthContext);

  // ─── Helpers ───────────────────────────────────────────────────
  const getClass = ({ isActive }) =>
    `nav-link-custom ${isActive ? 'active' : ''}`;

  const total = cart
    .reduce((acc, p) => acc + p.quantity * p.price, 0)
    .toFixed(2);

  // ───────────────────────────────────────────────────────────────
  return (
    <Navbar
      expand="md"
      style={{ backgroundColor: '#2c3e50' }}
      variant="dark"
      className="shadow-sm"
    >
      <Container fluid>
        {/* Brand */}
        <Navbar.Brand
          className="fw-bold fs-4 text-light d-flex align-items-center logo-hover"
          href="https://www.youtube.com/shorts/cUWpHRrMFOQ"
          target="_blank"
          rel="noopener noreferrer"
          style={{ cursor: 'pointer', textDecoration: 'none' }}
        >
          <i className="bi bi-controller me-2"></i>Fancy Store
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* ─── Left links ────────────────────────────── */}
          <BootstrapNav className="me-auto">
            {items.map((item) => {
              const normalized = item.toLowerCase().replace(' ', '');
              const route =
                normalized === 'productlist'
                  ? '/products'
                  : normalized === 'home'
                  ? '/'
                  : normalized === 'contact'
                  ? '/contact'
                  : null;
              return (
                route && (
                  <NavLink key={item} to={route} end className={getClass}>
                    {item}
                  </NavLink>
                )
              );
            })}

            {/* Offers (siempre pública) */}
            <NavLink to="/offers" end className={getClass}>
              Offers
            </NavLink>

            {/* Admin sólo para admin */}
            {isAdmin && (
              <NavLink to="/offers/admin" end className={getClass}>
                Admin
              </NavLink>
            )}
          </BootstrapNav>

          {/* ─── Right section ─────────────────────────── */}
          {isAuth ? (
            <>
              {/* Cart (solo logueados) */}
              <div className="d-flex align-items-center ms-md-3 mt-2 mt-md-0">
                <FaShoppingCart
                  size={22}
                  className="ms-3 text-white"
                  title="Cart"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setShowCart(true)}
                />
              </div>

              <Button
                variant="outline-light"
                size="sm"
                className="ms-2"
                onClick={logout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="btn btn-outline-light btn-sm ms-2"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="btn btn-success btn-sm ms-2"
              >
                Sign Up
              </NavLink>
            </>
          )}
        </Navbar.Collapse>

        {/* ─── Cart modal ─────────────────────────────── */}
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
                      {item.quantity} × U$S {item.price.toFixed(2)} ={' '}
                      <strong>
                        U$S {(item.quantity * item.price).toFixed(2)}
                      </strong>
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
                navigate('/checkout');
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