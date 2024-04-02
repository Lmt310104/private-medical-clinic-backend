const router = require("express").Router();
import { authenticateAccessToken } from "../middleware/jwt";
import appointmentRecordController from "../controllers/appointmentRecordController";

router
  .route("/")
  .get(
    authenticateAccessToken,
    appointmentRecordController.getAllAppointmentRecords
  )
  .post(
    authenticateAccessToken,
    appointmentRecordController.createAppointmentRecord
  );
// router
//   .route("/:id")
//   .get(authenticateAccessToken, appointment.getAppointmentRecordById)
//   .put(authenticateAccessToken, appointment.updateAppointmentRecordById)
//   .delete(authenticateAccessToken, appointment.deleteAppointmentRecordById);

module.exports = router;
