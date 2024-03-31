const router = require("express").Router();
import userController from "../controllers/userController";
import { authenticateAccessToken } from "../middleware/jwt";

router
  .route("/")
  .get(authenticateAccessToken, userController.getAllUser)
  .post(authenticateAccessToken, userController.createUser);

router
  .route("/:id")
  .get(authenticateAccessToken, userController.getUserById)
  .put(authenticateAccessToken, userController.updateUserById)
  .delete(authenticateAccessToken, userController.deleteUserById);
module.exports = router;
