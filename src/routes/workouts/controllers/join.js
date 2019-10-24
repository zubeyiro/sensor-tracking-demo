const hAllocation = require('../../../lib/data/allocations')
const hWorkout = require('../../../lib/data/workouts')

module.exports = async function (req, res) {
    let _currentAllocation = hAllocation.userHasCurrentAllocationForWorkout(req.body.workout_id, res.locals.userID)

    if (_currentAllocation) {
        hWorkout.join(req.body.workout_id, res.locals.userID)

        res.send(global.response.success("Join successful"))
    } else {
        res.send(global.response.success("You need to allocate sensor first"))
    }
};