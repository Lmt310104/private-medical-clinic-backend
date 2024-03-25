const passport = require("passport");
const GoogleStategy = require("passport-google-oidc");
const LocalStatregy = require("passport-local").Strategy;
const asyncHandler = require("express-async-handler");
import { generateAccessToken } from "./jwt";
const db = require("../models/index");
import jwt, { verify } from "jsonwebtoken";
require("dotenv").config();

const auth = new passport.Passport();

// sign in with google
auth.use(
  new GoogleStategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URL,
      passReqToCallback: true,
      scope: ["email", "profile"],
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log(profile);
      console.log(profile.emails[0].value);
      try {
        const user = await db.users.findOne({
          where: { email: profile.emails[0].value },
        });
        const role = await db.userGroup.findOne({
          where: { id: user.dataValues.userGroupId },
        });
        console.log(user);
        console.log(role);
        if (user) {
          const userData = {
            username: user.dataValues.userName,
            email: user.dataValues.email,
            fullName: user.dataValues.fullName,
            id: user.dataValues.id,
            role: role.dataValues.groupName,
          };
          const accessToken = generateAccessToken(userData);
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
            accessToken: accessToken,
          };
          cb(null, userResponse);
        } else {
          cb(null, false, {
            message:
              "User not found, are you sure you have an account with this email?",
          });
        }
      } catch (err) {
        cb(null, false, { message: "Something went wrong" });
      }
    }
  )
);
auth.use(
  "local",
  new LocalStatregy(
    asyncHandler(async (username, password, done) => {
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
