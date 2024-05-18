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

router.route("/:id").get(appointmentListController.getAppointmentListById);

module.exports = router;
