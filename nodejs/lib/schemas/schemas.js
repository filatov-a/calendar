const Joi = require("joi");

module.exports.user_schema = Joi.object().keys({
	username: Joi.string().min(3).max(200).lowercase()
		.required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(3).max(15).required(),
	password_confirmation: Joi.any().valid(Joi.ref("password")).required(),
	full_name: Joi.string().min(3).max(20).required(),
});

module.exports.password_schema = Joi.object().keys({
	password: Joi.string().min(3).max(15).required(),
	password_confirmation: Joi.any().valid(Joi.ref("password")).required(),
});

module.exports.admin_schema = Joi.object().keys({
	username: Joi.string().min(3).max(200).lowercase(),
	email: Joi.string().email(),
	password: Joi.string().min(3).max(15),
	password_confirmation: Joi.any().valid(Joi.ref("password")),
	full_name: Joi.string().min(3).max(20),
	role: Joi.string().regex(/user|admin/),
});

module.exports.create_schema = Joi.object().keys({
	username: Joi.string().min(3).max(200).lowercase()
		.required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(3).max(15).required(),
	full_name: Joi.string().min(3).max(20).required(),
	role: Joi.string().regex(/user|admin/).required(),
});

module.exports.event_schema = Joi.object().keys({
	name: Joi.string().min(3).max(20).lowercase()
		.required(),
	startTime: Joi.string().isoDate().required(),
	endTime: Joi.string().isoDate().required(),
	descriptions: Joi.string().min(3).max(20).required(),
});
