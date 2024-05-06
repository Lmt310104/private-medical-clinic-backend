import db from "../models/index.js";
import asyncHandler from "express-async-handler";

const getAllUsage = asyncHandler(async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      const userGroup = await db.userGroup.findOne({
        where: { groupName: req.user.user.role },
      });
      const authorization = await db.authorizations.findOne({
        where: { userGroupId: userGroup.id, featId: 34 },
      });
      if (!authorization.isAccess) {
        return res.status(401).json({
          status: res.statusCode,
          message: "Unauthorized",
        });
      }
      const usage = await db.usage.findAll();
      if (!usage) {
        res.status(500).json({
          status: res.statusCode,
          message: "server error",
          data: "",
        });
      }
      res.status(200).json({
        status: res.statusCode,
        message: "success",
        data: usage,
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
const createUsage = asyncHandler(async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      const userGroup = await db.userGroup.findOne({where:{groupName: req.user.user.role}});
      const authorization = await db.authorizations.findOne({where:{userGroupId: userGroup.id, featId: 35}});
      if (!authorization.isAccess) { 
        return res.status(401).json({
          status: res.statusCode,
          message: "Unauthorized",
        });
      } 
      const { usageDes } = req.body;
      if (!usageDes) {
        res.status(400).json({
          status: res.statusCode,
          message: "usageDes is required",
          data: "",
        });
      } else {
        const usage = await db.usage.create({
          usageDes: usageDes,
        });
        if (!usage) {
          res.status(500).json({
            status: res.statusCode,
            message: "server error",
            data: "",
          });
        }
        res.status(200).json({
          status: res.statusCode,
          message: "success",
          data: usage,
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
const updateUsageById = asyncHandler(async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      const userGroup = await db.userGroup.findOne({where:{groupName: req.user.user.role}});
      const authorization = await db.authorizations.findOne({where:{userGroupId: userGroup.id, featId: 37}});
      if (!authorization.isAccess) { 
        return res.status(401).json({
          status: res.statusCode,
          message: "Unauthorized",
        });
      } 
      const usageId = req.params.id;
      const { usageDes } = req.body;
      if (!usageDes) {
        res.status(400).json({
          status: res.statusCode,
          message: "usageDes is required",
          data: "",
        });
      } else {
        const usage = await db.usage.update(
          {
            usageDes: usageDes,
          },
          {
            where: {
              id: usageId,
            },
          }
        );
        if (!usage) {
          res.status(500).json({
            status: res.statusCode,
            message: "server error",
            data: "",
          });
        }
        res.status(200).json({
          status: res.statusCode,
          message: "success",
          data: usage,
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      status: res.statusCode,
      message: "server error",
      data: "",
    });
  }
});
const deleteUsageById = asyncHandler(async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      const userGroup = await db.userGroup.findOne({where:{groupName: req.user.user.role}});
      const authorization = await db.authorizations.findOne({where:{userGroupId: userGroup.id, featId: 36}});
      if (!authorization.isAccess) { 
        return res.status(401).json({
          status: res.statusCode,
          message: "Unauthorized",
        });
      } 
      const usageId = req.params.id;
      const usage = await db.usage.destroy({
        where: {
          id: usageId,
        },
      });
      if (!usage) {
        res.status(500).json({
          status: res.statusCode,
          message: "server error",
          data: "",
        });
      }
      res.status(200).json({
        status: res.statusCode,
        message: "success",
        data: usage,
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
export default { getAllUsage, updateUsageById, createUsage, deleteUsageById };
