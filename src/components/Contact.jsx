import React from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import {
  FaUser,
  FaEnvelope,
  FaComment,
  FaPhone,
  FaClipboardList,
  FaMapMarkedAlt
} from 'react-icons/fa';

function Contact() {
  return (
    <Container className="my-5">
      <div
        style={{
          backgroundColor: '#f0f4f8',
          padding: '2rem',
          borderRadius: '1rem',
          border: '1px solid #d9e2ec',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        }}
      >
        <h2 className="mb-4 text-center">Contact Us</h2>
        <Form
          action="https://formspree.io/f/xanogpwp"
          method="POST"
        >
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label><FaUser className="me-2" />Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  required
                  className="input-hover"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label><FaEnvelope className="me-2" />Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  required
                  className="input-hover"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="phone">
                <Form.Label><FaPhone className="me-2" />Phone</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  placeholder="Your phone number"
                  className="input-hover"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label><FaClipboardList className="me-2" />Reason</Form.Label>
                <Form.Select name="reason" className="input-hover">
                  <option>Choose an option</option>
                  <option>General Inquiry</option>
                  <option>Support</option>
                  <option>Feedback</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>How did you hear about us?</Form.Label>
                <div className="ms-2">
                  <Form.Check
                    type="radio"
                    label="Google"
                    name="source"
                    value="Google"
                    inline
                  />
                  <Form.Check
                    type="radio"
                    label="Instagram"
                    name="source"
                    value="Instagram"
                    inline
                  />
                  <Form.Check
                    type="radio"
                    label="Referral"
                    name="source"
                    value="Referral"
                    inline
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Topics you're interested in:</Form.Label>
                <div className="ms-2">
                  <Form.Check type="checkbox" label="Promotions" name="interests" value="Promotions" />
                  <Form.Check type="checkbox" label="Events" name="interests" value="Events" />
                  <Form.Check type="checkbox" label="Partnerships" name="interests" value="Partnerships" />
                </div>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3" controlId="message">
                <Form.Label><FaComment className="me-2" />Message</Form.Label>
                <Form.Control
                  as="textarea"
                  name="message"
                  rows={10}
                  placeholder="Write your message here..."
                  required
                  className="input-hover"
                />
              </Form.Group>

              <Button
                style={{
                  backgroundColor: '#4CAF93',
                  border: 'none',
                  color: '#fff',
                  width: '100%',
                }}
                className="btn-glow mt-2"
                type="submit"
              >
                Send
              </Button>
            </Col>
          </Row>
        </Form>

        {/* Mapa */}
        <div className="mt-5">
          <h5 className="mb-3 text-center"><FaMapMarkedAlt className="me-2" />Find us here</h5>
          <div className="ratio ratio-16x9">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.0217358827217!2d-58.3723040253921!3d-34.60361187295426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a3353283598701%3A0xff14e7edde2f5152!2sPalacio%20Libertad%2C%20Centro%20Cultural%20Domingo%20Faustino%20Sarmiento!5e0!3m2!1ses!2sar!4v1748472952768!5m2!1ses!2sar"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Tienda León"
            ></iframe>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Contact;