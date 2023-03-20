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
    res.cookie('refresh_token', refreshtoken, {
      httpOnly: true,
      expires: new Date(Date.now() + oneMonth),
      signed: true,
    });
  }


 
  const issuedTokens = [];

  const verifyRefreshToken = async(req, res, next) => {
    try {
      const { signedCookies: { refresh_token } } = req;
  
      if (!refresh_token) {
        return res.status(401).json('You are not authenticated!');
      }
  
      if (issuedTokens.includes(refresh_token)) {
        // Token has already been used
        return res.status(401).json('Refresh token has already been used!');
      }
  
      const { id } = jwt.verify(refresh_token, process.env.REFRESH_SECRET).payload;
      res.cookie('refresh_token', refresh_token, {httpOnly: true, expires: new Date(Date.now()), signed: true,});
  
      // Add refresh token to issued tokens
      issuedTokens.push(refresh_token);
  
      const user = await User.findById(id);
      const tokenUser = createTokenUser(user);
      const newToken = createJWT({ payload: tokenUser });
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