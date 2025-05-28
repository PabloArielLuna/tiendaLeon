import React from "react";
import { Container } from "react-bootstrap";
import { FaInstagram, FaWhatsapp, FaFacebook, FaXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-4 mt-auto">
      <Container>
        <div className="mb-3 d-flex justify-content-center gap-4">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon"
          >
            <FaInstagram />
          </a>
          <a
            href="https://wa.me/541100000000"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon"
          >
            <FaWhatsapp />
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon"
          >
            <FaFacebook />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon"
          >
            <FaXTwitter />
          </a>
        </div>
        <p className="mb-0 small">© 2025 Tienda León. All rights reserved.</p>
      </Container>

      {/* Estilos internos */}
      <style jsx="true">{`
        .footer-icon {
          color: white;
          font-size: 1.5rem;
          transition: color 0.3s ease, transform 0.3s ease;
        }

        .footer-icon:hover {
          color: #0dcaf0; /* Celeste Bootstrap */
          transform: scale(1.2);
        }
      `}</style>
    </footer>
  );
}

export default Footer;