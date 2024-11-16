const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "malika.runte@ethereal.email",
    pass: "XSh6stmSvzfgpdtwSR",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMail({ to, subject, text }) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"malika 👻" <malika.runte@ethereal.email>', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    html: `<b>${text}</b>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

sendMail().catch(console.error);

module.exports = sendMail;
