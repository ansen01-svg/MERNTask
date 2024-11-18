require("dotenv").config();
const express = require("express");
const cors = require("cors");
const emailRoutes = require("./routes/emailRoutes");
const agenda = require("./jobs/agendaJobs");
const connectDb = require("./config/db");
const path = require("path");

const app = express();

const corsOptions = {
  origin: process.env.CLIENT,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/api/v1/email", emailRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to MERNTask server!");
});

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

module.exports = app;
