const hUser = require('../../../lib/data/users')

module.exports = async function (req, res) {
    res.send(hUser.login(req.body.email, req.body.password))
};