const express = require("express");
const router = express.Router();
const controller = require('../controllers/auth.js')
const schemas = require('../schemas/schemas.js')
const middleware = require('../middleware/joi.js');

router.post('/register', middleware(schemas.user_schema), controller.register);
router.get('/register/verify-email/:token', controller.registerVerify);
router.post('/login', controller.login)
router.post('/password-reset', controller.passwordReset);
router.get('/password-reset/:token', middleware(schemas.password_schema), controller.passwordResetVerify);

module.exports = router;