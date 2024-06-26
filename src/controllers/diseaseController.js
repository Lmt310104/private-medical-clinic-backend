import db from "../models/index";
import asyncHandler from "express-async-handler";

const getAllDiseases = asyncHandler(async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      // const diseaseName = req.query.diseaseName || "";
      // const orderBy = req.query.orderBy || "diseaseName";
      // const order = req.query.order || "ASC";
      // const diseases = await db.diseases.findAll(
      //   {
      //     where: { diseaseName: { [Op.like]: `%${diseaseName}%` } },
      //   },
      //   {
      //     order: [[orderBy, order]],
      //   }
      // );
      // const userGroup = await db.userGroup.findOne({where:{groupName: req.user.user.role}});
      // const authorization = await db.authorizations.findOne({where:{userGroupId: userGroup.id, featId: 21}});
      // if (!authorization.isAccess) { 
      //   return res.status(401).json({
      //     status: res.statusCode,
      //     message: "Unauthorized",
      //   });
      // } 
      const diseases = await db.diseases.findAll();
      if (!diseases) {
        res.status(404).json({ message: "Not found" });
      }
      res.status(200).json({ success: "success", diseases: diseases });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
});
const getDiseaseById = asyncHandler(async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      // const userGroup = await db.userGroup.findOne({where:{groupName: req.user.user.role}});
      // const authorization = await db.authorizations.findOne({where:{userGroupId: userGroup.id, featId: 21}});
      // if (!authorization.isAccess) { 
      //   return res.status(401).json({
      //     status: res.statusCode,
      //     message: "Unauthorized",
      //   });
      // } 
      const id = req.params.id;
      const disease = await db.diseases.findOne({ where: { id: id } });
      if (!disease) {
        return res.status(404).json({ message: "Disease not found" });
      }
      res.status(200).json({ success: "success", disease: disease });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
});
const createDisease = asyncHandler(async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      // const userGroup = await db.userGroup.findOne({where:{groupName: req.user.user.role}});
      // const authorization = await db.authorizations.findOne({where:{userGroupId: userGroup.id, featId: 22}});
      // if (!authorization.isAccess) { 
      //   return res.status(401).json({
      //     status: res.statusCode,
      //     message: "Unauthorized",
      //   });
      // } 
      const { diseaseName } = req.body;
      const disease = await db.diseases.create({
        diseaseName: diseaseName,
      });
      res.status(201).json({ success: "success", disease: disease });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    res.status(500).json({
      message: "server error",
    });
  }
});
const updateDiseaseById = asyncHandler(async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      // const userGroup = await db.userGroup.findOne({where:{groupName: req.user.user.role}});
      // const authorization = await db.authorizations.findOne({where:{userGroupId: userGroup.id, featId: 24}});
      // if (!authorization.isAccess) { 
      //   return res.status(401).json({
      //     status: res.statusCode,
      //     message: "Unauthorized",
      //   });
      // } 
      const id = req.params.id;
      const { diseaseName } = req.body;
      const disease = await db.diseases.findOne({ where: { id: id } });
      if (!disease) {
        return res.status(404).json({ message: "Disease not found" });
      }
      disease.diseaseName = diseaseName;
      await disease.save();
      res.status(200).json({ success: "success", disease: disease });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
});
const deleteDiseaseById = asyncHandler(async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      // const userGroup = await db.userGroup.findOne({where:{groupName: req.user.user.role}});
      // const authorization = await db.authorizations.findOne({where:{userGroupId: userGroup.id, featId: 23}});
      // if (!authorization.isAccess) { 
      //   return res.status(401).json({
      //     status: res.statusCode,
      //     message: "Unauthorized",
      //   });
      // } 
      const id = req.params.id;
      const disease = await db.diseases.findOne({ where: { id: id } });
      if (!disease) {
        return res.status(404).json({ message: "Disease not found" });
      }
      await disease.destroy();
      res.status(200).json({ success: "success" });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
});

export default {
  getAllDiseases,
  getDiseaseById,
  createDisease,
  updateDiseaseById,
  deleteDiseaseById,
};
