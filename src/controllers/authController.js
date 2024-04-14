const db = require("../models/index");
const auth = require("../middleware/passport");
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
// Routes

const login = async (req, res, next) => {
  await auth.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    req.login(user, async (err) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        status: res.statusCode,
        user: user,
        message: "You have successfully logged in",
      });
    });
    console.log(req);
  })(req, res, next);
};

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "You are not authenticated" });
};
const isAuthenticatedCallBack = () => {};
const isSuccessLogin = asyncHandler(async (req, res) => {
  if (req.isAuthenticated()) {
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
  }
});
const isFailureLogin = (req, res) => {
  res.status(401).json({ message: "failure" });
};
const Logout = (req, res, next) => {
  if (req.isAuthenticated()) {
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
  } else {
    res.status(401).json({ message: "You are not authenticated" });
  }
};
const changePassword = asyncHandler(async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      const id = req.params.id;
      if (!id) {
        return res.status(400).json({
          status: res.statusCode,
          message: "id is required",
          data: "",
        });
      }
      const { password } = req.body;
      if (!password) {
        return res.status(400).json({
          status: res.statusCode,
          message: "password is required",
          data: "",
        });
      }
      const hashedPassword = await bcrypt.hashSync(password, 10);
      console.log(hashedPassword);
      const user = await db.users.update(
        {
          password: hashedPassword,
        },
        { where: { id: id } }
      );
      if (user) {
        res.status(200).json({
          status: res.statusCode,
          message: "success",
          data: user,
        });
      } else {
        res.status(500).json({
          status: res.statusCode,
          message: "server error",
          data: "",
        });
      }
    } else {
      res.status(401).json({
        status: res.statusCode,
        message: "Unauthorized",
        data: "",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: res.statusCode,
      message: "server error",
      data: "",
    });
  }
});
export default {
  login,
  isLoggedIn,
  isSuccessLogin,
  isAuthenticatedCallBack,
  isFailureLogin,
  Logout,
  changePassword,
};
