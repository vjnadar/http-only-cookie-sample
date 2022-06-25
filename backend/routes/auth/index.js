const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth");

router.post("/setHttpOnlyCookie", authController.setHttpOnlyCookie);
router.post("/sendHttpOnlyCookie", authController.sendHttpOnlyCookie);
router.post("/removeHttpOnlyCookie", authController.clearHttpOnlyCookie);
module.exports = router;
