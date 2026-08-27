const express = require("express");
const Appointment = require("../models/Appointment");

const router = express.Router();

// ==============================
// CREATE APPOINTMENT
// ==============================
router.post("/", async (req, res) => {
  try {
    const {
      userId,
      name,
      email,
      phone,
      department,
      date,
      time,
      message,
    } = req.body;

    if (
      !userId ||
      !name ||
      !email ||
      !phone ||
      !department ||
      !date ||
      !time
    ) {
      return res.status(400).json({
        message: "Please fill all required fields.",
      });
    }

    const appointment = await Appointment.create({
      userId,
      name,
      email,
      phone,
      department,
      date,
      time,
      message,
      status: "Confirmed",
    });

    res.status(201).json({
      message: "Appointment booked successfully.",
      appointment,
    });
  } catch (error) {
    console.error("Appointment Error:", error);

    res.status(500).json({
      message: "Server error while booking appointment.",
    });
  }
});

// ==============================
// GET USER APPOINTMENTS
// ==============================
router.get("/my/:userId", async (req, res) => {
  try {
    const appointments = await Appointment.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      appointments,
    });
  } catch (error) {
    console.error("Fetch Appointments Error:", error);

    res.status(500).json({
      message: "Server error while fetching appointments.",
    });
  }
});

module.exports = router;