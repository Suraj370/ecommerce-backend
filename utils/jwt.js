const jwt = require('jsonwebtoken')
const {StatusCodes} = require('http-status-codes')


const createJWT = ({payload})=>{
  const token = jwt.sign({payload}, process.env.JWT_SECRET,{
    expiresIn: '30m'
  })
  return token
}

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.status(StatusCodes.UNAUTHORIZED).json({success: false, message: 'UNAUTHORIZED'})

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
   

    if (err) {
      return res.status(StatusCodes.FORBIDDEN).json({success: false, message: 'Token is invalid'})
  }

    req.user = user.payload


    next()
  })
};

  module.exports = {
    createJWT,
    verifyToken
  }