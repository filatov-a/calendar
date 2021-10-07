const jwt = require('jsonwebtoken');
const config = require('../config/project');
const argon2 = require('argon2');
const mail = require('../email/email');
const db = require('../models/index');

module.exports.register = async (req, res) => {
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

module.exports.registerVerify = async (req, res) => {
    try {
        const users = db.Users;
        let { token } =  await req.params;
        const decoded = await jwt.verify(token, config.token.verifyEmailToken);
        const usrDb = await users.findOne({ where: { id: decoded.id } });
        await usrDb.update({isVerified: true});
        res.send({ msg: 'email successfully verified!' });
    } catch (err){
        res.status(400).send({ error: err.message });
    }
}

module.exports.login = async (req, res) => {
    try {
        const users = db.Users;
        const user = req.body
        const usrDb = await users.findOne({ where: { username: user.username } });
        if (usrDb === null) throw new Error('wrong account login');
        let ok = await argon2.verify(usrDb.password, user.password);
        if (!ok) throw new Error('wrong account password');
        if (!usrDb.isVerified) throw new Error('u must to verify account');
        const token = await jwt.sign({id: usrDb.id}, config.token.accessToken, {expiresIn: '7d'});
        res.send({token: token, user: usrDb});
    } catch (err){
        res.status(401).send({ error: err.message });
    }
}

module.exports.passwordReset = async (req, res) => {
    try {
        const users = db.Users;
        let { email } = req.body;
        const usrDB = await users.findOne({ where: { email: email } });
        const token = await jwt.sign({id: usrDB.id}, config.token.verifyEmailToken, {expiresIn: "1h"});
        const url = `/api/auth/password-reset/${token}`
        await mail.sendToVerify(usrDB.email, url, 'click to account password', '');
        res.send(token);
    } catch (err){
        res.status(400).send({ error: err.message });
    }
}

module.exports.passwordResetVerify = async (req, res) => {
    try {
        const users = db.Users;
        let { token } =  await req.params;
        const decoded = await jwt.verify(token, config.token.verifyEmailToken);
        const usrDb = await users.findOne({ where: { id: decoded.id } });
        const hash = await argon2.hash(usrDb.password)
        await usrDb.update({password: hash});
        res.send({ msg: 'password successfully changed!' });
    } catch (err){
        res.status(400).send({ error: err.message });
    }
}