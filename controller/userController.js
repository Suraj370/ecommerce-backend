const User = require('../models/User')
const customError = require('../errors')
const {StatusCodes} = require('http-status-codes')
const { catchAsync } = require('../utils')

const profile = async(req, res, next) =>{
    const userId = req.params.id
    const user = await User.findById(userId)
    
    res.status(StatusCodes.OK).json({
        success:true,
        message: `Hello, ${user.username}`
    })
}


const getAllUser = catchAsync(async(req, res, next) =>{
    const users = await User.findOne({})
    res.status(StatusCodes.OK).json({
        users
    })
})



module.exports = {
    profile,
    getAllUser
}