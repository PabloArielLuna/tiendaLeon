import React from 'react';
import { Modal } from 'react-bootstrap';
import { ButtonStyled } from './UI/ButtonStyled';
import { CartItem, TotalStyled } from './UI/CartModalStyled';
import { useNavigate } from 'react-router-dom';

function CartModal({ show, onClose, cart, removeFromCart }) {
  const navigate = useNavigate();
  const total = cart
    .reduce((acc, p) => acc + p.quantity * p.price, 0)
    .toFixed(2);

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>My Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item) => (
              <CartItem key={item.id}>
                <strong>{item.title}</strong>
                <div>
                  {item.quantity} × U$S {item.price.toFixed(2)} ={' '}
                  <span className="subtotal">
                    U$S {(item.quantity * item.price).toFixed(2)}
                  </span>
                </div>
                <ButtonStyled
                  $variant="remove"
                  size="sm"
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </ButtonStyled>
              </CartItem>
            ))}
            <TotalStyled>Total: U$S {total}</TotalStyled>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <ButtonStyled as="button" $variant="close" onClick={onClose}>
          Close
        </ButtonStyled>
        <ButtonStyled
          as="button"
          $variant="add"
          disabled={cart.length === 0}
          onClick={() => {
            onClose();
            window.scrollTo(0, 0);
            navigate('/checkout');
          }}
        >
          Go to Checkout
        </ButtonStyled>
      </Modal.Footer>
    </Modal>
  );
}

export default CartModal;