const crypto = require('./crypto')

const ret = {
    GenerateToken: (userID) => { return crypto.Encrypt(userID) }, // Normally, we would put some more information in this token for auth process, but since auth is not the main goal of the projects, just userID is enough
    ParseToken: (token) => { return crypto.Decrypt(token) }
}

module.exports = ret