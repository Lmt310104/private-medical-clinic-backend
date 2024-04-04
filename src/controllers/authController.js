const db = require("../models/index");
const auth = require("../middleware/passport");
import asyncHandler from "express-async-handler";
// Routes

const login = async (req, res, next) => {
  await auth.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    req.logIn(user, async (err) => {
      if (err) {
        return next(err);
      }
      const user = req.user;
      res.status(200).json({
        status: res.statusCode,
        user: user,
        message: "You have successfully logged in",
      });
    });
  })(req, res, next);
};
const isLoggedIn = (req, res, next) => {
  // if (req.isAuthenticated()) {
    return next();
  // }
  res.status(401).json({ message: "You are not authenticated" });
};
const isAuthenticatedCallBack = () => {};
const isSuccessLogin = asyncHandler(async (req, res) => {
<<<<<<< HEAD
  console.log("this is use from auth controlleor", req.user);
  // if (req.isAuthenticated()) {
=======
  if (req.isAuthenticated()) {
>>>>>>> 1b2c1401065b0eb7e51f82a7dace1bbf4c4ba45d
    const user = await db.users.findOne({ where: { id: req.user.user.id } });
    if (!user) {
      res.status(401).json({ message: "User not found" });
    }
    console.log(user.refreshToken);
    console.log(req.user.refreshToken);
    console;
    if (user.refreshToken !== req.user.refreshToken) {
      req.logOut();
      req.session.destroy();
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.status(200).json({ message: "You are logged in", user: req.user });
  // }
});
const isFailureLogin = (req, res) => {
  res.status(401).json({ message: "failure" });
};
const Logout = (req, res, next) => {
  // if (req.isAuthenticated()) {
    req.logOut((err) => {
      if (err) {
        return next(err);
      }
      req.session.destroy((err) => {
        if (err) {
          return next(err);
        }
        return res.status(200).json({ message: "You have logged out" });
      });
    });
  // } else {
    res.status(401).json({ message: "You are not authenticated" });
  // }
};
const changePassword = async (req, res, next) => {};
export default {
  login,
  isLoggedIn,
  isSuccessLogin,
  isAuthenticatedCallBack,
  isFailureLogin,
  Logout,
};
