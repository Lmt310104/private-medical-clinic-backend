import db from "../models/index.js";
import asyncHandler from "express-async-handler";

const getAllGroupUser = asyncHandler(async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      // const userGroup = await db.userGroup.findOne({where:{groupName: req.user.user.role}});
      // const authorization = await db.authorizations.findOne({where:{userGroupId: userGroup.id, featId: 25}});
      // if (!authorization.isAccess) {
      //   return res.status(401).json({
      //     status: res.statusCode,
      //     message: "Unauthorized",
      //   });
      // }
      const groupUsers = await db.userGroup.findAll();
      res.status(200).json({
        status: res.statusCode,
        message: "All groups",
        data: groupUsers,
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

const createGroupUser = asyncHandler(async (req, res, next) => {
  try {
    // const userGroup = await db.userGroup.findOne({where:{groupName: req.user.user.role}});
    //   const authorization = await db.authorizations.findOne({where:{userGroupId: userGroup.id, featId: 31}});
    //   if (!authorization.isAccess) {
    //     return res.status(401).json({
    //       status: res.statusCode,
    //       message: "Unauthorized",
    //     });
    //   }
    const { unitName } = req.body;
    if (!unitName) {
      res.status(400).json({
        message: "unitName is required",
      });
    } else {
      const unit = await db.unit.create({
        unitName: unitName,
      });
      if (!unit) {
        res.status(500).json({
          message: "server error",
        });
      }
      res.status(200).json({
        message: "success",
        unit: unit,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "server error",
    });
  }
});

const updateGroupUserById = asyncHandler(async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      // const userGroup = await db.userGroup.findOne({where:{groupName: req.user.user.role}});
      // const authorization = await db.authorizations.findOne({where:{userGroupId: userGroup.id, featId: 33}});
      // if (!authorization.isAccess) {
      //   return res.status(401).json({
      //     status: res.statusCode,
      //     message: "Unauthorized",
      //   });
      // }
      const groupUserId = req.params.id;
      const { unitName } = req.body;
      if (!unitName) {
        res.status(400).json({
          message: "unitName is required",
        });
      } else {
        try {
          const unit = await db.unit.update(
            {
              unitName: unitName,
            },
            {
              where: {
                id: unitId,
              },
            }
          );
          if (!unit[0]) {
            res.status(404).json({
              message: "unit not found",
            });
          }
          res.status(200).json({
            message: "success",
            unit: unit,
          });
        } catch (err) {
          res.status(500).json({
            message: "server error",
          });
        }
      }
    } else {
      res.status(401).json({
        message: "Unauthorized",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "server error",
    });
  }
});

const deleteGroupUserById = asyncHandler(async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      // const userGroup = await db.userGroup.findOne({where:{groupName: req.user.user.role}});
      // const authorization = await db.authorizations.findOne({where:{userGroupId: userGroup.id, featId: 32}});
      // if (!authorization.isAccess) {
      //   return res.status(401).json({
      //     status: res.statusCode,
      //     message: "Unauthorized",
      //   });
      // }
      const unitId = req.params.id;
      try {
        const unit = await db.unit.destroy({
          where: {
            id: unitId,
          },
        });
        if (!unit) {
          res.status(404).json({
            message: "unit not found",
          });
        }
      } catch {
        res.status(500).json({
          message: "server error",
        });
      }
      res.status(200).json({
        message: "success",
      });
    } else {
      res.status(401).json({
        message: "Unauthorized",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "server error",
    });
  }
});

export default {
  getAllGroupUser,
  createGroupUser,
  updateGroupUserById,
  deleteGroupUserById,
};
