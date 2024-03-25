const router = require("express").Router();
import { authenticateAccessToken } from "../middleware/jwt";

router
  .route("/")
  .get(authenticateAccessToken, argumentController.getAllArguments)
  .post(authenticateAccessToken, argumentController.addArgument);
