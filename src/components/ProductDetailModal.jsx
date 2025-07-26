import React from 'react';
import { Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { ButtonStyled } from './UI/ButtonStyled';

export default function ProductDetailModal({
  product,
  quantity,
  setQuantity,
  quantityError,
  setQuantityError,
  onAddToCart,
  handleClose
}) {
  if (!product) return null;

  return (
    <Modal show onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{product.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="d-flex flex-column flex-md-row">
        <img
          src={product.image}
          alt={product.title}
          className="img-fluid mb-3 mb-md-0 me-md-4"
          style={{ maxHeight: '300px', objectFit: 'contain', width: '50%' }}
        />
        <div>
          <p className="text-muted">Available stock: {product.stock}</p>
          <p className="text-muted">{product.description}</p>
          <h5 className="text-success mb-3">U$S {product.price.toFixed(2)}</h5>

          <Form.Group className="mb-3" controlId="quantity">
            <Form.Label>Quantity:</Form.Label>
            <Form.Control
              type="number"
              min={1}
              max={product.stock}
              value={quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (!isNaN(val)) {
                  setQuantity(val);
                  setQuantityError(val > product.stock || val < 1);
                }
              }}
              style={{ width: '100px' }}
            />
            {quantityError && (
              <p className="text-danger mt-1">
                You cannot buy more than the available stock ({product.stock}).
              </p>
            )}
          </Form.Group>

          <p className="fw-bold text-primary">
            Total: U$S {(product.price * quantity).toFixed(2)}
          </p>

          <div className="bg-light p-3 rounded shadow-sm">
            <p><i className="bi bi-check-circle text-success me-2"></i> Free shipping on orders over U$S 50</p>
            <p><i className="bi bi-clock-history text-warning me-2"></i> Delivery in 2-3 business days</p>
            <p><i className="bi bi-arrow-counterclockwise text-info me-2"></i> Free returns within 30 days</p>
            <p><i className="bi bi-shield-lock-fill text-primary me-2"></i> 100% secure purchase</p>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <ButtonStyled as="button" $variant="close" onClick={handleClose}>
          Close
        </ButtonStyled>

        <ButtonStyled
          as="button"
          $variant="add"
          disabled={quantity > product.stock}
          onClick={() => {
            onAddToCart(product, quantity);
            Swal.fire({
              title: 'Product added',
              text: `"${product.title}" x${quantity} added to cart.`,
              icon: 'success',
              confirmButtonText: 'OK'
            });
            handleClose();
          }}
        >
          Add to cart
        </ButtonStyled>
      </Modal.Footer>
    </Modal>
  );
}