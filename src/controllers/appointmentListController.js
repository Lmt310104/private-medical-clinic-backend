import { where } from "sequelize";
import db from "../models/index.js";
import asyncHandler from "express-async-handler";

const getAllAppointmentList = asyncHandler(async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      try {
        const userGroup = await db.userGroup.findOne({where:{groupName: req.user.user.role}});
        const authorization = await db.authorizations.findOne({where:{userGroupId: userGroup.id, featId: 1}});
        if (!authorization.isAccess) { 
          return res.status(401).json({
            status: res.statusCode,
            message: "Unauthorized",
          });
        } 
        const appointmentList = await db.appointmentList.findAll({
        });
        res.status(200).json({
          status: res.statusCode,
          success: "success",
          data: appointmentList,
        });
      } catch (err) {
        console.log(err);
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

const createAppointmentList = asyncHandler(async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const userGroup = await db.userGroup.findOne({where:{groupName: req.user.user.role}});
      const authorization = await db.authorizations.findOne({where:{userGroupId: userGroup.id, featId: 2}});
      if (!authorization.isAccess) { 
        return res.status(401).json({
          status: res.statusCode,
          message: "Unauthorized",
        });
      } 
      const { scheduleDate } = req.body;
      if (!scheduleDate) {
        res.status(400).json({
          status: res.statusCode,
          message: "All fields are required",
          data: "",
        });
      }

      const existingAppointmentList = await db.appointmentList.findOne({
        where: { scheduleDate: new Date(scheduleDate) },
      });

      if (existingAppointmentList) {
        res.status(200).json({
          status: res.statusCode,
          success: "existingAppointmentList",
          data: existingAppointmentList,
        });
      } else {
        const appointmentList = await db.appointmentList.create({
          scheduleDate: scheduleDate,
        });

        res.status(200).json({
          status: res.statusCode,
          success: "appointmentList",
          data: appointmentList,
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

const getAppointmentListById = asyncHandler(async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const userGroup = await db.userGroup.findOne({where:{groupName: req.user.user.role}});
      const authorization = await db.authorizations.findOne({where:{userGroupId: userGroup.id, featId: 1}});
      if (!authorization.isAccess) { 
        return res.status(401).json({
          status: res.statusCode,
          message: "Unauthorized",
        });
      } 
      const appointmentList = await db.appointmentList.findOne({
        where: { id: req.params.id },
      });
      res.status(200).json({
        status: res.statusCode,
        message: "success",
        data: appointmentList,
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
const updateAppointmentListById = asyncHandler(async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const appointmentList = await db.appointmentList.findOne({
        where: { id: req.params.id },
      });
      if (appointmentList) {
        const { scheduleDate } = req.body;
        if (scheduleDate) {
          appointmentList.scheduleDate = scheduleDate;
        }
        await appointmentList.save();
        res.status(200).json({
          status: res.statusCode,
          message: "update successfull",
          data: appointmentList,
        });
      } else {
        res.status(404).json({
          status: res.statusCode,
          message: "appointmentList not found",
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
const deleteAppointmentListById = asyncHandler(async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const appointmentList = await db.appointmentList.findOne({
        where: { id: req.params.id },
      });
      if (appointmentList) {
        await appointmentList.destroy();
        res.status(200).json({
          status: res.statusCode,
          message: "delete successfull",
          data: "",
        });
      } else {
        res.status(404).json({
          status: res.statusCode,
          message: "appointmentList not found",
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
  getAllAppointmentList,
  createAppointmentList,
  getAppointmentListById,
};
