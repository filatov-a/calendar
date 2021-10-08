const express = require("express");
const router = express.Router();

const user = require("./user.js");
const auth = require("./auth.js");
const event = require("./event.js");

router.use("/", user);
router.use("/", auth);
router.use("/", event);

module.exports = router;