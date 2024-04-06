import { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
const db = require("../models/index");
require("dotenv").config();

export const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_KEY_SECRET, { expiresIn: "15m" });
};
export const authenticateAccessToken = async (req, res, next) => {
  // if (!req.isAuthenticated()) {
  //   return res.status(401).json({ message: "Unauthorized" });
  // }
  // const authHeader = req.headers["authorization"];

  // if (!authHeader) {
  //   return res.status(401).json({ message: "Unauthorized" });
  // }
  // const token = authHeader.split(" ")[1];
  // try {
  //   jwt.verify(token, process.env.ACCESS_KEY_SECRET);
  //   next();
  // } catch (err) {
  //   if (
  //     !req.user ||
  //     !req.user.refreshToken ||
  //     !req.user.user ||
  //     !req.user.user.id
  //   ) {
  //     return res.status(403).json({ message: "Unauthorized" });
  //   }
  //   const user = await db.users.findOne({
  //     where: { id: req.user.user.id, refreshToken: req.user.refreshToken },
  //   });
  //   if (!user) {
  //     return res.status(403).json({ message: "Unauthorized" });
  //   }
  // try {
  //   jwt.verify(req.user.refreshToken, process.env.REFRESH_KEY_SECRET);
  //   const accessToken = generateAccessToken(req.user.user);
  //   req.user.accessToken = accessToken;
  next();
  //   } catch (err) {
  //     return res.status(403).json({ message: "Unauthorized" });
  //   }
  // }
};
