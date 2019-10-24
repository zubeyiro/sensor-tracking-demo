const ret = {
    getAvailableWorkouts: () => {
        let _workouts = []

        global.data.workouts.forEach(workout => {
            if (!workout.is_completed) {
                _workouts.push({
                    id: workout.id,
                    name: workout.name
                })
            }
        });

        return _workouts
    },
    join: (workoutID, userID) => {
        if (!ret.userJoinedToWorkout(workoutID, userID)) {
            global.data.participants.push({
                id: global.data.participants.length + 1,
                workout_id: workoutID,
                user_id: userID
            })
        }
    },
    userJoinedToWorkout: (workoutID, userID) => {
        let _ret = false

        global.data.participants.forEach(user => {
            if (user.user_id === userID) {
                _ret = true
            }
        });

        return _ret
    }
}

module.exports = ret