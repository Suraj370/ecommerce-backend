const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const { catchAsync } = require('../utils')

const profile = catchAsync( async(req, res, next) =>{
    const userId = req.params.id
    const user = await User.findById(userId)
    
    res.status(StatusCodes.OK).json({
        success:true,
        message: `Hello, ${user.username}`
    })
})



const getAllUser =catchAsync(async(req, res, next) =>{
    const user = await User.find({})
 
    
    res.status(StatusCodes.OK).json({
        success:true,
        user
    })
})


  const deleteUser = catchAsync (async(req, res, next) => {
    const id = req.params.id
    await User.findByIdAndDelete(id)
    res.cookie('refresh_token', 'deleted user', {
        httpOnly: true,
        expires: new Date(Date.now() + 1000),
      });
    res.status(StatusCodes.ACCEPTED).json({
        success: true,
        message: 'User deleted'
    })

  })



module.exports = {
    profile,
    getAllUser,
    deleteUser,
}