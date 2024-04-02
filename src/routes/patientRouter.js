const router = require("express").Router();
import { authenticateAccessToken } from "../middleware/jwt";
import patientController from "../controllers/patientController";

router
  .route("/")
  .get(authenticateAccessToken, patientController.getAllPatients)
  .post(authenticateAccessToken, patientController.createPatient);

router
  .route("/:id")
  .get(authenticateAccessToken, patientController.getPatientById)
  .put(authenticateAccessToken, patientController.updatePatientById)
  .delete(authenticateAccessToken, patientController.deletePatientById);

module.exports = router;
