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
router
  .route("/:id")
  .get(
    authenticateAccessToken,
    appointmentRecordController.getAppointmentRecordById
  )
  .put(
    authenticateAccessToken,
    appointmentRecordController.updateAppointmentRecordById
  )
  .delete(
    authenticateAccessToken,
    appointmentRecordController.deleteAppointmentRecordById
  );

module.exports = router;
