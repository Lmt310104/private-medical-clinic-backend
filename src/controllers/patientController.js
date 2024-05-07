import db from "../models/index.js";
import asyncHandler from "express-async-handler";
import { findPatientById } from "../services/patients.service.js";
const { Op } = require("sequelize");
const uuid = require("uuid");
const getAllPatients = asyncHandler(async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      // let patients;
      // if (req.query.name.trim()!=="" || req.query.phoneNumber.trim()!=="") {
      //   const name = req.query.name || "";
      //   const phoneNumber = req.query.phoneNumber || "";
      //   const orderBy = req.query.orderBy || "fullName";
      //   patients = await db.patients.findAll({
      //     where: {
      //       [Op.or]: [{ fullName: name }, { phoneNumber: phoneNumber }],
      //     },
      //     order: [[orderBy, "ASC"]],
      //   });
      // } else {
      // }
      const userGroup = await db.userGroup.findOne({
        where: { groupName: req.user.user.role },
      });
      const authorization = await db.authorizations.findOne({
        where: { userGroupId: userGroup.id, featId: 26 },
      });
      if (!authorization.isAccess) {
        return res.status(401).json({
          status: res.statusCode,
          message: "Unauthorized",
        });
      }
      const whereStatement = {};
      if (req.query && req.query?.phoneNumber) {
        whereStatement.phoneNumber = req.query.phoneNumber;
      }
      const patients = await db.patients.findAll({
        where: { ...whereStatement },
        order: [["fullName", "ASC"]],
      });
      const patientsSortByLastName = patients.map((patient) => {
        const nameParts = patient.fullName.split(" ");
        const lastName = nameParts[nameParts.length - 1];
        return { ...patient.dataValues, lastName: lastName };
      });

      patientsSortByLastName.sort((a, b) =>
        a.lastName.localeCompare(b.lastName)
      );

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
        data: patientsSortByLastName,
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
const createPatient = asyncHandler(async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      const userGroup = await db.userGroup.findOne({
        where: { groupName: req.user.user.role },
      });
      const authorization = await db.authorizations.findOne({
        where: { userGroupId: userGroup.id, featId: 27 },
      });
      if (!authorization.isAccess) {
        return res.status(401).json({
          status: res.statusCode,
          message: "Unauthorized",
        });
      }
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
        res.status(200).json({
          status: res.statusCode,
          message: "Patient already exists",
          data: existingPatient,
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
    } else {
      res.status(401).json({
        status: res.statusCode,
        message: "Unauthorized",
        data: "",
      });
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
const getPatientById = asyncHandler(async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      res.status(200).json({
        status: res.statusCode,
        message: "Patient found",
        data: patient,
      });
      const userGroup = await db.userGroup.findOne({
        where: { groupName: req.user.user.role },
      });
      const authorization = await db.authorizations.findOne({
        where: { userGroupId: userGroup.id, featId: 26 },
      });
      if (!authorization.isAccess) {
        return res.status(401).json({
          status: res.statusCode,
          message: "Unauthorized",
        });
      }
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
    }
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
    if (req.isAuthenticated()) {
      const userGroup = await db.userGroup.findOne({
        where: { groupName: req.user.user.role },
      });
      const authorization = await db.authorizations.findOne({
        where: { userGroupId: userGroup.id, featId: 29 },
      });
      if (!authorization.isAccess) {
        return res.status(401).json({
          status: res.statusCode,
          message: "Unauthorized",
        });
      }
      const { fullName, gender, birthYear, address, phoneNumber } = req.body;
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
    } else {
      res.status(401).json({
        status: res.statusCode,
        message: "Unauthorized",
        data: "",
      });
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
const deletePatientById = asyncHandler(async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      const userGroup = await db.userGroup.findOne({
        where: { groupName: req.user.user.role },
      });
      const authorization = await db.authorizations.findOne({
        where: { userGroupId: userGroup.id, featId: 28 },
      });
      if (!authorization.isAccess) {
        return res.status(401).json({
          status: res.statusCode,
          message: "Unauthorized",
        });
      }

      const existingPatient = await findPatientById({ id: req.params.id });
      if (!existingPatient) {
        return res.status(404).json({
          status: res.statusCode,
          message: "Patient not found",
        });
      }

      const bills = await db.bills.destroy({
        where: { patientId: req.params.id },
      });
      const appointmentRecords = await db.appointmentRecords.findAll({
        where: { patientId: req.params.id },
      });
      await Promise.all(
        appointmentRecords.map(async (record) => {
          await db.appointmentRecordDetails.destroy({
            where: { appointmentRecordId: record.id },
          });
          await db.appointmentRecords.destroy({
            where: { id: record.id },
          });
        })
      );

      const appointmentlistPatients = await db.appointmentListPatient.destroy({
        where: { patientId: req.params.id },
      });

      const patient = await db.patients.destroy({
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
        message: "Patient deleted",
        data: "",
      });
    } else {
      res.status(401).json({
        status: res.statusCode,
        message: "Unauthorized",
        data: "",
      });
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
  getAllPatients,
  createPatient,
  getPatientById,
  updatePatientById,
  deletePatientById,
};
