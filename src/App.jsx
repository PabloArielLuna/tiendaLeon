// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header    from './components/Header';
import Nav       from './components/Nav';
import Footer    from './components/Footer';
import Home      from './components/Home';
import ProductList from './components/ProductList';
import Contact   from './components/Contact';
import Checkout  from './components/Checkout';
import Login     from './components/Login';
import SignUp    from './components/SignUp';
import Offers    from './components/Offers';
import OffersAdmin from './components/OffersAdmin';
import ProtectedRoute from './components/ProtectedRoute';

import { AuthProvider } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // ─── Estados y datos ─────────────────────────────────────────
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seccionActiva, setSeccionActiva] = useState('Home');

  // ─── Carga inicial de productos ───────────────────────────────
  useEffect(() => {
    setLoading(true);
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        const withStock = data.map(p => ({ ...p, stock: 10 }));
        setProducts(withStock);
        setFilteredProducts(withStock);
        setLoading(false);
      })
      .catch(() => {
        setError('Error loading products.');
        setLoading(false);
      });
  }, []);

  // ─── Helpers del carrito ───────────────────────────────────────
  const handleAddToCart = (product, quantity = 1) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) {
        return prev.map(i =>
          i.id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const handleRemoveFromCart = id =>
    setCart(prev => prev.filter(i => i.id !== id));

  // ─── Búsqueda de productos ────────────────────────────────────
  const handleSearch = term =>
    setFilteredProducts(
      products.filter(p =>
        p.title.toLowerCase().includes(term.toLowerCase())
      )
    );

  // ─── Render ───────────────────────────────────────────────────
  return (
    <Router>
      <AuthProvider>
        <div className="d-flex flex-column min-vh-100">
          <Header />
          <ToastContainer position="top-center" autoClose={3000} />

          <Nav
            items={['Home', 'Product List', 'Offers', 'Contact']}
            onSeleccion={setSeccionActiva}
            seccionActiva={seccionActiva}
            cart={cart}
            removeFromCart={handleRemoveFromCart}
          />

          <main className="flex-fill">
            <Routes>

              {/* ─── HOME ────────────────────────────────────────── */}
              <Route path="/" element={
                <main className="home-container">
                  <Home />
                </main>
              }/>

              {/* ─── LOGIN ───────────────────────────────────────── */}
              <Route path="/login" element={
                <main className="auth-container">
                  <Login />
                </main>
              }/>

              {/* ─── SIGN UP ─────────────────────────────────────── */}
              <Route path="/signup" element={
                <main className="auth-container">
                  <SignUp />
                </main>
              }/>

              {/* ─── PRODUCT LIST ────────────────────────────────── */}
              <Route path="/products" element={
                <ProductList
                  products={filteredProducts}
                  loading={loading}
                  error={error}
                  onSearch={handleSearch}
                  onAddToCart={handleAddToCart}
                />
              }/>

              {/* ─── OFFERS PÚBLICAS ─────────────────────────────── */}
              <Route path="/offers" element={
                <Offers onAddToCart={handleAddToCart} />
              }/>

              {/* ─── CONTACT ─────────────────────────────────────── */}
              <Route path="/contact" element={<Contact />} />

              {/* ─── CHECKOUT (protegido) ───────────────────────── */}
              <Route element={<ProtectedRoute allowedRoles={['user','admin']} />}>
                <Route path="/checkout" element={<Checkout cart={cart} />} />
              </Route>

              {/* ─── OFFERS ADMIN (solo admin) ───────────────────── */}
              <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="/offers/admin" element={<OffersAdmin />} />
              </Route>

              {/* ─── FALLBACK 404 → HOME ────────────────────────── */}
              <Route path="*" element={
                <main className="home-container">
                  <Home />
                </main>
              }/>

            </Routes>
          </main>

          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;