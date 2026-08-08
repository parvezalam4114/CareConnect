import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const savedUser = localStorage.getItem("careConnectUser");
  const userData = savedUser ? JSON.parse(savedUser) : null;

  const [appointments] = useState(() => {
    const savedAppointments = localStorage.getItem(
      "careConnectAppointments"
    );

    return savedAppointments
      ? JSON.parse(savedAppointments)
      : [];
  });

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

  const activeAppointments = appointments.filter(
    (appointment) => appointment.status !== "Cancelled"
  );

  return (
    <>
      <Navbar />

      <div className="dashboard-page">
        <div className="dashboard-container">

          {/* ========================= */}
          {/* Welcome Section */}
          {/* ========================= */}

          <div className="dashboard-header">
            <div>
              <h1>
                Welcome, {userData.fullName}! 👋
              </h1>

              <p>
                Manage your healthcare journey with CareConnect.
              </p>
            </div>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              🚪 Logout
            </button>
          </div>

          {/* ========================= */}
          {/* Quick Stats */}
          {/* ========================= */}

          <div className="dashboard-stats">

            <div className="stat-card">
              <div className="stat-icon">
                📅
              </div>

              <div>
                <h3>
                  {activeAppointments.length}
                </h3>

                <p>
                  Appointments
                </p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                👨‍⚕️
              </div>

              <div>
                <h3>
                  {activeAppointments.length}
                </h3>

                <p>
                  Doctors Visited
                </p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                ❤️
              </div>

              <div>
                <h3>
                  Active
                </h3>

                <p>
                  Health Status
                </p>
              </div>
            </div>

          </div>

          {/* ========================= */}
          {/* Profile Section */}
          {/* ========================= */}

          <div className="dashboard-section">

            <div className="section-heading">

              <h2>
                👤 My Profile
              </h2>

              <Link to="/edit-profile">
                <button className="edit-btn">
                  Edit Profile
                </button>
              </Link>

            </div>

            <div className="profile-grid">

              <div className="profile-item">
                <span>
                  Full Name
                </span>

                <strong>
                  {userData.fullName}
                </strong>
              </div>

              <div className="profile-item">
                <span>
                  Email Address
                </span>

                <strong>
                  {userData.email}
                </strong>
              </div>

              <div className="profile-item">
                <span>
                  Phone Number
                </span>

                <strong>
                  {userData.phone}
                </strong>
              </div>

            </div>

          </div>

          {/* ========================= */}
          {/* Quick Actions */}
          {/* ========================= */}

          <div className="dashboard-section">

            <h2>
              ⚡ Quick Actions
            </h2>

            <div className="quick-actions">

              {/* Book Appointment */}

              <Link
                to="/appointment"
                className="action-card"
              >
                <div className="action-icon">
                  📅
                </div>

                <h3>
                  Book Appointment
                </h3>

                <p>
                  Schedule an appointment with a doctor.
                </p>
              </Link>


              {/* My Appointments */}

              <Link
                to="/my-appointments"
                className="action-card"
              >
                <div className="action-icon">
                  📋
                </div>

                <h3>
                  My Appointments
                </h3>

                <p>
                  View and manage your appointments.
                </p>
              </Link>


              {/* Find Doctor */}

              <Link
                to="/doctors"
                className="action-card"
              >
                <div className="action-icon">
                  👨‍⚕️
                </div>

                <h3>
                  Find a Doctor
                </h3>

                <p>
                  Browse doctors and find the right specialist.
                </p>
              </Link>


              {/* Healthcare Services */}

              <Link
                to="/services"
                className="action-card"
              >
                <div className="action-icon">
                  🏥
                </div>

                <h3>
                  Healthcare Services
                </h3>

                <p>
                  Explore CareConnect healthcare services.
                </p>
              </Link>

            </div>

          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Dashboard;