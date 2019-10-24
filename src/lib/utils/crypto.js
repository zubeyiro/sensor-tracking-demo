const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.SECRET_KEY);

const ret = {
    Encrypt: (str) => { return cryptr.encrypt(str) },
    Decrypt: (hash) => {
        try {
            return cryptr.decrypt(hash)
        } catch{
            return ""
        }
    }
}

module.exports = ret