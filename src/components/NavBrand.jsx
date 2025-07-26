// src/components/NavBrand.jsx
import React from 'react';
import { Brand } from './UI/NavbarStyled'; // Asegurate que esté bien exportado

function NavBrand() {
  return (
    <Brand
      href="https://www.youtube.com/shorts/cUWpHRrMFOQ"
      target="_blank"
      rel="noopener noreferrer"
    >
      <i className="bi bi-controller"></i>Fancy Store
    </Brand>
  );
}

export default NavBrand;