const createTokenUser = (user)=> {
    return {id: user._id, name: user.username}
}


module.exports = {
    createTokenUser
}