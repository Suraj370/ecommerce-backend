const {signup, signin, signout} = require('./authController')
const {profile, getAllUser, deleteUser} = require('./userController')

module.exports = {
    signup,
    signin,
    signout,
    profile,
    getAllUser,
    deleteUser

}