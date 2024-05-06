import db from "../models/index.js";
import asyncHandler from "express-async-handler";

const getAllGroupUser = asyncHandler(async (req, res) => {
  try {
     if (req.isAuthenticated()) {
      const userGroup = await db.userGroup.findOne({where:{groupName: req.user.user.role}});
      const authorization = await db.authorizations.findOne({where:{userGroupId: userGroup.id, featId: 25}});
      if (!authorization.isAccess) { 
        return res.status(401).json({
          status: res.statusCode,
          message: "Unauthorized",
        });
      } 
      const groupUsers = await db.userGroup.findAll();
      res.status(200).json({ success: "success", groupUsers: groupUsers });
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
const createGroupUser = asyncHandler(async(req, res) => {
  try {
    if (req.isAuthenticated()) {
      const userGroup = await db.userGroup.findOne({where:{groupName: req.user.user.role}});
      const authorization = await db.authorizations.findOne({where:{userGroupId: userGroup.id, featId: 48}});
      if (!authorization.isAccess) { 
        return res.status(401).json({
          status: res.statusCode,
          message: "Unauthorized",
        });
      } 
      const groupUser = await db.userGroup.create(req.body);
      const newDrugs = await db.drugs.create({
        groupName: groupUser.groupName,
        note: groupUser.note,
      });
      res.status(200).json({ message: "User Group create successfully" });
    }
    else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
});

const updateGroupUserById = asyncHandler(async(req, res) => {
  try {
    if (req.isAuthenticated()) {
      const userGroup = await db.userGroup.findOne({where:{groupName: req.user.user.role}});
      const authorization = await db.authorizations.findOne({where:{userGroupId: userGroup.id, featId: 50}});
      if (!authorization.isAccess) { 
        return res.status(401).json({
          status: res.statusCode,
          message: "Unauthorized",
        });
      } 
      const existingGroupUser = await db.userGroup.findOne({where:{ id: req.params.id}});
      if (!existingGroupUser) {
        return res.status(404).json({message: "User Group not found"});
      }
      const groupUser = await db.userGroup.update({
        groupName: req.body.groupName,
        note: req.body.note,
      }, {
        where: { id: req.params.id },
      });
      return res.status(200).json({ message: "User Group update successfully" });
    }
    else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
});

const deleteGroupUserById = asyncHandler(async(req, res) => {
  try {
    if (req.isAuthenticated()) {
      const userGroup = await db.userGroup.findOne({where:{groupName: req.user.user.role}});
      const authorization = await db.authorizations.findOne({where:{userGroupId: userGroup.id, featId: 49}});
      if (!authorization.isAccess) { 
        return res.status(401).json({
          status: res.statusCode,
          message: "Unauthorized",
        });
      } 
      const existingGroupUser = await db.userGroup.findOne({where:{ id: req.params.id}});
      if (!existingGroupUser) {
        return res.status(404).json({message: "User Group not found"});
      }
      await db.userGroup.destroy({ where: { id: req.params.id } });
      res.status(200).json({ message: "User Group deleted successfully" });
    }
    else {
      return res.status(401).json({ message: "Unauthenticated"});
    }
  } catch (err) { 
    return res.status(500).json({ message: "server error" });
  }
});

export default { getAllGroupUser, updateGroupUserById, deleteGroupUserById, createGroupUser };
