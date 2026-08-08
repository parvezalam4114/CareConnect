import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const savedUser = localStorage.getItem("careConnectUser");

    if (!savedUser) {
      setMessage(
        "❌ No registered account found. Please register first."
      );
      setMessageType("error");
      return;
    }

    const userData = JSON.parse(savedUser);

    if (
      email === userData.email &&
      password === userData.password
    ) {
      localStorage.setItem("careConnectLoggedIn", "true");

      navigate("/dashboard");
    } else {
      setMessage("❌ Invalid email or password.");
      setMessageType("error");
    }
  };

  return (
    <>
      <Navbar />

      <div className="login-page">
        <div className="login-card">
          <h1>Welcome Back 👋</h1>

          <p>Login to your CareConnect account</p>

          <form onSubmit={handleLogin}>
            {/* Email */}
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password */}
            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
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

            {/* Login Message */}
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

            {/* Login Button */}
            <button
              type="submit"
              className="login-btn-page"
            >
              Login
            </button>
          </form>

          <p className="register-text">
            Don't have an account?{" "}
            <Link to="/register">Register</Link>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Login;