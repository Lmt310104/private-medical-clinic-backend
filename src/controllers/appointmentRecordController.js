import { where } from "sequelize";
import db from "../models/index.js";
import asyncHandler from "express-async-handler";

const getAllAppointmentRecords = asyncHandler(async (req, res, next) => {
  try {
    // if (req.isAuthenticated()) {
      const appointmentRecord = await db.appointmentRecords.findAll({
        include: [
          {
            model: db.diseases,
            as: "disease",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: db.appointmentList,
            as: "appointmentList",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: db.patients,
            as: "patient",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      });

      res.status(200).json({
        status: res.statusCode,
        message: "All appointmentRecords",
        data: appointmentRecord,
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
const createAppointmentRecord = asyncHandler(async (req, res, next) => {
  try {
    // if (req.isAuthenticated()) {
      const { patientId, symptoms, diseaseId, appointmentListId } = req.body;
      if (!patientId || !symptoms || !diseaseId || !appointmentListId) {
        res.status(400).json({
          status: res.statusCode,
          message: "All fields are required",
          data: "",
        });
      }
      const appointmentRecord = await db.appointmentRecords.create({
        patientId: patientId,
        symptoms: symptoms,
        diseaseId: diseaseId,
        appointmentListId: appointmentListId,
      });
      const responseAppointmentRecord = await db.appointmentRecords.findOne({
        where: { id: appointmentRecord.id },
        include: [
          {
            model: db.diseases,
            as: "disease",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: db.appointmentList,
            as: "appointmentList",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: db.patients,
            as: "patient",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      });
      res.status(200).json({
        status: res.statusCode,
        message: "success",
        data: responseAppointmentRecord,
      });
    // }
  } catch (err) {
    res.status(500).json({
      status: res.statusCode,
      message: "server error",
      data: "",
    });
  }
});
const getAppointmentRecordById = asyncHandler(async (req, res, next) => {
  try {
    // if (req.isAuthenticated()) {
    const id = req.params.id;
    const appointmentRecord = await db.appointmentRecords.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: db.diseases,
          as: "disease",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: db.appointmentList,
          as: "appointmentList",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: db.patients,
          as: "patient",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });
    if (appointmentRecord) {
      res.status(200).json({
        status: res.statusCode,
        message: "success",
        data: appointmentRecord,
      });
    }
    // } else {
    res.status(401).json({
      status: res.statusCode,
      message: "Unauthorized",
      data: "",
    });
    // }
  } catch (err) {
    res.status(500).json({
      status: res.statusCode,
      message: "server error",
      data: "",
    });
  }
});
const updateAppointmentRecordById = asyncHandler(async (req, res, next) => {
  try {
    // if (req.isAuthenticated()) {
    const { patientId, symptoms, diseaseId, appointmentListId } = req.body;
    if (!patientId || !symptoms || !diseaseId || !appointmentListId) {
      res.status(400).json({
        status: res.statusCode,
        message: "All fields are required",
        data: "",
      });
    }
    const appointmentRecord = await db.appointmentRecords.update(
      {
        patientId: patientId,
        symptoms: symptoms,
        diseaseId: diseaseId,
        appointmentListId: appointmentListId,
      },
      { where: { id: req.params.id } }
    );
    const responseAppointmentRecord = await db.appointmentRecords.findOne({
      where: { id: appointmentRecord.id },
      include: [
        {
          model: db.diseases,
          as: "disease",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: db.appointmentList,
          as: "appointmentList",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: db.patients,
          as: "patient",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });
    res.status(200).json({
      status: res.statusCode,
      message: "success",
      data: responseAppointmentRecord,
    });
    // }
  } catch (err) {
    res.status(500).json({
      status: res.statusCode,
      message: "server error",
      data: "",
    });
  }
});
const deleteAppointmentRecordById = asyncHandler(async (req, res, next) => {
  try {
    // if (req.isAuthenticated()) {
    const appointmentRecord = await db.appointmentRecords.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({
      status: res.statusCode,
      message: "success",
      data: appointmentRecord,
    });
    // }
  } catch (err) {
    res.status(500).json({
      status: res.statusCode,
      message: "server error",
      data: "",
    });
  }
});

export default {
  getAllAppointmentRecords,
  createAppointmentRecord,
  getAppointmentRecordById,
  updateAppointmentRecordById,
  deleteAppointmentRecordById,
};
