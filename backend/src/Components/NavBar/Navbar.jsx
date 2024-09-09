import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ cartItems }) => {
  return (
    <nav>
      <h1>Book Store</h1>
      <Link to="/cart">
        <div className="cart-icon">
          <FontAwesomeIcon icon={faCartShopping}/> <span>{cartItems.length}</span>
        </div>
      </Link>
    </nav>
  );
};

export default Navbar;
