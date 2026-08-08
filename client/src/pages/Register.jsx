import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import "./Register.css";

function Register() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const getPasswordStrength = (password) => {
    if (password.length < 6) {
      return {
        text: "🔴 Weak Password",
        className: "error-text",
      };
    }

    if (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*]/.test(password)
    ) {
      return {
        text: "🟢 Strong Password",
        className: "success-text",
      };
    }

    if (
      password.length >= 6 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password)
    ) {
      return {
        text: "🟡 Medium Password",
        className: "warning-text",
      };
    }

    return {
      text: "🔴 Weak Password",
      className: "error-text",
    };
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const phoneValid = /^[6-9]\d{9}$/.test(phone);
    const passwordsMatch = password === confirmPassword;

    if (!fullName.trim()) {
      alert("Please enter your full name.");
      return;
    }

    if (!emailValid) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!phoneValid) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    if (password.length < 6) {
      alert("Password must contain at least 6 characters.");
      return;
    }

    if (!passwordsMatch) {
      alert("Passwords do not match.");
      return;
    }

    const userData = {
      fullName: fullName,
      email: email,
      phone: phone,
      password: password,
    };

    localStorage.setItem(
      "careConnectUser",
      JSON.stringify(userData)
    );

    alert("Registration successful! 🎉");
  };

  return (
    <>
      <Navbar />

      <div className="register-page">
        <div className="register-card">
          <h1>Create Account 🚀</h1>

          <p>
            Join CareConnect and book appointments easily.
          </p>

          <form onSubmit={handleRegister}>
            {/* Full Name */}
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            {/* Email */}
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

            {/* Phone */}
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            {phone && (
              <p
                className={
                  /^[6-9]\d{9}$/.test(phone)
                    ? "success-text"
                    : "error-text"
                }
              >
                {/^[6-9]\d{9}$/.test(phone)
                  ? "✅ Valid Phone Number"
                  : "❌ Enter a Valid 10-digit Phone Number"}
              </p>
            )}

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
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Password Strength */}
            {password && (
              <p
                className={
                  getPasswordStrength(password).className
                }
              >
                {getPasswordStrength(password).text}
              </p>
            )}

            {/* Confirm Password */}
            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
              />

              <button
                type="button"
                className="show-btn"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Password Match */}
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

            {/* Register Button */}
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