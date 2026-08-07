import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import "./Register.css";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {email && (
            <p
                className={
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                    ? "success-text"
                    : "error-text"
                }
            >
                {/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                ? "✅ Valid Email"
                : "❌ Invalid Email"}
            </p>
            )}

            <input
              type="tel"
              placeholder="Phone Number"
            />

            {/* Create Password */}
            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                className="show-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <button
                type="button"
                className="show-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {confirmPassword && (
              <p
                className={
                  password === confirmPassword
                    ? "success-text"
                    : "error-text"
                }
              >
                {password === confirmPassword
                  ? "✅ Passwords Match"
                  : "❌ Passwords Do Not Match"}
              </p>
            )}

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