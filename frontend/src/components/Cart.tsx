import React from "react";
import { useCart } from "../components/context/CartContext";

const Cart: React.FC = () => {
  const { cart, removeFromCart } = useCart();

  const getTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h2>Your Cart</h2>

          {cart.length === 0 ? (
            <div className="alert alert-info">No items in the cart.</div>
          ) : (
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((book) => (
                  <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>${book.price.toFixed(2)}</td>
                    <td>{book.quantity}</td>
                    <td>${(book.price * book.quantity).toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => removeFromCart(book.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} className="text-end fw-bold">
                    Total:
                  </td>
                  <td colSpan={2} className="fw-bold">
                    ${getTotalPrice()}
                  </td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
