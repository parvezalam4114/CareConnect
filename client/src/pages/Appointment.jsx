import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Appointment.css";

function Appointment() {
  const savedUser = localStorage.getItem("careConnectUser");
  const userData = savedUser
    ? JSON.parse(savedUser)
    : null;

  const [formData, setFormData] = useState({
    name: userData?.fullName || "",
    email: userData?.email || "",
    phone: userData?.phone || "",
    department: "",
    date: "",
    time: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    if (!userData?._id && !userData?.id) {
      setMessage(
        "❌ User information not found. Please login again."
      );
      setMessageType("error");
      return;
    }

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.department ||
      !formData.date ||
      !formData.time
    ) {
      setMessage(
        "❌ Please fill all required fields."
      );
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);

      const userId = userData._id || userData.id;

      const response = await fetch(
        "http://localhost:5000/api/appointments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            ...formData,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(`❌ ${data.message}`);
        setMessageType("error");
        return;
      }

      setMessage(
        "✅ Appointment Booked Successfully!"
      );
      setMessageType("success");

      setFormData({
        name: userData?.fullName || "",
        email: userData?.email || "",
        phone: userData?.phone || "",
        department: "",
        date: "",
        time: "",
        message: "",
      });
    } catch (error) {
      console.error(
        "Appointment Booking Error:",
        error
      );

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

      <div className="appointment-page">
        <div className="appointment-container">

          <h1>Book an Appointment</h1>

          <p>
            Fill in the details below to schedule your
            appointment.
          </p>

          <form
            className="appointment-form"
            onSubmit={handleSubmit}
          >

            {/* Full Name */}
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />

            {/* Phone */}
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />

            {/* Department */}
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
            >
              <option value="">
                Select Department
              </option>

              <option value="Cardiology">
                Cardiology
              </option>

              <option value="Dentistry">
                Dentistry
              </option>

              <option value="Neurology">
                Neurology
              </option>

              <option value="Dermatology">
                Dermatology
              </option>

              <option value="Orthopedic">
                Orthopedic
              </option>

              <option value="Pediatrics">
                Pediatrics
              </option>
            </select>

            {/* Date */}
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />

            {/* Time */}
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />

            {/* Problem */}
            <textarea
              rows="5"
              name="message"
              placeholder="Describe your problem..."
              value={formData.message}
              onChange={handleChange}
            />

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

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Booking Appointment..."
                : "Book Appointment"}
            </button>

          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Appointment;