import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BookList from "./components/BookList";
import Cart from "./components/Cart";
import AdminBooks from "./components/AdminBooks";
import { CartProvider, useCart } from "./components/context/CartContext";

// Navigation bar with cart badge
const Navigation: React.FC = () => {
  const { cart } = useCart();

  return (
    <div className="text-center my-3">
      <h1>📚 Bookstore</h1>
      <Link to="/" className="btn btn-primary m-2">
        Continue Shopping
      </Link>
      <Link to="/cart" className="btn btn-success m-2 position-relative">
        🛒 View Cart
        {cart.length > 0 && (
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            style={{ fontSize: "0.6rem" }}
          >
            {cart.length}
          </span>
        )}
      </Link>
      <Link to="/admin" className="btn btn-warning m-2">
        Admin
      </Link>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<AdminBooks />} /> {/* ✅ NEW */}
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
