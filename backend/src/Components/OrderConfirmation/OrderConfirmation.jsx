import React from 'react';
import { useLocation } from 'react-router-dom';

const OrderConfirmation = ({ cartItems, setCartItems }) => {
  const location = useLocation();
  const selectedIds = location.state?.selectedItems || [];
  
  console.log('Received selected IDs:', selectedIds); // Debug log

  // Ensure IDs are strings for comparison
  const selectedIdsAsString = selectedIds.map(id => id.toString());
  
  const selectedItems = cartItems.filter(item => selectedIdsAsString.includes(item.id.toString()));

  console.log('Filtered Selected Items:', selectedItems); // Debug log

  const handleIncrement = (id) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedItems);
  };

  const handleDecrement = (id) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedItems);
  };

  const totalPrice = selectedItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="order-confirmation">
      <h1>Order Confirmation</h1>
      {selectedItems.length === 0 ? (
        <p>No items selected.</p>
      ) : (
        selectedItems.map((item) => (
          <div key={item.id} className="cart-item">
            <h3>{item.title}</h3>
            <div className="quantity-control">
              <button onClick={() => handleDecrement(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncrement(item.id)}>+</button>
            </div>
          </div>
        ))
      )}
      <h2>Total: ₹{totalPrice}</h2>
      <button onClick={() => window.location.href = "/payment"}>
        Confirm Order
      </button>
    </div>
  );
};

export default OrderConfirmation;
