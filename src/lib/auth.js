var hToken = require('./utils/token');
const hUser = require('./data/users')

const ret = {
    userLogin: function Logged(req, res, next) {
        if (req.headers['auth_token']) {
            _userID = hToken.ParseToken(req.headers["auth_token"])

            if (_userID != "") {
                if (hUser.isUserExists(_userID)) {
                    res.locals.userID = parseInt(_userID)

                    next()
                } else {
                    res.send(global.response.error("Not authorized"))
                }
            } else {
                res.send(global.response.error("Not authorized"))
            }

        } else {
            res.send(global.response.error("Not authorized"))
        }
    }
}

module.exports = ret;