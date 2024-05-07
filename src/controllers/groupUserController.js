import db from "../models/index.js";
import asyncHandler from "express-async-handler";

const getAllGroupUser = asyncHandler(async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const userGroup = await db.userGroup.findOne({
        where: { groupName: req.user.user.role },
      });
      const authorization = await db.authorizations.findOne({
        where: { userGroupId: userGroup.id, featId: 25 },
      });
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

export default { getAllGroupUser };
