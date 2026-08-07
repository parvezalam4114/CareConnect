import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Login.css";

function Login() {
  return (
    <>
      <Navbar />

      <div className="login-page">
        <div className="login-card">
          <h1>Welcome Back 👋</h1>

          <p>Login to your CareConnect account</p>

          <form>
            <input
              type="email"
              placeholder="Enter Email"
            />

            <input
              type="password"
              placeholder="Enter Password"
            />

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