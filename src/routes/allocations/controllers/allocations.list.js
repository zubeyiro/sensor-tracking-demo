const hAllocation = require('../../../lib/data/allocations')

module.exports = async function (req, res) {
    res.send(global.response.success(hAllocation.getCurrentAllocationsForWorkout(req.params.workout_id)))
};