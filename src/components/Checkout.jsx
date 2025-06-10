import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Checkout({ cart }) {
    const navigate = useNavigate();

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

    return (
        <Container className="my-5">
            <h2 className="mb-4">Checkout</h2>

            {cart.length === 0 ? (
                <p>Your cart is empty. <span className="text-primary" style={{ cursor: 'pointer' }} onClick={() => navigate("/products")}>Go back to shop</span>.</p>
            ) : (
                <>
                    <Row className="g-3">
                        {cart.map(item => (
                            <Col key={item.id} md={6} lg={4}>
                                <Card className="h-100 shadow-sm">
                                    <Card.Img variant="top" src={item.image} style={{ height: '200px', objectFit: 'contain' }} />
                                    <Card.Body>
                                        <Card.Title>{item.title}</Card.Title>
                                        <Card.Text>
                                            Quantity: <strong>{item.quantity}</strong><br />
                                            Unit Price: U$S {item.price.toFixed(2)}<br />
                                            Subtotal: <strong>U$S {(item.quantity * item.price).toFixed(2)}</strong>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    <div className="mt-4 text-end">
                        <h4>Total: <span className="text-success">U$S {total}</span></h4>
                        <Button variant="success" size="lg" className="mt-3" disabled>
                            Confirm Purchase (coming soon)
                        </Button>
                    </div>
                </>
            )}
        </Container>
    );
}

export default Checkout;