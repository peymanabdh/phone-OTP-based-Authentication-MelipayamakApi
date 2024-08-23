const nodemailer = require("nodemailer");

//Nodemailer
//transporter configuration
const transporter = nodemailer.createTransport({
  host: "",
  port: 465,
  secure: true,
  auth: {
    user: "",
    pass: "", //use application specific password from zoho
  },
  tls: {
    rejectUnauthorized: false, // نادیده گرفتن اعتبار گواهی
  },
  debug: true, // Show detailed logs
  logger: true, // Show logs in console
});

//Send OTP via Email
exports.sendOTPByEmail = (email, otp) => {
  const mailOptions = {
    from: "Node Project",
    to: email,
    subject: "OTP Verification",
    text: `Your OTP: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
};

//reference
//https://stackoverflow.com/questions/65983495/nodemailer-invalid-login-535-authentication-failed
