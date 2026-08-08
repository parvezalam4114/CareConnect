import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const savedUser = localStorage.getItem("careConnectUser");
  const userData = savedUser
    ? JSON.parse(savedUser)
    : null;

  const handleLogout = () => {
    localStorage.removeItem("careConnectLoggedIn");
    navigate("/login");
  };

  if (!userData) {
    return (
      <>
        <Navbar />

        <div className="dashboard-page">
          <div className="dashboard-card">
            <h1>No User Found</h1>

            <p>
              Please register or login to access your dashboard.
            </p>

            <Link to="/login">
              <button className="dashboard-btn">
                Go to Login
              </button>
            </Link>
          </div>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="dashboard-page">
        <div className="dashboard-card">

          <h1>Welcome, {userData.fullName}! 👋</h1>

          <p className="dashboard-subtitle">
            Welcome to your CareConnect Dashboard.
          </p>

          <div className="user-info">

            <div className="info-box">
              <span>👤 Full Name</span>
              <strong>{userData.fullName}</strong>
            </div>

            <div className="info-box">
              <span>📧 Email</span>
              <strong>{userData.email}</strong>
            </div>

            <div className="info-box">
              <span>📱 Phone</span>
              <strong>{userData.phone}</strong>
            </div>

          </div>

          <div className="dashboard-actions">

            <Link to="/appointment">
              <button className="dashboard-btn">
                📅 Book Appointment
              </button>
            </Link>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              🚪 Logout
            </button>

          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Dashboard;