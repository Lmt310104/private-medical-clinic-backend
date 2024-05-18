const router = require("express").Router();
import { Model } from "sequelize";
import featureController from "../controllers/featureController";
import { authenticateAccessToken } from "../middleware/jwt";

router
  .route("/")
  .get(authenticateAccessToken, featureController.getAllFeatures);

module.exports = router;
