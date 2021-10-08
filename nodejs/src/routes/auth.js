const express = require("express");
const router = express.Router();
const controller = require('../controllers/auth.js')
const schemas = require('../schemas/schemas.js')
const middleware = require('../middleware/joi.js');

router.post('/auth/register', middleware(schemas.user_schema), controller.register);
router.get('/auth/register/verify-email/:token', controller.registerVerify);
router.post('/auth/login', controller.login)

module.exports = router;