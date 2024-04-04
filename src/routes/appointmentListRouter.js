const router = require("express").Router();
import { authenticateAccessToken } from "../middleware/jwt";
import appointmentListController from "../controllers/appointmentListController";

router
  .route("/")
  .get(authenticateAccessToken, appointmentListController.getAllAppointmentList)
  .post(
    authenticateAccessToken,
    appointmentListController.createAppointmentList
  );

module.exports = router;
