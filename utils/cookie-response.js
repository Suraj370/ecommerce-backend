const jwt = require('jsonwebtoken')
const {createJWT} = require('./jwt')
const User = require('../models/User')
const { createTokenUser } = require('./createTokenUser')

const createRefreshToken = ({payload})=>{
  const refreshToken = jwt.sign({payload}, process.env.REFRESH_SECRET, {
    expiresIn: '30d'
  })
  return refreshToken 
}
const attachCookieToResponse = (res, user) => {
    const refreshtoken = createRefreshToken({payload: user})
    const oneMonth = 1000 * 60 * 60 * 24 * 30;
    // console.log(refreshtoken);
    res.cookie('token', refreshtoken, {
      httpOnly: true,
      expires: new Date(Date.now() + oneMonth),
      signed: true,
    });
  }


const verifyRefreshToken = async(req, res, next) => {
  try {
    const { signedCookies: { token } } = req;

    if (!token) {
      return res.status(401).json('You are not authenticated!');
    }
    
    const { id } = jwt.verify(token, process.env.REFRESH_SECRET).payload;
    const user = await User.findById(id);
    const tokenUser = createTokenUser(user);
    const newToken = createJWT({ payload: tokenUser });
    
    res.clearCookie('token', { httpOnly: true, signed: true });
    attachCookieToResponse(res, tokenUser);
    
    return res.status(200).json({ token: newToken });
  } catch (err) {
    return res.status(403).json('Token is not valid!');
  }
}


  
  module.exports = {
    createRefreshToken,
    attachCookieToResponse,
    verifyRefreshToken
  }