const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const validator = require('express-joi-validation').createValidator({})

router.use(function (req, res, next) {
    next();
});

router.post('/login', validator.body(Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required()
})), require('./controllers/login'))

module.exports = router;