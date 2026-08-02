import "./Navbar.css";
import React from "react";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">

        <div className="navbar-logo">
          <span className="logo-icon">🏥</span>
          <span className="logo-text">CareConnect</span>
        </div>

        <ul className="navbar-menu">
          <li><a href="/">Home</a></li>
          <li><a href="/doctors">Doctors</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>

        <div className="navbar-buttons">
          <button className="login-btn">Login</button>
          <button className="register-btn">Register</button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;