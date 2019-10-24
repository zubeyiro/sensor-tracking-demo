const hWorkout = require('../../../lib/data/workouts')

module.exports = async function (req, res) {
    res.send(global.response.success(hWorkout.getAvailableWorkouts()))
};