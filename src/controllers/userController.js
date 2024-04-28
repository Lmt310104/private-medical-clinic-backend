import db from "../models/index.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
const { Op } = require("sequelize");

const getAllUser = asyncHandler(async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      const users = await db.users.findAll({
        include: [
          {
            model: db.userGroup,
            as: "userGroup",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
        attributes: { exclude: ["refreshToken"] },
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
      const { userName, email, password, fullName, userGroupId } = req.body;
      if (!userName || !email || !password || !fullName || !userGroupId) {
        return res.status(400).json({
          status: res.statusCode,
          message: "All fields are required",
          data: "",
        });
      }
      //Checking for existing User
      const existingUser = await db.users.findOne({
        where: [Op.or({ userName: userName }, { email: email })],
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
    const { userName, email, password, fullName, userGroupId } = req.body;
    const user = await db.users.update(
      {
        userName: userName,
        email: email,
        password: password,
        fullName: fullName,
        userGroupId: userGroupId,
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

export default {
  getAllUser,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
};
