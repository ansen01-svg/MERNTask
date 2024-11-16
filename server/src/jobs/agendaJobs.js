// server/jobs/agendaJob.js
const Agenda = require("agenda");
const sendMail = require("../config/nodemailer_config");

const agenda = new Agenda({ db: { address: process.env.MONGO_URI } });

agenda.define("send email", async (job) => {
  const { email, subject, text } = job.attrs.data;

  await sendMail({
    to: email,
    subject,
    text,
  });
});

agenda.start();

module.exports = agenda;
