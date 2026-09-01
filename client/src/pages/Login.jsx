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
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");

    if (!email || !password) {
      setMessage("Please enter email and password.");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://careconnect-vvwz.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message || "Invalid email or password."
        );
        setMessageType("error");
        return;
      }

      // Save JWT token
      localStorage.setItem(
        "careConnectToken",
        data.token
      );

      // Save user information
      localStorage.setItem(
        "careConnectUser",
        JSON.stringify(data.user)
      );

      // Login status
      localStorage.setItem(
        "careConnectLoggedIn",
        "true"
      );

      setMessage("Login successful! ✅");
      setMessageType("success");

      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);

      setMessage(
        "Unable to connect to server."
      );

      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="login-page">
        <div className="login-card">

          <h1>
            Welcome Back 👋
          </h1>

          <p>
            Login to your CareConnect account
          </p>

          <form onSubmit={handleLogin}>

            {/* Email */}

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            {/* Password */}

            <div className="password-box">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <button
                type="button"
                className="show-btn"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword
                  ? "Hide"
                  : "Show"}
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
              disabled={loading}
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>

          </form>

          <p className="register-text">
            Don't have an account?{" "}
            <Link to="/register">
              Register
            </Link>
          </p>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Login;