const router = require("express").Router();
import appointmentListPatientController from "../controllers/appointmentListPatientController";
import { authenticateAccessToken } from "../middleware/jwt";

router
  .route("/")
  .get(
    authenticateAccessToken,
    appointmentListPatientController.getAllAppointmentList
  )
  .post(
    authenticateAccessToken,
    appointmentListPatientController.createAppointmentListPatient
  );
router
  .route("/:id")
  .get(
    authenticateAccessToken,
    appointmentListPatientController.getAppointmentListById
  )
  .put(
    authenticateAccessToken,
    appointmentListPatientController.updateAppointmentListPatient
  )
  .delete(
    authenticateAccessToken,
    appointmentListPatientController.deleteAppointmentListPatient
  );

module.exports = router;