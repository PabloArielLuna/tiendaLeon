import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ProductList from "./components/ProductList";
import Contact from "./components/Contact";
import PrivateRoute from './components/PrivateRoute';
import AdminPage from './components/AdminPage';
import Login from './components/Login';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seccionActiva, setSeccionActiva] = useState("Home");

  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        const withStock = data.map((p) => ({ ...p, stock: 10 }));
        setProducts(withStock);
        setFilteredProducts(withStock);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error loading products.");
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { ...product, quantity }];
      }
    });
  };

  const handleRemoveFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSearch = (term) => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header usuario="Pablo" tipo="Admin" irHome={() => setSeccionActiva("Home")} />
        <Nav
          items={["Home", "Product List", "Contact"]}
          onSeleccion={setSeccionActiva}
          seccionActiva={seccionActiva}
          cart={cart}
          removeFromCart={handleRemoveFromCart}
        />
        <main className="flex-fill">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={
              <ProductList
                products={filteredProducts}
                loading={loading}
                error={error}
                onSearch={handleSearch}
                onAddToCart={handleAddToCart}
              />
            } />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={
              <PrivateRoute>
                <AdminPage />
              </PrivateRoute>
            } />
          </Routes>

        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;