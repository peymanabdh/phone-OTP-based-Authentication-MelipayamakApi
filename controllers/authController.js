const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middlewares/authMiddleware");
const OTPService =require("../utils/otpService")
const { compareOTP } = require("../utils/otpGenerator");
const otpGenerator = require("../utils/otpGenerator");

//User Registration
exports.registerUser = async (req, res) => {
  const { phone } = req.body;
  try {
    //check if user exists
    const existingUser = await User.findOne({ $or: [{phone}] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists" });
    }

    // Generate OTP
    const otp = otpGenerator.generateOTP();

    // Send OTP via Email
    // sendOTPByEmail(email, otp);
    await OTPService.sendOTP(phone,otp);

    //hash password
   // const hashedPassword = await bcrypt.hash(password, 10);
    //new user object
    const newUser = new User({
      phone,
      otp,
    });

    //save
    await newUser.save();
    res
      .status(201)
      .json({ message: `User registered successfully, OTP sent to ${phone}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//Login User and verify otp
exports.loginUser = async (req, res) => {
  const { phone,otp } = req.body;

  try {
    console.log(phone,otp);
    // Find user by email
    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare received OTP with stored OTP
    if (compareOTP(otp, user.otp)) {
      user.otp = null; // Set the OTP field to null after verification
      user.verified = true;

      await user.save();
      //console.log(user.verified);

      const token = jwt.sign({ userId: user._id }, "secret", {
        expiresIn: "10h",
      });

      return res.status(200).json({
        token,
        user: {
          phone: user.phone,
          verify: user.verified,
        },
      });
    } else {
      return res.status(401).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//Get Users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

//Remove Users
exports.removeUsers = async (req, res) => {
  const { phone } = req.params;
  try {
    const deletedUser = await User.findOneAndDelete({ phone });

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};
