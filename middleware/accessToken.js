const jwt = require("jsonwebtoken");
const {verifyToken} = require('../utils')


const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {

    if (req.user.id === req.params.id ) {
        next();
    } else {

      res.status(403).json("You are not alowed to do that!");
    }
  });
};



module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  
};