import db from "../models/index";
import asyncHandler from "express-async-handler";
import sequelize from "sequelize";

const getAllAuthorizations = asyncHandler(async (req, res, next) => {
  try {
    if (req.isAuthenticated())
    {
      const userGroup = await db.userGroup.findOne({
        where: { groupName: req.user.user.role },
      });
      const authorizationAccess = await db.authorizations.findOne({
        where: { userGroupId: userGroup.id, featId: 46 },
      });
      if (!authorizationAccess.isAccess) {
        return res.status(401).json({
          status: res.statusCode,
          message: "Unauthorized",
        });
      }
      const authorization = await db.authorizations.findAll({
        attributes: {
          include: [
            [
              sequelize.literal(`(
                          SELECT featName
                          FROM feats AS feat
                          WHERE
                            feat.id = authorizations.featId
                        )`),
              "featName",
            ],
          ],
        },
      });
      if (!authorization) {
        return res.status(404).json({ message: "Not Found" });
      }
      res.status(200).json({
        status: res.statusCode,
        message: "success",
        data: authorization,
      });
    }
    else {
      return res.status(401).json({message: "Unauthorized"});
    }
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});
const updateAccessFeat = asyncHandler(async (req, res, next) => {
  try {
    if (req.isAuthenticated())
    {
      // const userGroup = await db.userGroup.findOne({
      //   where: { groupName: req.user.user.role },
      // });
      // const authorization = await db.authorizations.findOne({
      //   where: { userGroupId: userGroup.id, featId: 47 },
      // });
      // if (!authorization.isAccess) {
      //   return res.status(401).json({
      //     status: res.statusCode,
      //     message: "Unauthorized",
      //   });
      // }
      const existingAuthorization = await db.authorizations.findOne({
        where: { userGroupId: req.body.userGroupId, featId: req.body.featId },
      });
      if (!existingAuthorization) {
        return res.status(404).json({ message: "Not Found" });
      }
      await db.authorizations.update(
        {
          isAccess: !existingAuthorization.isAccess,
        },
        {
          where: {
            id: existingAuthorization.id,
          },
        }
      );
      return res.status(200).json({ message: "Updated successfully" });
    }
    else {
        return res.status(401).json({message: "Unauthorized"});
    }
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});
export default {
  getAllAuthorizations: getAllAuthorizations,
  updateAccessFeat: updateAccessFeat,
};
