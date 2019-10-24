const hSensor = require('./sensors')

const ret = {
    getCurrentAllocationsForWorkout: (workoutID) => {
        let _allocations = []

        global.data.allocations.forEach(allocation => {
            if (allocation.workout_id === workoutID && allocation.current) {
                _allocations.push({
                    id: allocation.id,
                    user_id: allocation.user_id,
                    sensor_id: allocation.sensor_id,
                    is_sensor_user_property: hSensor.isSensorBelongsToUser(allocation.sensor_id, allocation.user_id),
                    created_at: allocation.created_at
                })
            }
        });

        return _allocations
    },
    userHasCurrentAllocationForWorkout: (workoutID, userID) => {
        let _allocation;

        global.data.allocations.forEach(allocation => {
            if (allocation.workout_id === workoutID && allocation.current && allocation.user_id === userID) {
                _allocation = allocation
            }
        });

        return _allocation
    },
    archiveAllocation: (allocationID) => {
        global.data.allocations.forEach(allocation => {
            if (allocation.id === allocationID) {
                allocation.current = false
            }
        });
    },
    allocateNewSensorForUser: (workoutID, sensorID, userID) => {
        global.data.allocations.push({
            id: global.data.allocations.length + 1,
            workout_id: workoutID,
            user_id: userID,
            sensor_id: sensorID,
            created_at: new Date().getTime(),
            current: true
        })
    }
}

module.exports = ret