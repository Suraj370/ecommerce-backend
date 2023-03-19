const {signup, signin} = require('./authController')
const {profile, getAllUsers} = require('./userController')

module.exports = {
    signup,
    signin,
    profile,

}