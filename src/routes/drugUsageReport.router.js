const router = require("express").Router();
import { authenticateAccessToken } from "../middleware/jwt";
const drugUsageReportController = require("../controllers/drugUsageReport");

router
  .route("/")
  .get(
    authenticateAccessToken,
    drugUsageReportController.getAllDrugUsageReport
  );
module.exports = router;
