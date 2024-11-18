const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.ETHEREAL_EMAIL,
    pass: process.env.ETHEREAL_PASSWORD,
  },
});

async function sendMail({ to, subject, body }) {
  await transporter.sendMail({
    from: '"malika 👻" <malika.runte@ethereal.email>',
    to: to,
    subject: subject,
    html: `<b>${body}</b>`,
  });
}

sendMail().catch(console.error);

module.exports = sendMail;
