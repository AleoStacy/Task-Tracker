import React from "react";
import "./Navbar.css"; // Import the CSS file for styling.

function Navbar() {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">TaskManager</div>

      {/* Menu Items */}
      <ul className="menu">
        <li>Features</li>
        <li>
          Made For
          <ul className="dropdown">
          <li><a href="#individuals">Individuals</a></li>
          <li><a href="#teams">Teams</a></li>
          <li><a href="#businesses">Businesses</a></li>
          </ul>
        </li>
        <li>Pricing</li>
      </ul>

      {/* Buttons */}
      <div className="auth-buttons">
        <button className="signup">Sign Up</button>
        <button className="login">Log In</button>
      </div>
    </nav>
  );
}

export default Navbar;
