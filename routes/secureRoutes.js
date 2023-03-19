const express = require('express')
const router = express.Router()
const {profile} = require('../controller')
const {verifyTokenAndAuthorization} = require("../middleware/accessToken");
const {verifyRefreshToken} = require('../utils')
  
router.get("/:id/profile", verifyTokenAndAuthorization, profile)

router.get('/refresh', verifyRefreshToken)
module.exports = router