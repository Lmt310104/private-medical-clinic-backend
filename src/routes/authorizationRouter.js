const router = require("express").Router();
import authorizations from "../controllers/authorizationController";
import { authenticateAccessToken } from "../middleware/jwt";

router
    .route("/")
    .get(
        authenticateAccessToken,
        authorizations.getAllAuthorizations
    )
    .put(
        authenticateAccessToken,
        authorizations.updateAccessFeat
    )
module.exports = router;