import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Appointment.css";

function Appointment() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    date: "",
    time: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
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

    const savedAppointments =
      localStorage.getItem("careConnectAppointments");

    const appointments = savedAppointments
      ? JSON.parse(savedAppointments)
      : [];

    const newAppointment = {
      id: Date.now(),
      ...formData,
      status: "Confirmed",
    };

    appointments.push(newAppointment);

    localStorage.setItem(
      "careConnectAppointments",
      JSON.stringify(appointments)
    );

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
            ></textarea>

            {/* Submit */}
            <button type="submit">
              Book Appointment
            </button>

          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Appointment;