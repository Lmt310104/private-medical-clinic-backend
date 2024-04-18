import db from "../models/index";
import asyncHandler from "express-async-handler";

const getAllAppointmentRecordDetails = asyncHandler(async (req, res, next) => {
  try {
     if (req.isAuthenticated()) {
    const appointmentRecordId = req.query.appointmentRecordId || "";

    const appointmentRecordDetail = await db.appointmentRecordDetails.findAll({
      where: {
        appointmentRecordId: appointmentRecordId,
      },
    });
    return res.status(200).json({
      status: res.statusCode,
      message: "All Appointment Record Details",
      data: appointmentRecordDetail,
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
      message: "server Error",
      data: "",
    });
  }
});
const getAppointmentRecordDetailById = asyncHandler(async (req, res, next) => {
  try {
     if (req.isAuthenticated()) {
    const appointmentRecordDetailId = req.params.id;
    const appointmentRecordDetail = await db.appointmentRecordDetails.findOne({
      where: {
        id: appointmentRecordDetailId,
      },
    });
    return res.status(200).json({
      status: res.statusCode,
      message: "Appointment Record Detail",
      data: appointmentRecordDetail,
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
const createAppointmentRecordDetail = asyncHandler(async (req, res, next) => {
  const { appointmentRecordId, drugId, count, usageId } = req.body;
  if (!appointmentRecordId || !drugId || !count || !usageId) {
    return res.status(400).json({
      status: res.statusCode,
      message: "All fields are required",
      data: "",
    });
  }

  const appointmentRecordDetail = await db.appointmentRecordDetails.create({
    appointmentRecordId: appointmentRecordId,
    drugId: drugId,
    count: count,
    usageId: usageId,
  });
  return res.status(201).json({
    status: res.statusCode,
    message: "Appointment Record Detail Created",
    data: appointmentRecordDetail,
  });
});

const updateAppointmentRecordDetail = asyncHandler(async (req, res, next) => {
  try {
     if (req.isAuthenticated()) {
    const appointmentRecordDetailId = req.params.id;
    const { appointmentRecordId, drugId, count, usageId } = req.body;
    if (!appointmentRecordId || !drugId || !count || !usageId) {
      return res.status(400).json({
        status: res.statusCode,
        message: "All fields are required",
        data: "",
      });
    }
    const appointmentRecordDetail = await db.appointmentRecordDetails.update(
      {
        appointmentRecordId: appointmentRecordId,
        drugId: drugId,
        count: count,
        usageId: usageId,
      },
      {
        where: {
          id: appointmentRecordDetailId,
        },
      }
    );
    return res.status(201).json({
      status: res.statusCode,
      message: "Appointment Record Detail Updated",
      data: appointmentRecordDetail,
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
const deleteAppointmentRecordDetail = asyncHandler(async (req, res, next) => {
  try {
     if (req.isAuthenticated()) {
    const appointmentRecordDetailId = req.params.id;
    const appointmentRecordDetail = await db.appointmentRecordDetails.destroy({
      where: {
        id: appointmentRecordDetailId,
      },
    });
    return res.status(200).json({
      status: res.statusCode,
      message: "Appointment Record Detail Deleted",
      data: appointmentRecordDetail,
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
  getAllAppointmentRecordDetails,
  getAppointmentRecordDetailById,
  createAppointmentRecordDetail,
  updateAppointmentRecordDetail,
  deleteAppointmentRecordDetail,
};
