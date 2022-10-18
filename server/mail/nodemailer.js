const nodemailer = require("nodemailer");
const cron = require("node-cron");
const path = require("path");
const hbs = require("nodemailer-express-handlebars");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USERNAME, //put your mail here
    pass: process.env.MAIL_PASSWORD, //put yourpassword here
  },
});

const handleBars = {
  viewEngine: {
    partialsDir: path.resolve("../view/"),
  },
  viewPath: path.resolve("../view/"),
};
transporter.use("compile", hbs(handleBars));

const mailOptions = {
  from: process.env.MAIL_USERNAME,
  to: process.env.MAIL_USERNAME,
  subject: "Meeting Reminder",
  //   html: "<p>hi your meeting in just 15 min</p>", // plain text body
  template: "email",
  context: {
    name: "Talha", // replace {{name}} with Adebola
    company: "Invozone",
  },
};

module.exports = cron.schedule("5 * * * *", () => {
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.log(err);
    else console.log(info, "mail sent");
  });
});
