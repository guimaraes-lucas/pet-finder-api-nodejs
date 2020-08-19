const express = require('express')
const controller = require('../controller/auth')
const guard = require('../guard/auth')

const router = express.Router()

router.post('/sign-in', controller.signIn)
router.post('/sign-out', guard.verifyJWT, controller.signOut)

module.exports = router