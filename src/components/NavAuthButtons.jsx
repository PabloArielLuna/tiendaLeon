// src/components/NavAuthButtons.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { ButtonStyled } from './UI/ButtonStyled';

function NavAuthButtons({ isAuth, logout, setShowCart }) {
  return isAuth ? (
    <>
      <div className="d-flex align-items-center ms-md-3 mt-2 mt-md-0">
        <FaShoppingCart
          size={22}
          className="ms-3 text-white"
          title="Cart"
          style={{ cursor: 'pointer' }}
          onClick={() => setShowCart(true)}
        />
      </div>
      <ButtonStyled
        as="button"
        $variant="logout"
        size="sm"
        className="ms-2"
        onClick={logout}
      >
        Logout
      </ButtonStyled>
    </>
  ) : (
    <>
      <ButtonStyled as={Link} to="/login" $variant="details" className="ms-2">
        Login
      </ButtonStyled>
      <ButtonStyled as={Link} to="/signup" $variant="add" className="ms-2">
        Sign Up
      </ButtonStyled>
    </>
  );
}

export default NavAuthButtons;