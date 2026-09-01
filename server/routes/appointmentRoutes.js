const express = require("express");
const jwt = require("jsonwebtoken");
const Appointment = require("../models/Appointment");

const router = express.Router();

// ==============================
// JWT AUTH MIDDLEWARE
// ==============================

const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authentication required.",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
};

// ==============================
// CREATE APPOINTMENT
// ==============================

router.post("/", protect, async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      department,
      date,
      time,
      message,
    } = req.body;

    if (
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
      userId: req.user.userId,
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
// GET MY APPOINTMENTS
// ==============================

router.get("/my", protect, async (req, res) => {
  try {
    const appointments = await Appointment.find({
      userId: req.user.userId,
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

// ==============================
// CANCEL MY APPOINTMENT
// ==============================

router.put("/cancel/:id", protect, async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found.",
      });
    }

    if (appointment.status === "Cancelled") {
      return res.status(400).json({
        message: "Appointment is already cancelled.",
      });
    }

    appointment.status = "Cancelled";

    await appointment.save();

    res.status(200).json({
      message: "Appointment cancelled successfully.",
      appointment,
    });
  } catch (error) {
    console.error("Cancel Appointment Error:", error);

    res.status(500).json({
      message: "Server error while cancelling appointment.",
    });
  }
});

module.exports = router;