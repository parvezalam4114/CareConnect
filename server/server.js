const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// ==============================
// MIDDLEWARE
// ==============================

app.use(cors());
app.use(express.json());

// ==============================
// API ROUTES
// ==============================

app.use("/api/auth", authRoutes);

app.use(
  "/api/appointments",
  appointmentRoutes
);

// ==============================
// MONGODB CONNECTION
// ==============================

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
    });

    console.log(
      "MongoDB Connected Successfully ✅"
    );
  } catch (error) {
    console.error(
      "MongoDB Connection Failed ❌"
    );

    console.error(
      "Error:",
      error.message
    );
  }
};

// ==============================
// TEST ROUTE
// ==============================

app.get("/", (req, res) => {
  res.json({
    message:
      "CareConnect Backend is Running 🚀",
  });
});

// ==============================
// START SERVER
// ==============================

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(
      `CareConnect Server running on http://localhost:${PORT}`
    );
  });
};

startServer();