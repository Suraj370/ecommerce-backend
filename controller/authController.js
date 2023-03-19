const User = require('../models/User')
const customError = require('../errors')
const {StatusCodes} = require('http-status-codes')
const {createTokenUser, attachCookieToResponse, createJWT, catchAsync} = require('../utils')

const signup = catchAsync(async(req, res, next) =>{
    const {username, email, password} = req.body
    if(!username || !email || !password)
       return next(new customError.BadRequestError('Please provide all fields'))

       try {
        let user = await User.create({ username, email, password });
        res.status(StatusCodes.CREATED).json({
          success: true,
          user,
        });
      } catch (err) {
        if (err.code === 11000 && err.keyPattern.username) {
          return next(new customError.CustomAPIError('Username already exists', StatusCodes.CONFLICT));
        }
        if (err.code === 11000 && err.keyPattern.email) {
          return next(new customError.CustomAPIError('Email already exists', StatusCodes.CONFLICT));
        }
        return next(err);
      }
})

const signin = catchAsync(
  async(req, res, next) => {
    const {username, password} = req.body
    if(!username || !password)
      return next(new customError.BadRequestError('Please provide all fields'))
    let user = await User.findOne({username})
    if(!user)return next(new customError.CustomAPIError('Incorrect username or password', StatusCodes.UNAUTHORIZED))
    if(!(await user.checkPassword(password))){
      return next(new customError.CustomAPIError('Incorrect username or password', StatusCodes.UNAUTHORIZED))
    }
    const tokenUser = createTokenUser(user)
    const token = createJWT({payload: tokenUser})

    attachCookieToResponse( res, tokenUser)

    res.status(StatusCodes.OK).json({
        success: true,
        user,
        token,
        
    })
}
) 



module.exports = {signup, signin}