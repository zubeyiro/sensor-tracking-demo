const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const validator = require('express-joi-validation').createValidator({})

router.use(function (req, res, next) {
    next();
});

router.get('/', require('./controllers/sensors.list.available'))

module.exports = router;