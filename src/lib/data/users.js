
const hToken = require('../utils/token')

const ret = {
    isUserExists: (userID) => {
        let _ret = false

        global.data.users.forEach(user => {
            if (user.id === parseInt(userID)) {
                _ret = true
            }
        })

        return _ret
    },
    login: (email, password) => {
        let _userID = 0

        global.data.users.forEach(user => {
            if (user.email === email && user.password === password) {
                _userID = user.id
            }
        })

        if (_userID > 0) {
            return global.response.success({
                token: hToken.GenerateToken(_userID)
            })
        } else {
            return global.response.error("Invalid login information")
        }
    }
}

module.exports = ret