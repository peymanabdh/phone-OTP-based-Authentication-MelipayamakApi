const mongoose = require("mongoose");

//mongodb uri
const MONGO_URI = "mongodb://0.0.0.0:27017/otp_based_authentication";

//connect to db
const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongoose connected to MONGODB");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDb;
