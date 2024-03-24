import jwt from "jsonwebtoken";
const db = require("../models/index");

require("dotenv").config();

export const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_KEY_SECRET, { expiresIn: "15m" });
};
export const authenticateAccessToken = async (req, res, next) => {};
