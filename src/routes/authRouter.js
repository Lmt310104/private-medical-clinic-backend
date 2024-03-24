const router = require("express").Router();
import authController from "../controllers/authController";

router.route("/login").post(authController.login);
router
  .route("/success")
  .get(authController.isLoggedIn, authController.isSuccessLogin);
router.route("/failure").get(authController.isFailureLogin);
router.route("/logout").get(authController.Logout);

module.exports = router;
