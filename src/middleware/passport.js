const passport = require("passport");
const GoogleStategy = require("passport-google-oidc");
const LocalStatregy = require("passport-local").Strategy;
const asyncHandler = require("express-async-handler");
import { generateAccessToken } from "./jwt";
const db = require("../models/index");
import jwt, { verify } from "jsonwebtoken";
import bcrypt from "bcrypt";
require("dotenv").config();

const auth = new passport.Passport();

//sign in with google
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
          include: [{ model: db.userGroup, as: "userGroup" }],
          where: { email: profile.emails[0].value },
        });
        console.log("this is login with gooolge", user);
        if (user) {
          const userData = {
            username: user.dataValues.userName,
            email: user.dataValues.email,
            fullName: user.dataValues.fullName,
            id: user.dataValues.id,
            role: user.dataValues.userGroup.dataValues.groupName,
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
          cb(null, false);
        }
      } catch (err) {
        cb(null, false);
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
        if (user && bcrypt.compare(user.dataValues.password, password)) {
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
          console.log("Passport js thanh cong");
          done(null, userResponse);
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(null, false);
      }
    })
  )
);
// Serialize User function to be used by
auth.serializeUser((user, done) => {
  console.log("serializeUser thanh cong");
  done(null, user);
});
// Deserialize User function to be used by
auth.deserializeUser(function (user, done) {
  console.log("deserializeUser thanh cong");
  done(null, user);
});
module.exports = auth;
