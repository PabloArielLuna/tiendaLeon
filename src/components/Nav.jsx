import React, { useContext, useState } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { AuthContext } from '../contexts/AuthContext';
import NavBrand from './NavBrand';
import NavLinks from './NavLinks';
import NavAuthButtons from './NavAuthButtons';
import CartModal from './CartModal';
import { NavbarWrapper } from './UI/NavbarStyled';

function Nav({ items, cart, removeFromCart }) {
  const { isAuth, isAdmin, logout } = useContext(AuthContext);
  const [showCart, setShowCart] = useState(false);

  return (
    <NavbarWrapper $expand="md" $variant="dark" className="shadow-sm">
  <Container fluid>
    <NavBrand />
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
          <NavLinks items={items} isAdmin={isAdmin} />
          <NavAuthButtons
            isAuth={isAuth}
            logout={logout}
            setShowCart={setShowCart}
          />
        </Navbar.Collapse>
        <CartModal
          show={showCart}
          onClose={() => setShowCart(false)}
          cart={cart}
          removeFromCart={removeFromCart}
        />
      </Container>
    </NavbarWrapper> // <== este es el cierre correcto
  );
}

export default Nav;