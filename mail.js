const sgMail = require("@sendgrid/mail");

const MailProcess = function(to, from, subject, html, ResponseCode) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  sgMail.send({ to, from, subject, html }).then(response => {
    const { code } = response;
    ResponseCode(code);
  }).catch(error => {
    const { code } = error;
    ResponseCode(code);
  });
};

module.exports = { MailProcess };
