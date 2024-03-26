const router = require("express").Router();
import { authenticateAccessToken } from "../middleware/jwt";

//maxnumofpatients
router
  .route("/maxnumofpatients")
  .post(authenticateAccessToken, authController.login)
  .put(authenticateAccessToken, authController.login)
  .delete(authenticateAccessToken, authController.login)
  .get(authenticateAccessToken, authController.login);

//feeConsult
router
  .route("/feeConsult")
  .post(authenticateAccessToken, authController.login)
  .put(authenticateAccessToken, authController.login)
  .delete(authenticateAccessToken, authController.login)
  .get(authenticateAccessToken, authController.login);

module.exports = router;
