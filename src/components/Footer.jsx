import React from "react";
import { Container } from "react-bootstrap";
import {
  FaInstagram,
  FaWhatsapp,
  FaFacebook,
  FaXTwitter,
} from "react-icons/fa6";
import {
  FooterWrapper,
  IconRow,
  FooterIcon,
  FooterText,
} from "./UI/StyledFooter"; // Asegurate del path correcto

function Footer() {
  return (
    <FooterWrapper>
      <Container>
        <IconRow>
          <FooterIcon
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </FooterIcon>
          <FooterIcon
            href="https://wa.me/541100000000"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp />
          </FooterIcon>
          <FooterIcon
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </FooterIcon>
          <FooterIcon
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaXTwitter />
          </FooterIcon>
        </IconRow>
        <FooterText>© 2025 Tienda León. All rights reserved.</FooterText>
      </Container>
    </FooterWrapper>
  );
}

export default Footer;