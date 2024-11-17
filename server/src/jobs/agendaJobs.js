const Agenda = require("agenda");
const sendMail = require("../config/nodemailer_config");

const agenda = new Agenda({
  db: { address: process.env.MONGO_URI, collection: "emailJobs" },
});

agenda.define("send email", async (job) => {
  const { emailId, subject, body } = job.attrs.data;

  await sendMail({
    to: emailId,
    subject,
    body,
  });
});

module.exports = agenda;
