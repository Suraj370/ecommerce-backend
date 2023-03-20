const express = require('express')
const router = express.Router()
const {profile, getAllUser, deleteUser} = require('../controller')
const {verifyTokenAndAuthorization} = require("../middleware/accessToken");
const {verifyRefreshToken, verifyToken} = require('../utils')
  
router.get("/:id/profile", verifyTokenAndAuthorization, profile)

router.delete("/:id/delete", verifyTokenAndAuthorization, deleteUser)

router.get('/refresh', verifyRefreshToken)


router.get("/allusers", verifyToken, getAllUser)

router
module.exports = router