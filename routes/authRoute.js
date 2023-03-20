const express = require('express')
const router = express.Router()
const {signup, signin} = require('../controller')
// const {signin} = require('../controller')


router.post('/signup', signup)
router.post('/signin', signin)
router.post('/signout')


module.exports = router