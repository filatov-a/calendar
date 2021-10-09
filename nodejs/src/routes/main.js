const express = require("express");
const router = express.Router();

const controllerEvent = require('../controllers/event.js')
const controllerAuth = require('../controllers/auth.js')

const schemas = require('../schemas/schemas.js')
const middleware = require('../middleware/joi.js');

router.post('/auth/register', middleware(schemas.user_schema), controllerAuth.register);
router.get('/auth/register/verify-email/:token', controllerAuth.registerVerify);
router.post('/auth/login', controllerAuth.login)

router.post('/event', middleware(schemas.user_schema), controllerEvent.create);
router.get('/event/:id', controllerEvent.getEventById);
router.delete('/event/:id', controllerEvent.deleteEventById);

module.exports = router;
