const router = require("express").Router();
import { authenticateAccessToken } from "../middleware/jwt";
import usageController from "../controllers/usageController";

router
  .route("/")
  .get(authenticateAccessToken, usageController.getAllUsage)
  .post(authenticateAccessToken, usageController.createUsage);
router
  .route("/:id")
  .put(authenticateAccessToken, usageController.updateUsageById)
  .delete(authenticateAccessToken, usageController.deleteUsageById);
module.exports = router;
