// utils/GenerateOtp.js
exports.generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit OTP
};

// utils/Emails.js
const nodemailer = require("nodemailer");

// Create transporter (configure with your email service)
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: "gmail", // or your email service
    auth: {
      user: process.env.EMAIL_USER, // your email
      pass: process.env.EMAIL_PASS, // your app password
    },
  });
};

exports.sendMail = async (to, subject, html) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: {
        name: "MERN Shop",
        address: process.env.EMAIL_USER,
      },
      to: to,
      subject: subject,
      html: html,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", result.messageId);
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
