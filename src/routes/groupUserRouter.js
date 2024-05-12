const router = require("express").Router();
import { authenticateAccessToken } from "../middleware/jwt";
import groupUserController from "../controllers/groupUserController";

router
  .route("/")
  .get(authenticateAccessToken, groupUserController.getAllGroupUser)
  .post(authenticateAccessToken, groupUserController.createGroupUser);

router
  .route("/:id")
  .get(authenticateAccessToken, groupUserController.getGroupUserById)
  .put(authenticateAccessToken, groupUserController.updateGroupUserById)
  .delete(authenticateAccessToken, groupUserController.deleteGroupUserById);

module.exports = router;