import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = ({ cartItems, setCartItems, deliveryCharge }) => {
  const navigate = useNavigate();

  const [selectedItems, setSelectedItems] = useState(
    cartItems.reduce((acc, item) => ({ ...acc, [item.id]: false }), {})
  );

  const handleIncrement = (id) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedItems);
  };

  const handleDecrement = (id) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedItems);
  };

  const handleRemove = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
  };

  const handleCheckboxChange = (id) => {
    setSelectedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Check if any item is selected
  const isAnyItemSelected = Object.values(selectedItems).some((isSelected) => isSelected);

  const totalBasePrice = cartItems.reduce(
    (acc, item) => acc + (selectedItems[item.id] ? item.price * item.quantity : 0),
    0
  );

  // Calculate total discount based on the percentage
  const totalDiscount = cartItems.reduce(
    (acc, item) =>
      acc +
      (selectedItems[item.id]
        ? ((item.discount / 100) * item.price) * item.quantity
        : 0),
    0
  );

  // Set delivery charge to 0 if no item is selected
  const effectiveDeliveryCharge = isAnyItemSelected ? deliveryCharge : 0;

  const finalPrice = totalBasePrice - totalDiscount + effectiveDeliveryCharge;

  const handlePlaceOrder = () => {
    const selectedIds = Object.keys(selectedItems).filter((id) => selectedItems[id]);
    navigate('/order-confirmation', { state: { selectedItems: selectedIds } });
  };

  return (
    <div className="cart-page">
      {cartItems.length === 0 ? (
        <h2>Your cart is empty!</h2>
      ) : (
        <>
          <div className="CartItemsContainer">
            {cartItems.map((item) => {
              const discountPercentage = ((item.discount / 100) * 100).toFixed(2);

              return (
                <label htmlFor={`item-${item.id}`} key={item.id}>
                  <div className="cart-item">
                    <div className="ItemDescription">
                      <div className="ItemImage">
                        <img src={item.image} alt={item.title} />
                      </div>
                      <div className="item-details">
                        <h3>{item.title}</h3>
                        <p>Price: ₹{item.price}</p>
                        <p>Discount: {discountPercentage}%</p>
                        <div className="quantity-control">
                          <button onClick={() => handleDecrement(item.id)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => handleIncrement(item.id)}>+</button>
                        </div>
                        <button onClick={() => handleRemove(item.id)}>Remove</button>
                      </div>
                    </div>
                    <div className="checkbox-section">
                      <input
                        type="checkbox"
                        id={`item-${item.id}`}
                        checked={selectedItems[item.id] || false}
                        onChange={() => handleCheckboxChange(item.id)}
                      />
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
          <div className="total-section">
            <span className='PriceDetails'>Price Details</span>
            <div className="priceOfItems">
              <span> Price: </span>
              <span>₹{totalBasePrice}</span>
            </div>
            {isAnyItemSelected && (
              <div className="DiscountItems">
                <span>Discount: </span>
                <span>- ₹{totalDiscount.toFixed(2)}</span>
              </div>
            )}
            <div className="DeliveryCharges">
              <span>Delivery Charges: </span>
              <span>+ ₹{effectiveDeliveryCharge}</span>
            </div>
            <div className="TotalPrice">
              <span>Total Price: </span>
              <span>₹{finalPrice.toFixed(2)}</span>
            </div>
            <button onClick={handlePlaceOrder} disabled={finalPrice === 0}>
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
