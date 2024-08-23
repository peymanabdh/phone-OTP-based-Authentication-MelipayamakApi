
const MelipayamakApi = require('melipayamak')
require('dotenv').config();
class OTPService {
  // Generate a random 5-digit OTP code
  // static generateOTP() {
  //   return Math.floor(10000 + Math.random() * 90000).toString();
  // }

  static async sendOTP(phoneNumber, otpCode) {
    const username = process.env.OTP_USERNAME;
    const password = process.env.OTP_PASSWORD;
    const api = new MelipayamakApi(username, password);
    // const sms = api.sms();
    const smsSoap = api.sms('soap');
    const smsRest = api.sms();
    
    try {
      const response = smsRest.sendByBaseNumber([otpCode], phoneNumber, process.env.PATERN_ID);
      console.log('OTP sent successfully:', response);
      return response;
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw new Error('Failed to send OTP');
    }
  }
}

module.exports = OTPService;
