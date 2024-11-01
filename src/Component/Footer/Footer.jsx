import React from "react";
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <div className="Footer">
      <div className="Footer-main">
        <ul>
          <li>
            <Link to="/wishlist">Wishlist</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
      <div>
        <Link to="/login">Login/Register</Link> 
      </div>
    </div>
  );
}

export default Footer;
