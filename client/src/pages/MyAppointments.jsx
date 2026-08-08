import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./MyAppointments.css";

function MyAppointments() {
  const [appointments, setAppointments] = useState(() => {
    const savedAppointments = localStorage.getItem(
      "careConnectAppointments"
    );

    return savedAppointments
      ? JSON.parse(savedAppointments)
      : [];
  });

  const handleCancel = (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );

    if (!confirmCancel) {
      return;
    }

    const updatedAppointments = appointments.map((appointment) =>
      appointment.id === id
        ? {
            ...appointment,
            status: "Cancelled",
          }
        : appointment
    );

    setAppointments(updatedAppointments);

    localStorage.setItem(
      "careConnectAppointments",
      JSON.stringify(updatedAppointments)
    );
  };

  return (
    <>
      <Navbar />

      <div className="my-appointments-page">
        <div className="my-appointments-container">

          <div className="appointments-header">
            <div>
              <h1>My Appointments 📅</h1>

              <p>
                View and manage your CareConnect appointments.
              </p>
            </div>

            <Link to="/appointment">
              <button className="book-new-btn">
                + Book New Appointment
              </button>
            </Link>
          </div>

          {appointments.length === 0 ? (
            <div className="no-appointments">
              <div className="empty-icon">
                📅
              </div>

              <h2>No Appointments Found</h2>

              <p>
                You haven't booked any appointments yet.
              </p>

              <Link to="/appointment">
                <button className="dashboard-btn">
                  Book an Appointment
                </button>
              </Link>
            </div>
          ) : (
            <div className="appointments-list">

              {appointments.map((appointment) => (
                <div
                  className="appointment-card"
                  key={appointment.id}
                >

                  <div className="appointment-card-header">

                    <div>
                      <h2>
                        {appointment.department}
                      </h2>

                      <p>
                        Appointment ID: #{appointment.id}
                      </p>
                    </div>

                    <span
                      className={
                        appointment.status === "Cancelled"
                          ? "status cancelled"
                          : "status confirmed"
                      }
                    >
                      {appointment.status === "Cancelled"
                        ? "❌ Cancelled"
                        : "✅ Confirmed"}
                    </span>

                  </div>

                  <div className="appointment-details">

                    <div className="appointment-detail">
                      <span>👤 Patient</span>
                      <strong>{appointment.name}</strong>
                    </div>

                    <div className="appointment-detail">
                      <span>📧 Email</span>
                      <strong>{appointment.email}</strong>
                    </div>

                    <div className="appointment-detail">
                      <span>📱 Phone</span>
                      <strong>{appointment.phone}</strong>
                    </div>

                    <div className="appointment-detail">
                      <span>📅 Date</span>
                      <strong>{appointment.date}</strong>
                    </div>

                    <div className="appointment-detail">
                      <span>⏰ Time</span>
                      <strong>{appointment.time}</strong>
                    </div>

                    <div className="appointment-detail">
                      <span>🏥 Department</span>
                      <strong>{appointment.department}</strong>
                    </div>

                  </div>

                  {appointment.message && (
                    <div className="appointment-message">
                      <span>📝 Problem Description</span>

                      <p>
                        {appointment.message}
                      </p>
                    </div>
                  )}

                  {appointment.status !== "Cancelled" && (
                    <div className="appointment-actions">

                      <button
                        className="cancel-btn"
                        onClick={() =>
                          handleCancel(appointment.id)
                        }
                      >
                        Cancel Appointment
                      </button>

                    </div>
                  )}

                </div>
              ))}

            </div>
          )}

        </div>
      </div>

      <Footer />
    </>
  );
}

export default MyAppointments;