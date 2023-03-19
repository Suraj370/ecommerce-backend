const jwt = require('jsonwebtoken')

const createJWT = ({payload})=>{
  const token = jwt.sign({payload}, process.env.JWT_SECRET,{
    expiresIn: '30m'
  })
  return token
}

const verifyToken = (req, res, next) => {
  const { headers: { authorization } } = req;
  
  if (!authorization) {
    return res.status(401).json('You are not authenticated!');
  }
  
  const token = authorization.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, { payload }) => {
    if (err) {
      return res.status(403).json('Token is not valid!');
    }

    req.user = payload;
    next();
  });
};

  module.exports = {
    createJWT,
    verifyToken
  }