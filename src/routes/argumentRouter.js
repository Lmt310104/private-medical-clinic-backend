const router = require("express").Router();

router.route("/maxnumofpatients").post(authController.login);

module.exports = router;
