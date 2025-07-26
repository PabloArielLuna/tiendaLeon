import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Modal, Form } from 'react-bootstrap';
import { SuggestedContext } from './SuggestedContext';
import { CardStyled } from './UI/CardStyled';
import { ButtonStyled } from './UI/ButtonStyled';
import Swal from 'sweetalert2';

export default function Offers({ onAddToCart }) {
  const { items, loading, error } = useContext(SuggestedContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [quantityError, setQuantityError] = useState(false);

  useEffect(() => {
    const result = items.filter(p =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFiltered(result);
  }, [searchTerm, items]);

  const toggleDescription = (id) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleDetailOpen = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setQuantityError(false);
  };

  const handleDetailClose = () => {
    setSelectedProduct(null);
  };

  if (loading) return <div className="text-center my-5"><Spinner animation="border" /></div>;
  if (error) return <p className="text-danger text-center">{error}</p>;

  return (
    <Container className="my-4">
      <h2 className="mb-4">Special Offers</h2>

      <Form className="mb-3">
        <Form.Group controlId="search">
          <Form.Control
            type="text"
            placeholder="Search product by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>
      </Form>

      <p className="text-muted mb-4">
        {filtered.length === 1
          ? <><strong>1</strong> product is being displayed.</>
          : <><strong>{filtered.length}</strong> products are being displayed.</>}
      </p>

      <Row>
        {filtered.map(product => {
          const isExpanded = expandedDescriptions[product.id];
          const description = isExpanded
            ? product.description
            : product.description?.slice(0, 80) + (product.description?.length > 80 ? '...' : '');

          return (
            <Col key={product.id} md={4} className="mb-4">
              <CardStyled className="card-hover">
                <Card.Img variant="top" src={product.image} className="card-img-top" />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-semibold fs-5">{product.title}</Card.Title>
                  <Card.Text style={{ minHeight: '3rem' }} className="text-muted">
                    {description}
                  </Card.Text>
                  {product.description.length > 80 && (
                    <Button
                      variant="link"
                      className="p-0 text-decoration-none text-primary mb-2"
                      onClick={() => toggleDescription(product.id)}
                    >
                      {isExpanded ? 'See less ▲' : 'See more ▼'}
                    </Button>
                  )}
                  <Card.Text className="fw-bold text-success mt-auto">
                    U$S {product.price.toFixed(2)}
                  </Card.Text>
                  <ButtonStyled
                  className="mt-2"
                  $variant="add"
                  onClick={() => {
                    onAddToCart(product);
                    Swal.fire({
                      title: 'Product added',
                      text: `"${product.title}" added to cart.`,
                      icon: 'success',
                      confirmButtonText: 'OK'
                    });
                  }}
                >
                  Add
                </ButtonStyled>
                <ButtonStyled
                  className="mt-2"
                  $variant="details"
                  onClick={() => handleDetailOpen(product)}
                >
                  See details
                </ButtonStyled>
                </Card.Body>
              </CardStyled>
            </Col>
          );
        })}
      </Row>

      {selectedProduct && (
        <Modal show onHide={handleDetailClose} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedProduct.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex flex-column flex-md-row">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.title}
              className="img-fluid mb-3 mb-md-0 me-md-4"
              style={{ maxHeight: '300px', objectFit: 'contain', width: '50%' }}
            />
            <div>
              <p className="text-muted">{selectedProduct.description}</p>
              <h5 className="text-success mb-3">U$S {selectedProduct.price.toFixed(2)}</h5>
              <Form.Group className="mb-3" controlId="quantity">
                <Form.Label>Quantity:</Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val)) {
                      setQuantity(val);
                      setQuantityError(val < 1);
                    }
                  }}
                  style={{ width: '100px' }}
                />
                {quantityError && (
                  <p className="text-danger mt-1">Please enter a valid quantity.</p>
                )}
              </Form.Group>
              <p className="fw-bold text-primary">
                Total: U$S {(selectedProduct.price * quantity).toFixed(2)}
              </p>
              <div className="bg-light p-3 rounded shadow-sm">
                <p><i className="bi bi-check-circle text-success me-2"></i> Free shipping over U$S 50</p>
                <p><i className="bi bi-clock-history text-warning me-2"></i> Delivery in 2–3 days</p>
                <p><i className="bi bi-arrow-counterclockwise text-info me-2"></i> Free returns in 30 days</p>
                <p><i className="bi bi-shield-lock-fill text-primary me-2"></i> Secure purchase</p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleDetailClose}>Close</Button>
            <Button
              variant="success"
              disabled={quantity < 1}
              onClick={() => {
                onAddToCart(selectedProduct, quantity);
                Swal.fire({
                  title: 'Product added',
                  text: `"${selectedProduct.title}" x${quantity} added to cart.`,
                  icon: 'success',
                  confirmButtonText: 'OK'
                });
                handleDetailClose();
              }}
            >
              Add to cart
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
}