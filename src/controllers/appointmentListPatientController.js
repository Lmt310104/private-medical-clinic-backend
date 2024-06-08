import db from "../models/index";
import asyncHandler from "express-async-handler";
import sequelize, { where } from "sequelize";
const getAllAppointmentList = asyncHandler(async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      // const userGroup = await db.userGroup.findOne({
      //   where: { groupName: req.user.user.role },
      // });
      // const authorization = await db.authorizations.findOne({
      //   where: { userGroupId: userGroup.id, featId: 3 },
      // });
      // if (!authorization.isAccess) {
      //   return res.status(401).json({
      //     status: res.statusCode,
      //     message: "Unauthorized",
      //   });
      // }
      const whereStatement = {};
      if (req.query && req.query?.patientId) {
        whereStatement.patientId = req.query.patientId;
      }

      if (req.query && req.query?.appointmentListId) {
        whereStatement.appointmentListId = req.query.appointmentListId;
      }

      const appointmentList = await db.appointmentListPatient.findAll({
        where: { ...whereStatement },
        attributes: {
          include: [
            [
              sequelize.literal(`(
                  SELECT id
                  FROM bills AS bill
                  WHERE
                    bill.patientId = appointmentListPatient.patientId
                    AND
                    bill.appointmentListId = appointmentListPatient.appointmentListId
                )`),
              "billId",
            ],
            [
              sequelize.literal(`(
                  SELECT id
                  FROM appointmentRecords AS appointmentRecord
                  WHERE
                    appointmentRecord.patientId = appointmentListPatient.patientId
                    AND
                    appointmentRecord.appointmentListId = appointmentListPatient.appointmentListId
                )`),
              "appointmentRecordId",
            ],
            [
              sequelize.literal(`(
                  SELECT scheduleDate
                  FROM appointmentLists AS appointmentList
                  WHERE
                    appointmentList.id = appointmentListPatient.appointmentListId
                )`),
              "scheduleDate",
            ],
          ],
        },
        order: [
          ["scheduleDate", "DESC"],
          ["timeUpdate", "ASC"],
          ["createdAt", "ASC"],
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
const createAppointmentListPatient = asyncHandler(async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      // const userGroup = await db.userGroup.findOne({
      //   where: { groupName: req.user.user.role },
      // });
      // const authorization = await db.authorizations.findOne({
      //   where: { userGroupId: userGroup.id, featId: 4 },
      // });
      // if (!authorization.isAccess) {
      //   return res.status(401).json({
      //     status: res.statusCode,
      //     message: "Unauthorized",
      //   });
      // }
      const { patientId, appointmentListId } = req.body;
      if (!patientId || !appointmentListId) {
        res.status(400).json({
          status: res.statusCode,
          message: "All fields are required",
          data: "",
        });
      }
      const record = await db.appointmentListPatient.findOne({
        where: {
          appointmentListId: appointmentListId,
        },
        order: [["orderNumber", "DESC"]],
      });
      console.log(record);
      const orderNumber = record ? record.orderNumber + 1 : 1;
      const appointmentListPatient = await db.appointmentListPatient.create({
        patientId: patientId,
        appointmentListId: appointmentListId,
        timeUpdate: Date.now(),
        orderNumber: orderNumber,
      });
      res.status(201).json({
        status: res.statusCode,
        message: "New appointmentList created",
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
const moveAppointmentListPatientToTheEnd = asyncHandler(async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const appointmentListPatientUpdate =
        await db.appointmentListPatient.update(
          {
            timeUpdate: Date.now(),
          },
          { where: { id: req.params.id } }
        );
      res.status(200).json({
        status: res.statusCode,
        message: "AppointmentList updated",
        data: appointmentListPatientUpdate,
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
const updateAppointmentListPatient = asyncHandler(async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      // const userGroup = await db.userGroup.findOne({
      //   where: { groupName: req.user.user.role },
      // });
      // const authorization = await db.authorizations.findOne({
      //   where: { userGroupId: userGroup.id, featId: 5 },
      // });
      // if (!authorization.isAccess) {
      //   return res.status(401).json({
      //     status: res.statusCode,
      //     message: "Unauthorized",
      //   });
      // }
      const { patientId, appointmentListId } = req.body;
      if (!patientId || !appointmentListId) {
        res.status(400).json({
          status: res.statusCode,
          message: "All fields are required",
          data: "",
        });
      }
      const record = await db.appointmentListPatient.findOne({
        where: {
          appointmentListId: appointmentListId,
        },
        order: [["orderNumber", "DESC"]],
      });
      const orderNumber = record ? record.orderNumber + 1 : 1;

      const appointmentListPatient = await db.appointmentListPatient.update(
        {
          patientId: patientId,
          appointmentListId: appointmentListId,
          orderNumber: orderNumber,
          timeUpdate: Date.now(),
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
      // const userGroup = await db.userGroup.findOne({
      //   where: { groupName: req.user.user.role },
      // });
      // const authorization = await db.authorizations.findOne({
      //   where: { userGroupId: userGroup.id, featId: 6 },
      // });
      // if (!authorization.isAccess) {
      //   return res.status(401).json({
      //     status: res.statusCode,
      //     message: "Unauthorized",
      //   });
      // }
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
const getAppointmentListPatientById = asyncHandler(async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      console.log("this is id", req.params.id);
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
  getAppointmentListPatientById,
  moveAppointmentListPatientToTheEnd,
};
