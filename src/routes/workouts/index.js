const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const validator = require('express-joi-validation').createValidator({})

router.use(function (req, res, next) {
    next();
});

router.get('/', require('./controllers/workouts.list'))
router.post('/join', validator.body(Joi.object({
    workout_id: Joi.number().min(1).required()
})), require('./controllers/join'))

module.exports = router;