import db from "../models/index";
import asyncHandler from "express-async-handler";

const getAllDiseases = asyncHandler(async (req, res) => {
  try {
    // if (req.isAuthenticated()) {
    const diseases = await db.diseases.findAll();
    if (!diseases) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ success: "success", diseases: diseases });
    // } else {
    // res.status(401).json({ message: "Unauthorized" });
    // }
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
});
const getDiseaseById = asyncHandler(async (req, res) => {
  try {
    // if (req.isAuthenticated()) {
    const id = req.params.id;
    const disease = await db.diseases.findOne({ where: { id: id } });
    if (!disease) {
      return res.status(404).json({ message: "Disease not found" });
    }
    res.status(200).json({ success: "success", disease: disease });
    // } else {
    // res.status(401).json({ message: "Unauthorized" });
    // }
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
});
const createDisease = asyncHandler(async (req, res) => {
  try {
    // if (req.isAuthenticated()) {
    const { diseaseName } = req.body;
    const disease = await db.diseases.create({
      diseaseName: diseaseName,
    });
    res.status(201).json({ success: "success", disease: disease });
    // } else {
    // res.status(401).json({ message: "Unauthorized" });
    // }
  } catch (err) {
    res.status(500).json({
      message: "server error",
    });
  }
});
const updateDiseaseById = asyncHandler(async (req, res) => {
  try {
    // if (req.isAuthenticated()) {
    const id = req.params.id;
    const { diseaseName } = req.body;
    const disease = await db.diseases.findOne({ where: { id: id } });
    if (!disease) {
      return res.status(404).json({ message: "Disease not found" });
    }
    disease.diseaseName = diseaseName;
    await disease.save();
    res.status(200).json({ success: "success", disease: disease });
    // } else {
    // res.status(401).json({ message: "Unauthorized" });
    // }
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
});
const deleteDiseaseById = asyncHandler(async (req, res) => {
  try {
    // if (req.isAuthenticated()) {
    const id = req.params.id;
    const disease = await db.diseases.findOne({ where: { id: id } });
    if (!disease) {
      return res.status(404).json({ message: "Disease not found" });
    }
    await disease.destroy();
    res.status(200).json({ success: "success" });
    // } else {
    // res.status(401).json({ message: "Unauthorized" });
    // }
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
