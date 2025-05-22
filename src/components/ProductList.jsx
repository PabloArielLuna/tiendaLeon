import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al cargar los productos:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p className="mt-3">Cargando productos...</p>
      </Container>
    );
  }

  return (
    <Container>
      <h2 className="mb-4">Lista de Productos</h2>
      <Row>
        {products.map(product => (
          <Col key={product.id} md={4} className="mb-4">
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={product.image}
                style={{ height: '200px', objectFit: 'contain' }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{product.title}</Card.Title>

                <Card.Text className="text-truncate">
                  {product.description}
                </Card.Text>

                <Card.Text className="fw-bold text-success mt-2">
                  ${product.price.toFixed(2)}
                </Card.Text>

                <Button
                  variant="primary"
                  onClick={() =>
                    Swal.fire({
                      title: 'Producto agregado',
                      text: `"${product.title}" se agregó al carrito.`,
                      icon: 'success',
                      confirmButtonText: 'OK',
                    })
                  }
                  className="mt-auto"
                >
                  Agregar
                </Button>
              </Card.Body>

            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductList;