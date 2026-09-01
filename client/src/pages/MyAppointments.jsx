import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./MyAppointments.css";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("careConnectToken");

        if (!token) {
          setError("Please login first.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          "https://careconnect-vvwz.onrender.com/api/appointments/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(
            data.message || "Unable to fetch appointments."
          );
          return;
        }

        setAppointments(data.appointments || []);
      } catch (error) {
        console.error("Fetch Appointments Error:", error);
        setError("Unable to connect to server.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleCancel = async (id) => {
    const token = localStorage.getItem("careConnectToken");

    if (!token) {
      setError("Please login first.");
      return;
    }

    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );

    if (!confirmCancel) return;

    try {
      const response = await fetch(
        `https://careconnect-vvwz.onrender.com/api/appointments/cancel/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Unable to cancel appointment.");
        return;
      }

      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment._id === id
            ? {
                ...appointment,
                status: "Cancelled",
              }
            : appointment
        )
      );

      alert("Appointment cancelled successfully. ✅");
    } catch (error) {
      console.error("Cancel Appointment Error:", error);
      alert("Unable to connect to server.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="my-appointments-page">
        <div className="my-appointments-container">

          <h1>My Appointments 📅</h1>

          <p>
            View and manage your booked appointments.
          </p>

          {loading && (
            <div className="appointment-message">
              Loading appointments...
            </div>
          )}

          {error && (
            <div className="appointment-message error-text">
              ❌ {error}
            </div>
          )}

          {!loading &&
            !error &&
            appointments.length === 0 && (
              <div className="appointment-message">
                <h2>No Appointments Found</h2>
                <p>
                  You haven't booked any appointments yet.
                </p>
              </div>
            )}

          {!loading &&
            !error &&
            appointments.length > 0 && (
              <div className="appointments-list">

                {appointments.map((appointment) => (
                  <div
                    className="appointment-card"
                    key={appointment._id}
                  >

                    <div className="appointment-card-header">

                      <h2>
                        {appointment.department}
                      </h2>

                      <span className="appointment-status">
                        {appointment.status}
                      </span>

                    </div>

                    <div className="appointment-details">

                      <p>
                        <strong>👤 Name:</strong>{" "}
                        {appointment.name}
                      </p>

                      <p>
                        <strong>📧 Email:</strong>{" "}
                        {appointment.email}
                      </p>

                      <p>
                        <strong>📱 Phone:</strong>{" "}
                        {appointment.phone}
                      </p>

                      <p>
                        <strong>📅 Date:</strong>{" "}
                        {appointment.date}
                      </p>

                      <p>
                        <strong>⏰ Time:</strong>{" "}
                        {appointment.time}
                      </p>

                      {appointment.message && (
                        <p>
                          <strong>📝 Problem:</strong>{" "}
                          {appointment.message}
                        </p>
                      )}

                    </div>

                    {appointment.status !== "Cancelled" && (
                      <button
                        onClick={() =>
                          handleCancel(appointment._id)
                        }
                      >
                        Cancel Appointment
                      </button>
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