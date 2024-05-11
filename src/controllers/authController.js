const db = require("../models/index");
const auth = require("../middleware/passport");
const nodemailer = require("nodemailer");
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import userService from "../services/user.service";
require("dotenv").config();

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
      return res.status(401).json({ message: "User not found" });
    }
    if (user.refreshToken !== req.user.refreshToken) {
      req.logOut();
      req.session.destroy();
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.status(200);
    res.json({ message: "You are logged in", user: req.user });
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
      const currentPassword = req.body.currentPassword;
      const newPassword = req.body.newPassword;
      const confirmPassword = req.body.confirmPassword;
      if (!id || !currentPassword || !newPassword || !confirmPassword) {
        return res.status(400).json({
          status: res.statusCode,
          message: "Missing required fields",
          data: "",
        });
      }
      const checkPassword = await userService.checkPassword({
        id: id,
        currentPassword: currentPassword,
      });
      if (!checkPassword) {
        return res.status(401).json({
          status: res.statusCode,
          message: "Something wrong",
          data: "",
        });
      }
      if (newPassword !== confirmPassword) {
        return res.status(400).json({
          status: res.statusCode,
          message: "Password does not match",
          data: "",
        });
      }
      const hashedPassword = await bcrypt.hashSync(newPassword, 10);
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
      err: err.stack,
      data: "",
    });
  }
});
const forgotPassword = asyncHandler(async (req, res, next) => {});
const checkEmail = asyncHandler(async (req, res, next) => {
  try {
    const email = req.body.email;
    if (!email) {
      return res.status(400).json({
        status: res.statusCode,
        message: "Email is required",
        data: "",
      });
    }
    const user = await userService.checkEmail({ email: email });
    if (!user) {
      return res.status(404).json({
        status: res.statusCode,
        message: "User not found",
        data: "",
      });
    }
    res.status(200).json({
      status: res.statusCode,
      message: "success",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      status: res.statusCode,
      message: "server error",
      error: err.stack,
      data: "",
    });
  }
});
const sendOTP = asyncHandler(async (req, res, next) => {
  try {
    const OTP = Math.floor(100000 + Math.random() * 900000);
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.GOOGLE_APP_EMAIL,
        pass: process.env.GOOGLE_APP_PASSWORD,
      },
    });

    try {
      const info = await transporter.sendMail({
        from: `Private Medical Clinic <${process.env.GOOGLE_APP_EMAIL}>`, // sender address
        to: `${req.body.email}`, // list of receivers
        subject: "Reset password from private-medical-clinic", // Subject line
        text: "Hello world?", // plain text body
        html: `
      <div>Hi ${req.body.email},</div>
      <div>We received a request to reset your password</div>
      <div>Your OTP: <br>${OTP}</br></div>
      `, // html body
      });
      //update code in database
      await userService.updateCode({ code: OTP, email: req.body.email });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        status: res.statusCode,
        message: "server error",
        data: "",
      });
    }

    res.status(200).json({
      status: res.statusCode,
      message: "success",
      data: "",
    });
  } catch (err) {
    res.status(500).json({
      status: res.statusCode,
      message: "server error",
      error: err.stack,
      data: "",
    });
  }
});
const resetPassword = asyncHandler(async (req, res, next) => {
  try {
    const email = req.body.email;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;
    const updateStatus = await userService.resetPassword({
      email: email,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    });
    if (!updateStatus) {
      return res.status(400).json({
        status: res.statusCode,
        message: "Something wrong",
        data: "",
      });
    }
    res.status(200).json({
      status: res.statusCode,
      message: "success reset password",
      data: updateStatus,
    });
  } catch (err) {
    return res.status(500).json({
      status: res.statusCode,
      message: "server error",
      error: err.stack,
      data: "",
    });
  }
});
const checkOTPByEmail = asyncHandler(async (req, res, next) => {
  try {
    const email = req.body.email;
    const code = req.body.code;
    if (!email || !code) {
      return res.status(400).json({
        status: res.statusCode,
        message: "Missing required fields",
        data: "",
      });
    }
    const user = await userService.checkCode({ email: email, code: code });
    if (!user) {
      return res.status(404).json({
        status: res.statusCode,
        message: "User not found",
        data: "",
      });
    }
    res.status(200).json({
      status: res.statusCode,
      message: "success",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      status: res.statusCode,
      message: "server error",
      error: err.stack,
      data: "",
    });
  }
});
const resetPasswordById = asyncHandler(async (req, res, next) => {
  try {
    const id = req.body.id;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;
    const updateStatus = await userService.resetPasswordById({
      id: id,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    });
    if (!updateStatus) {
      return res.status(400).json({
        status: res.statusCode,
        message: "Something wrong",
        data: "",
      });
    }
    res.status(200).json({
      status: res.statusCode,
      message: "success reset password",
      data: updateStatus,
    });
  } catch (err) {
    return res.status(500).json({
      status: res.statusCode,
      message: "server error",
      error: err.stack,
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
  checkEmail,
  sendOTP,
  resetPassword,
  checkOTPByEmail,
  resetPasswordById,
};
