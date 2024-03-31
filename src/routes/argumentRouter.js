const router = require("express").Router();
import { authenticateAccessToken } from "../middleware/jwt";
import argumentController from "../controllers/argumentController";
//maxnumofpatients
router
  .route("/maxnumofpatients")
  .get(authenticateAccessToken, argumentController.getMaxNumOfPatients)
  .put(authenticateAccessToken, argumentController.updateMaxNumOfPatients);

// feeConsult
router
  .route("/feeConsult")
  .get(authenticateAccessToken, argumentController.getFeeConsult)
  .put(authenticateAccessToken, argumentController.updateFeeConsult);

module.exports = router;
