import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Appointment.css";

function Appointment() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    date: "",
    time: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.department ||
      !formData.date ||
      !formData.time
    ) {
      alert("Please fill all required fields!");
      return;
    }

    const token = localStorage.getItem("careConnectToken");

    if (!token) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/appointments",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Unable to book appointment.");
        return;
      }

      alert("✅ Appointment Booked Successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        department: "",
        date: "",
        time: "",
        message: "",
      });

      navigate("/my-appointments");
    } catch (error) {
      console.error("Appointment Error:", error);

      alert("Unable to connect to server.");
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
            Fill in the details below to schedule your appointment.
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

            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Booking..."
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