import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <div className="navbar-logo">
          <span className="logo-icon">🏥</span>
          <span className="logo-text">CareConnect</span>
        </div>

        {/* Navigation Menu */}
        <ul className="navbar-menu">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/doctors">Doctors</Link>
          </li>

          <li>
            <Link to="/services">Services</Link>
          </li>

          <li>
            <Link to="/about">About</Link>
          </li>

          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        {/* Buttons */}
       <div className="navbar-buttons">
  <Link to="/login">
    <button className="login-btn">
      Login
    </button>
  </Link>

  <Link to="/register">
    <button className="register-btn">
      Register
    </button>
  </Link>
</div>
      </div>
    </nav>
  );
}

export default Navbar;