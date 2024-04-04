const router = require("express").Router();
import { authenticateAccessToken } from "../middleware/jwt";
import unitController from "../controllers/unitController";

router
  .route("/")
  .get(authenticateAccessToken, unitController.getAllUnit)
  .post(authenticateAccessToken, unitController.createUnit);

router
  .route("/:id")
  .put(authenticateAccessToken, unitController.updateUnitById)
  .delete(authenticateAccessToken, unitController.deleteUnitById);

module.exports = router;
