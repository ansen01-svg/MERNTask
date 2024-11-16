// server/server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const emailRoutes = require("./routes/emailRoutes");
const agenda = require("./jobs/agendaJobs"); // Import agenda

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.use("/api", emailRoutes);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    agenda
      .start()
      .then(() => {
        console.log("Agenda started");
      })
      .catch((err) => {
        console.error("Agenda failed to start:", err);
      });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}...`);
    });
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};

start();
