import db from "../models/index.js";
import asyncHandler from "express-async-handler";

const getAllAppointmentList = asyncHandler(async (req, res) => {
  console.log("this is all appointment list");
  try {
    // if (req.isAuthenticated()) {
    // try {
      const appointmentList = await db.appointmentList.findAll({
        include: [
          {
            model: db.appointmentRecords,
            as: "appointmentRecords",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: db.patients,
            as: "patients",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      });
      res.status(200).json({
        status: res.statusCode,
        success: "success",
        data: appointmentList,
      });
    // } catch (err) {
    //   res.status(500).json({
    //     status: res.statusCode,
    //     message: "server error",
    //     data: "",
    //   });
    // }
    // } else {
    //   res.status(401).json({
    //     status: res.statusCode,
    //     message: "Unauthorized",
    //     data: "",
    //   });
    // }
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
    // if (req.isAuthenticated()) {
    const { scheduleDate } = req.body;
    if (!scheduleDate) {
      res.status(400).json({
        status: res.statusCode,
        message: "All fields are required",
        data: "",
      });
    }
    const appointmentList = await db.appointmentList.create({
      scheduleDate: scheduleDate,
    });
    res.status(201).json({
      status: res.statusCode,
      success: "success",
      data: appointmentList,
    });
    // } else {
    //   res.status(401).json({
    //     status: res.statusCode,
    //     message: "Unauthorized",
    //     data: "",
    //   });
    // }
  } catch (err) {
    res.status(500).json({
      status: res.statusCode,
      message: "server error",
      data: "",
    });
  }
});
const getAppointmentListById = asyncHandler(async (req, res) => {});
const updateAppointmentListById = asyncHandler(async (req, res) => {});
const deleteAppointmentListById = asyncHandler(async (req, res) => {});
export default { getAllAppointmentList, createAppointmentList };
