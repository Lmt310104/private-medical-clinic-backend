import db from "../models/index.js";
import asyncHandler from "express-async-handler";

const getAllPatients = asyncHandler(async (req, res, next) => {
  try {
    // if (req.isAuthenticated()) {
    const patients = await db.patients.findAll();
    if (!patients) {
      res.status(500).json({
        status: res.statusCode,
        message: "server error",
        data: "",
      });
    }
    res.status(200).json({
      status: res.statusCode,
      message: "All patients",
      data: patients,
    });
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
const createPatient = asyncHandler(async (req, res, next) => {
  try {
    // if (req.isAuthenticated()) {
    console.log("this is body", req.body);
    const { fullName, gender, birthYear, address, phoneNumber } = req.body;
    if (!fullName || !gender || !birthYear || !address || !phoneNumber) {
      res.status(400).json({
        status: res.statusCode,
        message: "All fields are required",
        data: "",
      });
    }
    const existingPatient = await db.patients.findOne({
      where: { phoneNumber },
    });

    if (existingPatient) {
      res.status(400).json({
        status: res.statusCode,
        message: "Patient already exists",
        data: "",
      });
    } else {
      const patient = await db.patients.create({
        fullName,
        gender,
        birthYear,
        address,
        phoneNumber,
      });
      if (patient) {
        res.status(201).json({
          status: res.statusCode,
          message: "Patient created",
          data: patient,
        });
      } else {
        res.status(400).json({
          status: res.statusCode,
          message: "Patient not created",
          data: "",
        });
      }
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
const getPatientById = asyncHandler(async (req, res, next) => {
  try {
    // if (req.isAuthenticated()) {
    const patient = await db.patients.findOne({
      where: { id: req.params.id },
    });
    if (!patient) {
      res.status(404).json({
        status: res.statusCode,
        message: "Patient not found",
        data: "",
      });
    }
    res.status(200).json({
      status: res.statusCode,
      message: "Patient found",
      data: patient,
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
const updatePatientById = asyncHandler(async (req, res, next) => {
  try {
    // if (req.isAuthenticated()) {
    const { fullName, gender, birthYear, address, phoneNumber } = req.body;
    console.log("this is i my patient", gender, req.params.id);
    const patient = await db.patients.update(
      {
        fullName: fullName,
        gender: gender,
        birthYear: birthYear,
        address: address,
        phoneNumber: phoneNumber,
      },
      {
        where: { id: req.params.id },
      }
    );

    const responsePatient = await db.patients.findOne({
      where: { id: req.params.id },
    });
    if (!responsePatient) {
      res.status(500).json({
        status: res.statusCode,
        message: "server error",
        data: "",
      });
    } else {
      res.status(200).json({
        status: res.statusCode,
        message: "Patient updated",
        data: responsePatient,
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
const deletePatientById = asyncHandler(async (req, res, next) => {
  try {
    // if (req.isAuthenticated()) {
    const patient = await db.patients.destroy({
      where: { id: req.params.id },
    });
    console.log(patient);
    if (!patient) {
      res.status(404).json({
        status: res.statusCode,
        message: "Patient not found",
        data: "",
      });
    }
    res.status(200).json({
      status: res.statusCode,
      message: "Patient deleted",
      data: "",
    });
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
export default {
  getAllPatients,
  createPatient,
  getPatientById,
  updatePatientById,
  deletePatientById,
};
