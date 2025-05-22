import React from "react";
import { Navbar } from "react-bootstrap";

function Header({usuario, tipo}) {
  return (
    <Navbar bg="dark" variant="dark" className="px-3">
      <Navbar.Brand href="#home">Tienda León</Navbar.Brand>
      <Navbar.Text className = "ms-auto text-white">
        {usuario} - {tipo}
        </Navbar.Text>
    </Navbar>
  );
}

export default Header;