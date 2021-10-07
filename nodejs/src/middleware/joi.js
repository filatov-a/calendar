const Joi = require('joi');

const joi = (schema, property) => {
    return async (req, res, next) => {
        const { error } = await schema.validate(req.body);
        const valid = error == null;

        if (valid) {
            await next();
        } else {
            const { details } = error;
            let message = details.map(i => i.message).join(',');

            console.log("error", message);
            res.status(422).send({ error: message });
        }
    }
}

module.exports = joi;