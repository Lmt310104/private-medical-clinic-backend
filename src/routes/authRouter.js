const router = require("express").Router();
import authController from "../controllers/authController";
const auth = require("../middleware/passport");

router.route("/google").get(auth.authenticate("google"));
router.route("/oauth2/redirect/google").get(
  auth.authenticate("google", {
    successRedirect: "http://localhost:3000/login/success",
    failureRedirect: "http://localhost:3000/",
  })
);
router.route("/login").post(authController.login);
router
  .route("/success")
  .get(authController.isLoggedIn, authController.isSuccessLogin);
router.route("/failure").get(authController.isFailureLogin);
router.route("/logout").get(authController.Logout);
router.route("/change-password/:id").post(authController.changePassword);
router.route("/reset-password/send-otp").post(authController.sendOTP);
router.route("/check-email").post(authController.checkEmail);
router.route("/check-otp").post(authController.checkOTPByEmail);
router.route("/reset-password").post(authController.resetPassword);
router.route("/reset-password-by-id").post(authController.resetPasswordById);
module.exports = router;
