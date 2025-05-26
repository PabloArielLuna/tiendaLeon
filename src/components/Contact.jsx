import React from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaComment, FaPhone, FaClipboardList } from 'react-icons/fa';

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
        <h2 className="mb-4">Contact Us</h2>
        <Form
          action="https://formspree.io/f/xanogpwp"
          method="POST"
        >
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
            <div className="ms-3">
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

          <Form.Group className="mb-3" controlId="message">
            <Form.Label><FaComment className="me-2" />Message</Form.Label>
            <Form.Control
              as="textarea"
              name="message"
              rows={4}
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
            }}
            className="btn-glow mt-2"
            type="submit"
          >
            Send
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default Contact;