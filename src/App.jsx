import React, { useState } from "react";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ProductList from "./components/ProductList";
import Contact from "./components/Contact";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const usuario = "Pablo Luna";
  const tipo = "Administrator";
  const navItems = ["Home", "Products List", "Contact"];
  const [seccion, setSeccion] = useState("Home");

  const renderContenido = () => {
    switch (seccion) {
      case "Home":
        return <Home />;
      case "Products List":
        return <ProductList />;
      case "Contact":
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header tipo={tipo} usuario={usuario} irHome={() => setSeccion("Home")} />
      <Nav items={navItems} onSeleccion={setSeccion} seccionActiva={seccion} />
      <main className="flex-grow-1 p-3">{renderContenido()}</main>
      <Footer />
    </div>
  );
}

export default App;
