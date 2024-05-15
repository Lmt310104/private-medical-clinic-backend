const router = require("express").Router();
import drugController from "../controllers/drugController";
import { authenticateAccessToken } from "../middleware/jwt";

router
  .route("/")
  .get(authenticateAccessToken, drugController.getAllDrugs)
  .post(authenticateAccessToken, drugController.addDrug);
router
  .route("/:id")
  .get(authenticateAccessToken, drugController.getDrug)
  .put(authenticateAccessToken, drugController.updateDrug)
  .delete(authenticateAccessToken, drugController.deleteDrug);
router
  .route("/status/:id")
  .post(authenticateAccessToken, drugController.updateStatusById);
module.exports = router;
