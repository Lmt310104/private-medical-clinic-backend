require("dotenv").config();
import axios from "axios";
const sms_api = process.env.SMS_API;
const sendSMS = async ({ OTP, phoneNumbers }) => {
  const send_payload = JSON.stringify({
    message: "Mã xác thực của bạn là: " + OTP,
    phoneNumbers: phoneNumbers,
  });
  const { data } = await axios.post(`${sms_api}`, send_payload, {
    headers: {
      "Content-Type": "application/json",
    },
    auth: {
      username: process.env.SMS_USERNAME,
      password: process.env.SMS_PASSWORD,
    },
  });
  console.log(data);
};
module.exports = sendSMS;
