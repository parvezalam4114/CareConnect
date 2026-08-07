import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import "./Register.css";

function Register() {
  return (
    <>
      <Navbar />

      <div className="register-page">
        <div className="register-card">

          <h1>Create Account 🚀</h1>

          <p>Join CareConnect and book appointments easily.</p>

          <form>

            <input
              type="text"
              placeholder="Full Name"
            />

            <input
              type="email"
              placeholder="Email Address"
            />

            <input
              type="tel"
              placeholder="Phone Number"
            />

            <input
              type="password"
              placeholder="Create Password"
            />

            <input
              type="password"
              placeholder="Confirm Password"
            />

            <button
              type="submit"
              className="register-btn-page"
            >
              Create Account
            </button>

          </form>

          <p className="login-text">
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </p>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Register;