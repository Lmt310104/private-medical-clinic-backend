const router = require("express").Router();
import dialogFlowController from "../controllers/dialogFlowController";

router
  .route("/")
  .post(dialogFlowController.chatBotMessage);

module.exports = router;