import db from "../models/index";
import asyncHandler from "express-async-handler";

const getAllFeatures = asyncHandler(async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      const features = await db.feats.findAll();
      if (!features) {
        return res.status(404).json({ message: "Not Found" });
      }
      const nonNullFeatures = features.filter(
        (feature) => feature.loadedElement !== null
      );
      res.status(200).json({
        status: res.statusCode,
        message: "success",
        data: nonNullFeatures,
      });
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});
export default {
  getAllFeatures: getAllFeatures,
};
