import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
import '../ProductList.css';
import { Modal, Form } from 'react-bootstrap';

function ProductList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [quantityError, setQuantityError] = useState(false);

  const handleDetailOpen = (product) => {
  setSelectedProduct(product);
  setQuantity(1);
  setQuantityError(false); // Resetea el error
};

  const handleDetailClose = () => {
    setSelectedProduct(null);
  };

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        const stockAmount = 10; // ✨ Cambiá este valor si querés más o menos stock
        const dataWithStock = data.map(p => ({
          ...p,
          stock: stockAmount,
        }));
        setProducts(dataWithStock);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading products:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const toggleDescription = (id) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p className="mt-3">Loading products...</p>
      </Container>
    );
  }

  return (
    <Container>
      <h2 className="mb-4">Products List</h2>
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
        {filteredProducts.length === 1 ? (
          <><strong>1</strong> product is being displayed.</>
        ) : (
          <><strong>{filteredProducts.length}</strong> products are being displayed.</>
        )}
      </p>
      <Row>
        {filteredProducts.map(product => {
          const isExpanded = expandedDescriptions[product.id];
          const description = isExpanded
            ? product.description
            : product.description.slice(0, 80) + (product.description.length > 80 ? '...' : '');
          return (
            <Col key={product.id} md={4} className="mb-4">
              <Card
                className="h-100 shadow-sm card-hover"
                style={{
                  backgroundColor: '#f0f4f8',
                  border: '1px solid #d9e2ec',
                  borderRadius: '1rem',
                }}
              >
                <Card.Img
                  variant="top"
                  src={product.image}
                  className="card-img-hover p-3"
                  style={{ height: '220px', objectFit: 'contain' }}
                />
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
                      {isExpanded ? (
                        <>
                          See less <i className="fas fa-chevron-up"></i>
                        </>
                      ) : (
                        <>
                          See more <i className="fas fa-chevron-down"></i>
                        </>
                      )}
                    </Button>
                  )}
                  <Card.Text className="fw-bold text-success mt-auto">
                    U$S {product.price.toFixed(2)}
                  </Card.Text>
                  <Button
                    style={{
                      backgroundColor: '#4CAF93',
                      border: 'none',
                      color: '#fff',
                    }}
                    variant="primary"
                    className="btn-glow mt-2"
                    onClick={() =>
                      Swal.fire({
                        title: 'Product added',
                        text: `"${product.title}" added to cart.`,
                        icon: 'success',
                        confirmButtonText: 'OK',
                      })
                    }
                  >
                    Add
                  </Button>
                  <Button
                    variant="outline-secondary"
                    className="mt-2"
                    onClick={() => handleDetailOpen(product)}
                  >
                    See details
                  </Button>
                </Card.Body>
              </Card>
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
              <p className="text-muted">Available stock: {selectedProduct.stock}</p>
              <p className="text-muted">{selectedProduct.description}</p>
              <h5 className="text-success mb-3">U$S {selectedProduct.price.toFixed(2)}</h5>
              <Form.Group className="mb-3" controlId="quantity">
                <Form.Label>Quantity:</Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  max={selectedProduct.stock}
                  value={quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val)) {
                      setQuantity(val);
                      setQuantityError(val > selectedProduct.stock || val < 1);
                      if (val > selectedProduct.stock) {
                        setQuantityError(true);
                      } else {
                        setQuantityError(false);
                      }
                    }
                  }}
                  style={{ width: '100px' }}
                />
                {quantityError && (
                  <p className="text-danger mt-1">
                    You cannot buy more than the available stock ({selectedProduct.stock}).
                  </p>
                )}
              </Form.Group>
              <p className="fw-bold text-primary">
                Total: U$S {(selectedProduct.price * quantity).toFixed(2)}
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
            <Button variant="secondary" onClick={handleDetailClose}>
              Close
            </Button>
            <Button
              variant="success"
              disabled={quantity > selectedProduct.stock}
              onClick={() => {
                Swal.fire({
                  title: 'Product added',
                  text: `"${selectedProduct.title}" x${quantity} added to cart.`,
                  icon: 'success',
                  confirmButtonText: 'OK',
                });
                handleDetailClose(); // opcional: cerrar modal después de agregar
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

export default ProductList;