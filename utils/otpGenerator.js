const randomstring = require("randomstring");

// Generate a random OTP
exports.generateOTP = () => {
  return randomstring.generate({
    length: 5,
    charset: "numeric"
  })
}

// Compare OTPs
exports.compareOTP = (receivedOTP, storedOTP) => {
  return receivedOTP === storedOTP;
}
