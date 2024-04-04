const router = require("express").Router();
import diseaseController from "../controllers/diseaseController";
import { authenticateAccessToken } from "../middleware/jwt";

router
  .route("/")
  .get(authenticateAccessToken, diseaseController.getAllDiseases)
  .post(authenticateAccessToken, diseaseController.createDisease);

router
  .route("/:id")
  .get(authenticateAccessToken, diseaseController.getDiseaseById)
  .put(authenticateAccessToken, diseaseController.updateDiseaseById)
  .delete(authenticateAccessToken, diseaseController.deleteDiseaseById);

module.exports = router;
