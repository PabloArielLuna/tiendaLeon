import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Form, Modal } from 'react-bootstrap';
import ProductDetailModal from './ProductDetailModal';
import { CardStyled } from './UI/CardStyled';
import { ButtonStyled } from './UI/ButtonStyled';
import Swal from 'sweetalert2';

function ProductList({ products, loading, error, onAddToCart }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [quantityError, setQuantityError] = useState(false);

  useEffect(() => {
    setFilteredProducts(
      products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, products]);

  const toggleDescription = (id) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [id]: !prev[id],
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

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p className="mt-3">Loading products...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <p className="text-danger">{error}</p>
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
          const description = isExpanded ? product.description : product.description.slice(0, 80) + (product.description.length > 80 ? '...' : '');

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
                    <ButtonStyled
                      as="button"
                      type="button"
                      className="mb-2"
                      $variant="toggle"
                      onClick={() => toggleDescription(product.id)}
                    >
                      {isExpanded ? 'See less ▲' : 'See more ▼'}
                    </ButtonStyled>

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
        <ProductDetailModal
          product={selectedProduct}
          quantity={quantity}
          setQuantity={setQuantity}
          quantityError={quantityError}
          setQuantityError={setQuantityError}
          onAddToCart={onAddToCart}
          handleClose={handleDetailClose}
        />
      )}
    </Container>
  );
}

export default ProductList;