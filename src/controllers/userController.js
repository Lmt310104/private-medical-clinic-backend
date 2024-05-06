import db from "../models/index.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
const { Op } = require("sequelize");
const nodemailer = require("nodemailer");
require("dotenv").config();

const getAllUser = asyncHandler(async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      // const userGroup = await db.userGroup.findOne({where:{groupName: req.user.user.role}});
      // const authorization = await db.authorizations.findOne({where:{userGroupId: userGroup.id, featId: 38}});
      // if (!authorization.isAccess) {
      //   return res.status(401).json({
      //     status: res.statusCode,
      //     message: "Unauthorized",
      //   });
      // }
      const users = await db.users.findAll({
        include: [
          {
            model: db.userGroup,
            as: "userGroup",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
        attributes: { exclude: ["refreshToken", "password", "code"] },
      });
      if (!users) {
        res.status(500).json({
          status: res.statusCode,
          message: "server error",
          data: "",
        });
      }
      res.status(200).json({
        status: res.statusCode,
        message: "success",
        data: users,
      });
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
const createUser = asyncHandler(async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      // const userGroup = await db.userGroup.findOne({where:{groupName: req.user.user.role}});
      // const authorization = await db.authorizations.findOne({where:{userGroupId: userGroup.id, featId: 39}});
      // if (!authorization.isAccess) {
      //   return res.status(401).json({
      //     status: res.statusCode,
      //     message: "Unauthorized",
      //   });
      // }

      const { userName, email, password, fullName, userGroupId } = req.body;

      if (!userName || !email || !password || !fullName || !userGroupId) {
        return res.status(400).json({
          status: res.statusCode,
          message: "All fields are required",
          data: "",
        });
      }
      // Checking for existing User
      const existingUser = await db.users.findOne({
        where: { [Op.or]: [{ userName: userName }, { email: email }] },
      });
      if (existingUser) {
        return res.status(400).json({
          status: res.statusCode,
          message: "User already exists",
          data: "",
        });
      } else {
        const hashedPassword = await bcrypt.hashSync(password, 10);
        const user = await db.users.create({
          userName: userName,
          email: email,
          password: hashedPassword,
          fullName: fullName,
          userGroupId: userGroupId,
        });
        if (!user) {
          res.status(500).json({
            status: res.statusCode,
            message: "server error",
            data: "",
          });
        }
        res.status(200).json({
          status: res.statusCode,
          message: "success",
          data: user,
        });
      }
    } else {
      res.status(401).json({
        status: res.statusCode,
        message: "Unauthorized",
        data: "",
      });
    }
  } catch {
    console.log("this is error");
    res.status(500).json({
      status: res.statusCode,
      message: "server error",
      data: "",
    });
  }
});
const getUserById = asyncHandler(async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      // const userGroup = await db.userGroup.findOne({where:{groupName: req.user.user.role}});
      // const authorization = await db.authorizations.findOne({where:{userGroupId: userGroup.id, featId: 38}});
      // if (!authorization.isAccess) {
      //   return res.status(401).json({
      //     status: res.statusCode,
      //     message: "Unauthorized",
      //   });
      // }

      const user = await db.users.findOne({
        where: { id: req.params.id },
        include: [
          {
            model: db.userGroup,
            as: "userGroup",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
        attributes: { exclude: ["refreshToken", "password", "code"] },
      });
      if (!user) {
        res.status(404).json({
          status: res.statusCode,
          message: "User not found",
          data: "",
        });
      }
      res.status(200).json({
        status: res.statusCode,
        message: "User found",
        data: user,
      });
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
const updateUserById = asyncHandler(async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      // const userGroup = await db.userGroup.findOne({where:{groupName: req.user.user.role}});
      // const authorization = await db.authorizations.findOne({where:{userGroupId: userGroup.id, featId: 41}});
      // if (!authorization.isAccess) {
      //   return res.status(401).json({
      //     status: res.statusCode,
      //     message: "Unauthorized",
      //   });
      // }
      const id = req.params.id;
      if (!id) {
        return res.status(400).json({
          status: res.statusCode,
          message: "id is required",
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
    const { userName, email, fullName, userGroupId } = req.body;
    const existingUser = await db.users.findOne({
      where: { [Op.or]: [{ userName: userName }, { email: email }] },
    });

    if (existingUser && existingUser.dataValues.id !=req.params.id) {
      return res.status(400).json({
        status: res.statusCode,
        message: "User already exists",
        data: "",
      });
    }

    const user = await db.users.update(
      {
        userName: userName,
        email: email,
        fullName: fullName,
        userGroupId: userGroupId,
      },
      { where: { id: req.params.id } }
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
  } catch (err) {
    res.status(500).json({
      status: res.statusCode,
      message: "server error",
      data: "",
    });
  }
});
const deleteUserById = asyncHandler(async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      // const userGroup = await db.userGroup.findOne({where:{groupName: req.user.user.role}});
      // const authorization = await db.authorizations.findOne({where:{userGroupId: userGroup.id, featId: 40}});
      // if (!authorization.isAccess) {
      //   return res.status(401).json({
      //     status: res.statusCode,
      //     message: "Unauthorized",
      //   });
      // }
      const id = req.params.id;
      if (!id) {
        return res.status(400).json({
          status: res.statusCode,
          message: "id is required",
          data: "",
        });
      }
      const user = await db.users.destroy({ where: { id: id } });
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

const sendUserInfo = asyncHandler(async (req, res, next) => {
  try {
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
      <div>Xin chào ${req.body.email},</div>
      <div>Dưới đây là thông tin tài khoản phòng mạch tư của bạn</div>
      <div>Tên đăng nhập: <br>${req.body.userName}</br></div>
      <div>Mật khẩu: <br>${req.body.password}</br></div>
      <div>Vui lòng thay đổi mật khẩu để đảm bảo tính bảo mật của bạn</div>
      `, // html body
      });

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

export default {
  getAllUser,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  sendUserInfo
};
