const router = require("express").Router();
import appointmentRecordDetailController from "../controllers/appointmentRecordDetailController";
import { authenticateAccessToken } from "../middleware/jwt";

router
  .route("/")
  .get(
    authenticateAccessToken,
    appointmentRecordDetailController.getAllAppointmentRecordDetails
  )
  .post(
    authenticateAccessToken,
    appointmentRecordDetailController.createAppointmentRecordDetail
  );
router
  .route("/:id")
  .get(
    authenticateAccessToken,
    appointmentRecordDetailController.getAppointmentRecordDetailById
  )
  .put(
    authenticateAccessToken,
    appointmentRecordDetailController.updateAppointmentRecordDetail
  )
  .delete(
    authenticateAccessToken,
    appointmentRecordDetailController.deleteAppointmentRecordDetail
  );

module.exports = router;
