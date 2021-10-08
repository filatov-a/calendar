const express = require("express");
const router = express.Router();
const controller = require('../controllers/event.js')
const schemas = require('../schemas/schemas.js')
const middleware = require('../middleware/joi.js');

router.post('/event', middleware(schemas.user_schema), controller.create);
router.get('/event/:id', controller.getEventById);
router.delete('/event/:id', controller.deleteEventById);

module.exports = router;