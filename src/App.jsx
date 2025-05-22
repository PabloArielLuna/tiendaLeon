import React, { useState } from 'react'
import Header from './components/Header'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './components/Home'
import ProductList from './components/ProductList'
import Contact from './components/Contact'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const usuario = "Pablo Luna"
  const tipo = "Administrador"
  const navItems = ["Inicio", "Lista de productos", "Contacto"]
  const [seccion, setSeccion] = useState("Inicio")

  const renderContenido = () => {
    switch (seccion) {
      case "Inicio":
        return <Home />
      case "Lista de productos":
        return <ProductList />
      case "Contacto":
        return <Contact />
      default:
        return <Home />
    }
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header tipo={tipo} usuario={usuario} />
      <Nav items={navItems} onSeleccion={setSeccion} />
      <main className="flex-grow-1 p-3">
        {renderContenido()}
      </main>
      <Footer />
    </div>
  )
}

export default App
