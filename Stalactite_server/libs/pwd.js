const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

function checkPwd (password, userRes) {
    return new Promise((resolve, reject) => {
        // 密码匹配
        userRes.comparePassword(password, (err, isMatch) => {
            if (err) {
                reject(err)
                console.log(err)
            }
            resolve(isMatch)
        })
    })
}

function hashPwd (password) {
    return new Promise((resolve, reject) => {
        // 生成 salt
        bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
            if (err) {
                reject(err)
                return console.log(err)
            }
            // 给密码加 salt
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    return console.log(err)
                }
                resolve(hash)
            })
        })
    })
}

module.exports = {
    checkPwd,
    hashPwd
}