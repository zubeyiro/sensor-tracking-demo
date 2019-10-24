const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const validator = require('express-joi-validation').createValidator({})

router.use(function (req, res, next) {
    next();
});

router.get('/:workout_id', validator.params(Joi.object({
    workout_id: Joi.number().min(1).required()
})), require('./controllers/allocations.list'))

router.post('/', validator.body(Joi.object({
    workout_id: Joi.number().min(1).required(),
    sensor_id: Joi.number().min(1).required()
})), require('./controllers/allocate'))

module.exports = router;