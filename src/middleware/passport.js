const passport = require("passport");
const GoogleStategy = require("passport-google-oidc");
const LocalStatregy = require("passport-local").Strategy;
const asyncHandler = require("express-async-handler");
import { generateAccessToken } from "./jwt";
const db = require("../models/index");
import jwt, { verify } from "jsonwebtoken";
import bcrypt from "bcrypt";
require("dotenv").config();
import sequelize from "sequelize";

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
          where: { email: profile.emails[0].value, isActive: 1 },
        });
        if (user) {
          const role = await db.userGroup.findOne({
            where: { id: user.dataValues.userGroupId, isActive: 1 },
          });

          if (!role) {
            return cb(null, false);
          } else {
            const userData = {
              username: user.dataValues.userName,
              email: user.dataValues.email,
              fullName: user.dataValues.fullName,
              id: user.dataValues.id,
              role: role.dataValues.groupName,
              roleId: user.dataValues.userGroupId,
            };
            const accessToken = generateAccessToken(userData);
            const refreshToken = jwt.sign(
              userData,
              process.env.REFRESH_KEY_SECRET,
              { expiresIn: "7d" }
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
          }
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
        const user = await db.users.findOne({
          where: { userName: username, isActive: 1 },
        });
        const role = await db.userGroup.findOne({
          where: { id: user.dataValues.userGroupId, isActive: 1 },
        });
        if (
          user &&
          (await bcrypt.compare(password, user.dataValues.password))
        ) {
          console.log("done");
          if (!role) {
            return done(null, false);
          } else {
            const userData = {
              username: user.dataValues.userName,
              fullName: user.dataValues.fullName,
              email: user.dataValues.email,
              id: user.dataValues.id,
              role: role.dataValues.groupName,
              roleId: user.dataValues.userGroupId,
            };
            const refreshToken = jwt.sign(
              userData,
              process.env.REFRESH_KEY_SECRET,
              { expiresIn: "7d" }
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
          }
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
