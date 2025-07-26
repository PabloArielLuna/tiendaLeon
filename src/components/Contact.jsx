import React from 'react';
import { Container } from 'react-bootstrap';
import ContactForm from './ContactForm';
import { FaMapMarkedAlt } from 'react-icons/fa';

export default function Contact() {
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
        <ContactForm />
        <div className="mt-5">
          <h5 className="mb-3 text-center">
            <FaMapMarkedAlt className="me-2" />Find us here
          </h5>
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