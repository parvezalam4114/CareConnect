import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleRegister = async (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const phoneValid = /^[6-9]\d{9}$/.test(phone);
    const passwordsMatch = password === confirmPassword;

    if (!fullName.trim()) {
      setMessage("❌ Please enter your full name.");
      setMessageType("error");
      return;
    }

    if (!emailValid) {
      setMessage("❌ Please enter a valid email address.");
      setMessageType("error");
      return;
    }

    if (!phoneValid) {
      setMessage("❌ Please enter a valid 10-digit phone number.");
      setMessageType("error");
      return;
    }

    if (password.length < 6) {
      setMessage("❌ Password must contain at least 6 characters.");
      setMessageType("error");
      return;
    }

    if (!passwordsMatch) {
      setMessage("❌ Passwords do not match.");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://careconnect-vvwz.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: fullName.trim(),
            email: email.trim(),
            phone: phone.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(`❌ ${data.message}`);
        setMessageType("error");
        return;
      }

      setMessage("✅ Registration successful! Redirecting to login...");
      setMessageType("success");

      setFullName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("Registration Error:", error);

      setMessage(
        "❌ Unable to connect to server. Please try again."
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
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

            {/* API Message */}
            {message && (
              <p
                className={
                  messageType === "success"
                    ? "success-text"
                    : "error-text"
                }
              >
                {message}
              </p>
            )}

            {/* Register Button */}
            <button
              type="submit"
              className="register-btn-page"
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
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