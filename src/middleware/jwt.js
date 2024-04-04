import { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
const db = require("../models/index");
require("dotenv").config();

export const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_KEY_SECRET, { expiresIn: "15m" });
};
export const authenticateAccessToken = async (req, res, next) => {
  // console.log("this is cookie", req.cookies);
  // console.log("thios is auth", req.isAuthenticated());
  // console.log("i do it do it do it do it do it odo it");
  // console.log("this is user from header", req.user);
  // if (!req.isAuthenticated()) {
  //   return res.status(401).json({ message: "Unauthorized" });
  // }
  // const authHeader = req.headers["Authorization"];
  // console.log("thi is header", req.headers);
  // // if (!authHeader) {
  // //   return res.status(401).json({ message: "Unauthorized" });
  // // }
  // const token = req.cookies["connect.sid"];
  // console.log("this is token", token);
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
  //   try {
  //     jwt.verify(req.user.refreshToken, process.env.REFRESH_KEY_SECRET);
  //     const accessToken = generateAccessToken(req.user.user);
  //     req.user.accessToken = accessToken;
  //     next();
  //   } catch (err) {
  //     return res.status(403).json({ message: "Unauthorized" });
  //   }
  // }
  next();
};
