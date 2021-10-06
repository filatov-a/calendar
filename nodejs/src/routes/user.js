const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.js");

router.get("/", controller.use);

module.exports = router