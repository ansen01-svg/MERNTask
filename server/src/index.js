require("dotenv").config();
const express = require("express");
const cors = require("cors");
const emailRoutes = require("./routes/emailRoutes");
const agenda = require("./jobs/agendaJobs");
const connectDb = require("./config/db");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT,
  })
);
app.use(express.json());
app.use("/api/v1/email", emailRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDb(process.env.MONGO_URI);

    await agenda.start();
    console.log("Agenda started successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}...`);
    });
  } catch (error) {
    console.error("Error during startup:", error.message);
    process.exit(1);
  }
};

startServer();
