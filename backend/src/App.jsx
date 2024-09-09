import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/NavBar/Navbar';
import Cart from './Components/Cart/Cart';
import OrderConfirmation from './Components/OrderConfirmation/OrderConfirmation';
import Payment from './Components/Payment';
import './App.css'

const App = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: 'The Complete Novel of Sherlock Holmes',
      price: 199,
      discount: 20, // Discount in rupees
      quantity: 1,
      image: './src/assets/123863-M.jpg', 
    },
    {
      id: 2,
      title: 'It Ends with Us - Novel by Colleen Hoover',
      price: 187,
      discount: 50,
      quantity: 1,
      image: './src/assets/461106-M.jpg',
    },
    {
      id: 3,
      title: 'The Alchemist by Paulo Coelho',
      price: 299,
      discount: 15,
      quantity: 1,
      image: './src/assets/977925-M.jpg',
    },
  ]);

  // Delivery charge for the entire order
  const deliveryCharge = 50;

  return (
    <div className="Cart">
      <Router>
        <Navbar cartItems={cartItems} />
        <Routes>
          <Route 
            path="/cart" 
            element={<Cart cartItems={cartItems} setCartItems={setCartItems} deliveryCharge={deliveryCharge} />} 
          />
          <Route path="/order-confirmation" element={<OrderConfirmation cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
