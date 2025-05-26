import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
import '../ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading products:', err);
        setLoading(false);
      });
  }, []);

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
      <Row>
        {products.map(product => {
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
                </Card.Body>
              </Card>

            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default ProductList;