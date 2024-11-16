// server/controllers/emailController.js
const agenda = require("../jobs/agendaJobs");

const scheduleEmail = async (req, res) => {
  const { time, email, subject, text } = req.body;

  try {
    await agenda.schedule(time, "send email", { email, subject, text });
    res.status(200).json({ message: "Email scheduled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error scheduling email" });
  }
};

module.exports = { scheduleEmail };
