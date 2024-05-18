const router = require("express").Router();
import { authenticateAccessToken } from "../middleware/jwt";
import appointmentRecordDetailController from "../controllers/appointmentRecordDetailController";

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
