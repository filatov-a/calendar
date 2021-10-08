const jwt = require('jsonwebtoken');
const config = require('../config/project');
const argon2 = require('argon2');
const mail = require('../email/email');
const db = require('../models/index');

module.exports.create = async (req, res) => {
    try {
        const users = db.Users;
        const user = req.body;
        user.password = await argon2.hash(user.password);
        const usrDb = await users.create(user);
        const token = await jwt.sign({id: usrDb.id}, config.token.verifyEmailToken, {expiresIn: "1h"});
        const url = `http://localhost:3000/register/verify-email/${token}`
        await mail.sendToVerify(user.email, url, 'click to verify account', '');
        res.send({user: usrDb, token: token});
        res.sendStatus(201);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
}

module.exports.getEventById = async (req, res) => {
    try {
        const users = db.Users;
        const user = req.body;
        user.password = await argon2.hash(user.password);
        const usrDb = await users.create(user);
        const token = await jwt.sign({id: usrDb.id}, config.token.verifyEmailToken, {expiresIn: "1h"});
        const url = `http://localhost:3000/register/verify-email/${token}`
        await mail.sendToVerify(user.email, url, 'click to verify account', '');
        res.send({user: usrDb, token: token});
        res.sendStatus(201);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
}

module.exports.deleteEventById = async (req, res) => {
    try {
        const users = db.Users;
        const user = req.body;
        user.password = await argon2.hash(user.password);
        const usrDb = await users.create(user);
        const token = await jwt.sign({id: usrDb.id}, config.token.verifyEmailToken, {expiresIn: "1h"});
        const url = `http://localhost:3000/register/verify-email/${token}`
        await mail.sendToVerify(user.email, url, 'click to verify account', '');
        res.send({user: usrDb, token: token});
        res.sendStatus(201);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
}