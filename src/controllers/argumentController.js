import db from "../models";
import asyncHandler from "express-async-handler";

const getMaxNumOfPatients = asyncHandler(async (req, res, next) => {
  try {
     if (req.isAuthenticated()) {
    const argument = await db.arguments.findAll();
    if (!argument) {
      res.status(404).json({ message: "Max number of patients not found" });
    }
    res.status(200).json({
      message: "Max number of patients",
      maxNumOfPatients: argument,
    });
     } else {
     res.status(401).json({ message: "You are not authenticated" });
     }
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
});
const updateMaxNumOfPatients = asyncHandler(async (req, res, next) => {
  try {
     if (req.isAuthenticated()) {
    const { maxNumberOfPatients } = req.body;
    if (!maxNumberOfPatients) {
      res.status(400).json({ message: "Max number of patients is required" });
    }
    const argument = await db.arguments.update(
      {
        maxNumberOfPatients: maxNumberOfPatients,
      },
      { where: { id: 1 } }
    );
    if (!argument) {
      res.status(404).json({ message: "Max number of patients not found" });
    }
    res.status(200).json({
      message: "Max number of patients updated",
      maxNumOfPatients: argument,
    });
     } else {
     res.status(401).json({ message: "You are not authenticated" });
     }
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
});
const getFeeConsult = asyncHandler(async (req, res, next) => {
  try {
     if (req.isAuthenticated()) {
    const argument = await db.arguments.findAll();
    if (!argument) {
      res.status(404).json({ message: "Fee consult not found" });
    }
    res.status(200).json({ message: "Fee consult", feeConsult: argument });
     } else {
     res.status(401).json({ message: "You are not authenticated" });
     }
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
});
const updateFeeConsult = asyncHandler(async (req, res, next) => {

  try {
     if (req.isAuthenticated()) {
    const { feeConsult } = req.body;
    if (!feeConsult) {
      res.status(400).json({ message: "Fee consult is required" });
    }
    const argument = await db.arguments.update(
      {
        feeConsult: feeConsult,
      },
      { where: { id: 1 } }
    );
    if (!argument) {
      res.status(404).json({ message: "Fee consult not found" });
    }
    res.status(200).json({
      message: "Fee consult updated",
      feeConsult: argument,
    });
     } else {
     res.status(401).json({ message: "You are not authenticated" });
     }
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
});
export default {
  getMaxNumOfPatients,
  updateMaxNumOfPatients,
  getFeeConsult,
  updateFeeConsult,
};
