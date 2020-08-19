const express = require('express')
const controller = require('../controller/user')
const guard = require('../guard/auth')

const router = express.Router()

router.get('/users/:id', guard.verifyJWT, controller.findByPk)
router.get('/users', guard.verifyJWT, controller.findAll)
router.post('/users', controller.create)
router.put('/users/:id', guard.verifyJWT, controller.update)
router.delete('/users/:id', guard.verifyJWT, controller.delete)

module.exports = router
