const jwt = require("jsonwebtoken");
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
		const id = req.body.id;
		const events = db.Events;

		const event = await events.findOne({where: {id: id}});
		if (!event) throw new Error("event didn't found! Incorrect id");
		res.send({event: event});
	} catch (err) {
		res.status(400).send({error: err.message});
	}
};

module.exports.getUserEvents = async (req, res) => {
	try {
		const users = db.Users;
		const events = db.Events;
		const token = getToken(req);
		const decode = await jwt.verify(token, config.token.accessToken);

		const user = await posts.findOne({
			where: {id : decode.id},
			include: events,
		});
		if (!user) throw new Error("user didn't found! Incorrect auth token!");

		res.send({event: user.Events});
	} catch (err) {
		res.status(400).send({error: err.message});
	}
};

module.exports.deleteEventById = async (req, res) => {
	try {
		const events = db.Events;
		const id = req.body.id;
		const event = await events.destroy({
			where: {
				id: id
			},
		});
		if (!event) throw new Error("event didn't found! Incorrect id!");
		res.send({deletedEvent: event});
	} catch (err) {
		res.status(400).send({error: err.message});
	}
};
