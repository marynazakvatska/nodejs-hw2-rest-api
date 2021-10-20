const signup = require("./signup");
const verify = require("./verify")
const login = require("./login")
const logout = require("./logout")
const current = require('./current')
const updateAvatar = require("./updateAvatar")
const resendEmail = require("./resendEmail")


module.exports = {
    signup,
    verify,
    login,
    logout,
    current,
    updateAvatar,
    resendEmail
  
    
}