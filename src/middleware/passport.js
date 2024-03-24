const passport = require("passport");
const LocalStatregy = require("passport-local").Strategy;
const asyncHandler = require("express-async-handler");
import { generateAccessToken } from "./jwt";
const db = require("../models/index");
import jwt from "jsonwebtoken";
require("dotenv").config();

const auth = new passport.Passport();

auth.use(
  "local",
  new LocalStatregy(
    asyncHandler(async (username, password, done) => {
      console.log(username + password);
      try {
        const user = await db.users.findOne({ where: { userName: username } });
        const role = await db.userGroup.findOne({
          where: { id: user.dataValues.userGroupId },
        });
        if (user && user.dataValues.password === password) {
          const userData = {
            username: user.dataValues.userName,
            email: user.dataValues.email,
            fullName: user.dataValues.fullName,
            id: user.dataValues.id,
            role: role.dataValues.groupName,
          };
          const refreshToken = jwt.sign(
            userData,
            process.env.REFRESH_KEY_SECRET
          );
          await db.users.update(
            { refreshToken: refreshToken },
            { where: { id: user.dataValues.id } }
          );
          const userResponse = {
            user: userData,
            refreshToken: refreshToken,
            accessToken: generateAccessToken(userData),
          };
          done(null, userResponse);
        } else {
          return done(null, false, {
            message: "Username or password incorrect.",
          });
        }
      } catch (err) {
        return done(null, false, { message: "Something went wrong" });
      }
    })
  )
);
// Serialize User function to be used by
auth.serializeUser((user, done) => {
  done(null, user);
});
// Deserialize User function to be used by
auth.deserializeUser((user, done) => {
  done(null, user);
});
module.exports = auth;
