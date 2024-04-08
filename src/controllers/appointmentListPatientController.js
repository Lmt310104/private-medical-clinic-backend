import db from "../models/index";
import asyncHandler from "express-async-handler";

const getAllAppointmentList = asyncHandler(async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      try {
        const appointmentList = await db.appointmentListPatient.findAll({
          include: [
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
          data: appointmentList,
        });
      } catch (err) {
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
const createAppointmentListPatient = asyncHandler(async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const { patientId, appointmentListId } = req.body;
      if (!patientId || !appointmentListId) {
        res.status(400).json({
          status: res.statusCode,
          message: "All fields are required",
          data: "",
        });
      }
      const appointmentListPatient = await db.appointmentListPatient.create({
        patientId: patientId,
        appointmentListId: appointmentListId,
      });
      res.status(201).json({
        status: res.statusCode,
        message: "New appointmentList created",
        data: appointmentListPatient,
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
const updateAppointmentListPatient = asyncHandler(async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const { patientId, appointmentListId } = req.body;
      if (!patientId || !appointmentListId) {
        res.status(400).json({
          status: res.statusCode,
          message: "All fields are required",
          data: "",
        });
      }
      const appointmentListPatient = await db.appointmentListPatient.update(
        {
          patientId: patientId,
          appointmentListId: appointmentListId,
        },
        { where: { id: req.params.id } }
      );
      res.status(200).json({
        status: res.statusCode,
        message: "AppointmentList updated",
        data: appointmentListPatient,
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
const deleteAppointmentListPatient = asyncHandler(async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const appointmentListPatient = await db.appointmentListPatient.destroy({
        where: { id: req.params.id },
      });
      res.status(200).json({
        status: res.statusCode,
        message: "AppointmentList deleted",
        data: appointmentListPatient,
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
const getAppointmentListById = asyncHandler(async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const appointmentList = await db.appointmentListPatient.findOne({
        where: { id: req.params.id },
        include: [
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
export default {
  getAllAppointmentList,
  createAppointmentListPatient,
  updateAppointmentListPatient,
  deleteAppointmentListPatient,
  getAppointmentListById,
};
