const ret = {
    getAvailableSensors: (userID) => {
        let _sensors = []

        global.data.sensors.forEach(sensor => {
            if (sensor.is_active) {
                if (sensor.belongs_to === parseInt(userID)) {
                    _sensors.push({
                        id: sensor.id,
                        is_mine: true
                    })
                } else if (sensor.is_allocatable) {
                    _sensors.push({
                        id: sensor.id,
                        is_mine: false
                    })
                }
            }
        });

        return _sensors
    },
    getSensor: (sensorID) => {
        let _sensor;

        global.data.sensors.forEach(sensor => {
            if (sensor.id === sensorID) {
                _sensor = sensor
            }
        });

        return _sensor
    },
    isSensorBelongsToUser: (sensorID, userID) => {
        let _sensor = ret.getSensor(sensorID)

        return _sensor.belongs_to === userID
    },
    changeSensorAllocatableStatus: (sensorID, isAllocatable) => {
        ret.getSensor(sensorID).is_allocatable = isAllocatable
    }
}

module.exports = ret