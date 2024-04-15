const router = require("express").Router();
import billController from "../controllers/billController";
import { authenticateAccessToken } from "../middleware/jwt";

router
  .route("/")
  .get(authenticateAccessToken, billController.getAllBill)
  .post(authenticateAccessToken, billController.createBill);
router
  .route("/:id")
  .get(authenticateAccessToken, billController.getBillById)
  .put(authenticateAccessToken, billController.updateBillById)
  .delete(authenticateAccessToken, billController.deleteBillById);

module.exports = router;
