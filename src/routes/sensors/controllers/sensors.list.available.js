const hSensor = require('../../../lib/data/sensors')

module.exports = async function (req, res) {
    res.send(global.response.success(hSensor.getAvailableSensors(res.locals.userID)))
};