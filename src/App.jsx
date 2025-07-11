import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './components/Home';
import ProductList from './components/ProductList';
import Contact from './components/Contact';
import Checkout from './components/Checkout';
import Login from './components/Login';
import Offers from './components/Offers';
import OffersAdmin from './components/OffersAdmin';
import SignUp from './components/SignUp';
import AuthProvider from './contexts/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seccionActiva, setSeccionActiva] = useState('Home');

  // ─── Load products ─────────────────────────────────────────────
  useEffect(() => {
    setLoading(true);
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        const withStock = data.map((p) => ({ ...p, stock: 10 }));
        setProducts(withStock);
        setFilteredProducts(withStock);
        setLoading(false);
      })
      .catch(() => {
        setError('Error loading products.');
        setLoading(false);
      });
  }, []);

  // ─── Cart helpers ──────────────────────────────────────────────
  const handleAddToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      return existing
        ? prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        )
        : [...prev, { ...product, quantity }];
    });
  };

  const handleRemoveFromCart = (id) =>
    setCart((prev) => prev.filter((i) => i.id !== id));

  const handleSearch = (term) =>
    setFilteredProducts(
      products.filter((p) =>
        p.title.toLowerCase().includes(term.toLowerCase())
      )
    );

  // ─── UI ────────────────────────────────────────────────────────
  return (
    <Router>
      <AuthProvider>
        <div className="d-flex flex-column min-vh-100">
          <Header />
          <Nav
            items={['Home', 'Product List', 'Offers', 'Contact']}
            onSeleccion={setSeccionActiva}
            seccionActiva={seccionActiva}
            cart={cart}
            removeFromCart={handleRemoveFromCart}
          />
          <main className="flex-fill">
            <Routes>
              {/* Públicas */}
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/products"
                element={
                  <ProductList
                    products={filteredProducts}
                    loading={loading}
                    error={error}
                    onSearch={handleSearch}
                    onAddToCart={handleAddToCart}
                  />
                }
              />
              <Route
                path="/offers"
                element={<Offers onAddToCart={handleAddToCart} />}
              />
              <Route path="/contact" element={<Contact />} />

              {/* Protegidas para cualquier usuario logueado */}
              <Route element={<ProtectedRoute allowedRoles={['user', 'admin']} />}>
                <Route path="/checkout" element={<Checkout cart={cart} />} />
              </Route>

              {/* Solo admin */}
              <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="/offers/admin" element={<OffersAdmin />} />
              </Route>

              {/* Fallback 404 → Home */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;