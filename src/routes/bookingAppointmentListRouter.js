const router = require("express").Router();
import { authenticateAccessToken } from "../middleware/jwt";
import bookingAppointmentList from "../controllers/bookingAppointmentListController";

router
  .route("/")
  .get(authenticateAccessToken ,bookingAppointmentList.getAllBookingAppointmentList)
  .post(authenticateAccessToken, bookingAppointmentList.createBookingAppointment)
router
  .route("/bookingAppointmentListByDate")
  .get(authenticateAccessToken, bookingAppointmentList.getBookingAppointmentListByDate)
router 
  .route("/fetchDataFromGoogleSheets")
  .get(authenticateAccessToken, bookingAppointmentList.fetchDataFromGoogleSheets)
router
  .route("/:id")
  .delete(authenticateAccessToken, bookingAppointmentList.deleteBookingAppointmentById)
  .put(authenticateAccessToken, bookingAppointmentList.updateBookingAppointmentById);

module.exports = router;