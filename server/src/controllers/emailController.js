const agenda = require("../jobs/agendaJobs");
const Email = require("../schema/email.schema");

const scheduleEmail = async (req, res) => {
  const {
    emailId,
    emailTemplate,
    emailBody: { subject, body },
    delay,
  } = req.body;

  try {
    if (!emailId || !emailTemplate || !subject || !body || !delay) {
      res.status(401).json({
        success: false,
        message: "Please provide all the fields",
      });
    }

    const emailData = {
      lead: emailId,
      emailTemplate,
      delay,
    };

    await Email.create(emailData);

    await agenda.schedule(`in ${delay.by} ${delay.type}`, "send email", {
      emailId,
      subject,
      body,
    });
    res.status(200).json({
      success: true,
      message: "Email scheduled successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error scheduling email" });
  }
};

module.exports = { scheduleEmail };
