const hAllocation = require('../../../lib/data/allocations')
const hSensor = require('../../../lib/data/sensors')

module.exports = async function (req, res) {
    let _currentAllocation = hAllocation.userHasCurrentAllocationForWorkout(req.body.workout_id, res.locals.userID)
    let _allocate = true

    if (_currentAllocation) { // If user already allocated a sensor for this workout
        if (_currentAllocation.sensor_id != req.body.sensor_id) {
            if (!hSensor.isSensorBelongsToUser(_currentAllocation.sensor_id, res.locals.userID)) { // not users property, should be allocatable again
                hSensor.changeSensorAllocatableStatus(_currentAllocation.sensor_id) // make sensor allocatable again
                hAllocation.archiveAllocation(_currentAllocation.id) // archive this allocation
            }
        }
        else {// If user tries to allocate same sensor for same workout
            _allocate = false
        }
    }

    // Allocate sensor for user
    if (_allocate) {
        hAllocation.allocateNewSensorForUser(req.body.workout_id, req.body.sensor_id, res.locals.userID)

        global.io.sockets.emit("update", { // push allocation data to socket
            type: "allocation",
            workout_id: req.body.workout_id,
            allocation_count: hAllocation.getCurrentAllocationsForWorkout(req.body.workout_id).length
        })
    }

    res.send(global.response.success("Allocation completed"))
};