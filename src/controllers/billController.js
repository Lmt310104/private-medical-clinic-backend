import db from "../models/index";
import asyncHandler from "express-async-handler";
import { Op } from "sequelize";
const getAllBill = asyncHandler(async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      // const userGroup = await db.userGroup.findOne({where:{groupName: req.user.user.role}});
      // const authorization = await db.authorizations.findOne({where:{userGroupId: userGroup.id, featId: 17}});
      // if (!authorization.isAccess) {
      //   return res.status(401).json({
      //     status: res.statusCode,
      //     message: "Unauthorized",
      //   });
      // }
      const patientId = req.query.patientId ?? "";
      const appointmentListId = req.query.appointmentListId ?? "";
      if (patientId === "" && appointmentListId === "") {
        const bill = await db.bills.findAll();
        res.status(200).json({
          status: res.statusCode,
          message: "success",
          data: bill,
        });
      } else {
        const bill = await db.bills.findAll({
          where: [
            Op.or,
            { patientId: patientId },
            { appointmentListId: appointmentListId },
          ],
        });
        res.status(200).json({
          status: res.statusCode,
          message: "success",
          data: bill,
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
const getBillById = asyncHandler(async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      // const userGroup = await db.userGroup.findOne({where:{groupName: req.user.user.role}});
      // const authorization = await db.authorizations.findOne({where:{userGroupId: userGroup.id, featId: 17}});
      // if (!authorization.isAccess) {
      //   return res.status(401).json({
      //     status: res.statusCode,
      //     message: "Unauthorized",
      //   });
      // }
      const bill = await db.bills.findOne({ where: { id: req.params.id } });
      res.status(200).json({
        status: res.statusCode,
        message: "success",
        data: bill,
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
const createBill = asyncHandler(async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      // const userGroup = await db.userGroup.findOne({where:{groupName: req.user.user.role}});
      // const authorization = await db.authorizations.findOne({where:{userGroupId: userGroup.id, featId: 18}});
      // if (!authorization.isAccess) {
      //   return res.status(401).json({
      //     status: res.statusCode,
      //     message: "Unauthorized",
      //   });
      // }
      const bill = req.body;
      const newBill = await db.bills.create({
        patientId: bill.patientId,
        appointmentListId: bill.appointmentListId,
        drugExpense: bill.drugExpense,
        feeConsult: bill.feeConsult,
      });
      res.status(200).json({
        status: res.statusCode,
        message: "success",
        data: newBill,
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
const updateBillById = asyncHandler(async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      // const userGroup = await db.userGroup.findOne({where:{groupName: req.user.user.role}});
      // const authorization = await db.authorizations.findOne({where:{userGroupId: userGroup.id, featId: 20}});
      // if (!authorization.isAccess) {
      //   return res.status(401).json({
      //     status: res.statusCode,
      //     message: "Unauthorized",
      //   });
      // }
      const bill = req.body;
      const existingBill = await db.bills.findOne({
        where: { id: req.params.id },
      });
      if (!existingBill) {
        return res.status(404).json({
          status: res.statusCode,
          message: "Bill not found",
          data: "",
        });
      }
      await db.bills.update(
        {
          patientId: bill.patientId,
          appointmentListId: bill.appointmentListId,
          drugExpense: bill.drugExpense,
          feeConsult: bill.feeConsult,
        },
        { where: { id: req.params.id } }
      );
      res.status(200).json({
        status: res.statusCode,
        message: "Bill updated successfully",
        data: bill,
      });
    } else {
      res
        .status(401)
        .json({ status: res.statusCode, message: "Unauthorized", data: "" });
    }
  } catch (err) {
    res.status(500).json({
      status: res.statusCode,
      message: "server error",
      data: "",
    });
  }
});
const deleteBillById = asyncHandler(async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      // const userGroup = await db.userGroup.findOne({where:{groupName: req.user.user.role}});
      // const authorization = await db.authorizations.findOne({where:{userGroupId: userGroup.id, featId: 19}});
      // if (!authorization.isAccess) {
      //   return res.status(401).json({
      //     status: res.statusCode,
      //     message: "Unauthorized",
      //   });
      // }
      const bill = await db.bills.destroy({ where: { id: req.params.id } });
      res.status(200).json({
        status: res.statusCode,
        message: "Bill deleted successfully",
        data: "",
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
  getAllBill,
  getBillById,
  createBill,
  updateBillById,
  deleteBillById,
};
