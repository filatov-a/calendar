const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const config = require("../config/project");
const db = require("../models/index");
const {getToken} = require("../utils/getToken");

module.exports.createEvent = async (req, res) => {
	try {
		const users = db.Users;
		const events = db.Events;
		const token = getToken(req);
		const decode = await jwt.verify(token, config.token.accessToken);
		const usrDb = await users.findOne({where: {id: decode.id}});
		if (!usrDb) throw new Error("user didn't auth! Incorrect token");
		const eSchema = {
			name: req.body.name,
			startTime: new Date(req.body.startTime),
			endTime: new Date(req.body.endTime),
			descriptions: req.body.descriptions,
			isActive: true,
			userId: usrDb.id,
		};
		const newEvent = await events.create(eSchema);

		res.send({event: newEvent});
	} catch (err) {
		res.status(400).send({error: err.message});
	}
};

module.exports.getEventById = async (req, res) => {
	try {

	} catch (err) {
		res.status(400).send({error: err.message});
	}
};

module.exports.deleteEventById = async (req, res) => {
	try {

	} catch (err) {
		res.status(400).send({error: err.message});
	}
};
