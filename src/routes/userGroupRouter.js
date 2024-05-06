const router = require("express").Router();
import { authenticateAccessToken } from "../middleware/jwt";
import userGroupController from "../controllers/groupUserController";

router
  .route("/")
  .get(authenticateAccessToken, userGroupController.getAllGroupUser)
  .post(authenticateAccessToken, userGroupController.createGroupUser);

router
  .route("/:id")
  .put(authenticateAccessToken, userGroupController.updateGroupUserById)
  .delete(authenticateAccessToken, userGroupController.deleteGroupUserById);

module.exports = router;
