import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Company Info */}

        <div className="footer-section">

          <h2 className="footer-logo">🏥 CareConnect</h2>

          <p>
            Providing trusted healthcare services with experienced
            doctors and advanced medical technology.
          </p>

        </div>

        {/* Quick Links */}

        <div className="footer-section">

          <h3>Quick Links</h3>

          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/doctors">Doctors</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>

        </div>

        {/* Contact */}

        <div className="footer-section">

          <h3>Contact</h3>

          <p>📞 +91 9876543210</p>

          <p>📧 support@careconnect.com</p>

          <p>📍 Lucknow, India</p>

        </div>

      </div>

      <div className="footer-bottom">

        <p>© 2026 CareConnect. All Rights Reserved.</p>

      </div>

    </footer>
  );
}

export default Footer;