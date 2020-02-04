const sgMail = require("@sendgrid/mail");

const MailProcess = function(to, from, subject, html) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  sgMail.send({ to, from, subject, html });
};

module.exports = { MailProcess };
