const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;
require("dotenv").config();

const mailSender = require("./mail");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/mailSender", (req, res) => {
  try {
    const { to, from, subject, html } = req.body;
    // NOTE: SendGrid uzerinden generate olmus tokenlar ayda 40.000 mail iletebilmektedir.
    // API KEY kullanım süresi 100 gündür.
    mailSender.MailProcess(to, from, subject, html, function(responseCode) {
      if (responseCode === 401) {
        res.statusCode = responseCode;
        res.send({
          message: "Hata olustu = kullanıcı token süresi bitmiştir",
          status: false,
        });
      } else {
        res.send({ message: "Başarılı", status: true });
      }
    });
  } catch (error) {
    res.send({ message: `Hata Olustu --> ${error}`, status: false });
  }
});

app.listen(PORT, () => {
  console.log("Application Started");
});
