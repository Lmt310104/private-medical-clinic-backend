import { where } from "sequelize";
import db from "../models/index.js";
import asyncHandler from "express-async-handler";
import sequelize from "sequelize";

const getAllGroupUser = asyncHandler(async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const authorization = await db.authorizations.findOne({
        where: { userGroupId: req.user.user.roleId, featId: 14 },
      });
      if (!authorization.isAccess) {
        return res.status(401).json({
          status: res.statusCode,
          message: "Unauthorized",
        });
      }
      const groupUsers = await db.userGroup.findAll({});
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
const createGroupUser = asyncHandler(async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const authorization = await db.authorizations.findOne({
        where: { userGroupId: req.user.user.roleId, featId: 15 },
      });
      if (!authorization.isAccess) {
        return res.status(401).json({
          status: res.statusCode,
          message: "Unauthorized",
        });
      }
      const groupUser = await db.userGroup.create({
        groupName: req.body.groupName,
        note: "",
      });
      if (groupUser) {
        const allAllowedPermissions = req.body.allAllowedPermissions || [];
        const allFeatures = await db.feats.findAll({});
        const userGroupId = groupUser.dataValues.id;
        for (const feature of allFeatures) {
          if (allAllowedPermissions.includes(feature.dataValues.id)) {
            await db.authorizations.create({
              userGroupId: userGroupId,
              featId: feature.dataValues.id,
              isAccess: true,
            });
          } else {
            await db.authorizations.create({
              userGroupId: userGroupId,
              featId: feature.dataValues.id,
              isAccess: false,
            });
          }
        }
      }

      res.status(200).json({ message: "User Group create successfully" });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
});

const updateGroupUserById = asyncHandler(async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const authorization = await db.authorizations.findOne({
        where: { userGroupId: req.user.user.roleId, featId: 17 },
      });
      if (!authorization.isAccess) {
        return res.status(401).json({
          status: res.statusCode,
          message: "Unauthorized",
        });
      }
      const existingGroupUser = await db.userGroup.findOne({
        where: { id: req.params.id },
      });
      if (!existingGroupUser) {
        return res.status(404).json({ message: "User Group not found" });
      }
      const groupUser = await db.userGroup.update(
        {
          groupName: req.body.groupName,
          note: "",
        },
        {
          where: { id: req.params.id },
        }
      );

      const allAllowedPermissions = req.body.allAllowedPermissions || [];
      const allFeatures = await db.feats.findAll({});
      for (const feature of allFeatures) {
        if (allAllowedPermissions.includes(feature.dataValues.id)) {
          await db.authorizations.update(
            {
              isAccess: true,
            },
            {
              where: {
                userGroupId: req.params.id,
                featId: feature.dataValues.id,
              },
            }
          );
        } else {
          await db.authorizations.update(
            {
              isAccess: false,
            },
            {
              where: {
                userGroupId: req.params.id,
                featId: feature.dataValues.id,
              },
            }
          );
        }
      }

      return res
        .status(200)
        .json({ message: "User Group update successfully", data: groupUser });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
});

const deleteGroupUserById = asyncHandler(async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const authorization = await db.authorizations.findOne({
        where: { userGroupId: req.user.user.roleId, featId: 16 },
      });
      if (!authorization.isAccess) {
        return res.status(401).json({
          status: res.statusCode,
          message: "Unauthorized",
        });
      }
      const existingGroupUser = await db.userGroup.findOne({
        where: { id: req.params.id },
      });
      if (!existingGroupUser) {
        return res.status(404).json({ message: "User Group not found" });
      }

      if (existingGroupUser.isActive === 1)
        await db.userGroup.update(
          { isActive: 0 },
          { where: { id: req.params.id } }
        );
      else
        await db.userGroup.update(
          { isActive: 1 },
          { where: { id: req.params.id } }
        );

      res.status(200).json({ message: "User Group deleted successfully" });
    } else {
      return res.status(401).json({ message: "Unauthenticated" });
    }
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
});

const getGroupUserById = asyncHandler(async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const authorization = await db.authorizations.findOne({
        where: { userGroupId: req.user.user.roleId, featId: 14 },
      });
      if (!authorization.isAccess) {
        return res.status(401).json({
          status: res.statusCode,
          message: "Unauthorized",
        });
      }
      const groupUser = await db.userGroup.findOne({
        where: { id: req.params.id },
      });
      if (!groupUser) {
        res.status(404).json({
          status: res.statusCode,
          message: "group user not found",
          data: "",
        });
      }

      const authorizations = await db.authorizations.findAll({
        where: { userGroupId: req.params.id, isAccess: true },
        attributes: {
          include: [
            [
              sequelize.literal(`(
                          SELECT loadedElement
                          FROM feats
                          WHERE
                          feats.id = authorizations.featId
                        )`),
              "loadedElement",
            ]
          ],
          exclude: ["isAccess", "userGroupId", "id", "createdAt", "updatedAt"],
        },
      });


      const allAllowedPermissions = authorizations.map(
        (permission) => permission.featId
      );

      const allowedPermissionElements = authorizations.map((permission) =>  permission.dataValues.loadedElement);



      res.status(200).json({
        status: res.statusCode,
        message: "group user found",
        data: { groupUser, allAllowedPermissions , allowedPermissionElements},
      });
    } else {
      return res.status(401).json({ message: "Unauthenticated" });
    }
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
});

export default {
  getAllGroupUser,
  updateGroupUserById,
  deleteGroupUserById,
  createGroupUser,
  getGroupUserById,
};
