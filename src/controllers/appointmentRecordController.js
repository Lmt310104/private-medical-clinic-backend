import db from "../models/index.js";
import asyncHandler from "express-async-handler";

const getAllAppointmentRecords = asyncHandler(async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      const appointmentRecords = await db.appointmentRecords.findAll();
      res.status(200).json({
        status: res.statusCode,
        message: "All appointmentRecords",
        data: appointmentRecords,
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
const createAppointmentRecord = asyncHandler(async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      const { patientId, symptomps, diseaseId, appointmentListId } = req.body;
      if (!patientId || !symptomps || !diseaseId || !appointmentListId) {
        res.status(400).json({
          status: res.statusCode,
          message: "All fields are required",
          data: "",
        });
      }
      const appointmentRecord = await db.appointmentRecords.create({
        patientId,
        symptomps,
        diseaseId,
        appointmentListId,
      });
      res.status(200).json({
        status: res.statusCode,
        message: "success",
        data: appointmentRecord,
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
const genAppointmentRecordById = asyncHandler(async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      const id = req.params.id;
      const appointmentRecord = await db.appointmentRecords.findOne({
        where: { id: req.params.id },
      });
      if (appointmentRecord) {
        res.status(200).json({
          status: res.statusCode,
          message: "success",
          data: appointmentRecord,
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

export default { getAllAppointmentRecords, createAppointmentRecord };
