const express = require('express')
const controller = require('../controller/pet')
const guard = require('../guard/auth')

const router = express.Router()

router.get('/pets/:id', guard.verifyJWT, controller.findByPk)
router.get('/pets', guard.verifyJWT, controller.findAll)
router.post('/pets', guard.verifyJWT, controller.create)
router.put('/pets/:id', guard.verifyJWT, controller.update)
router.delete('/pets/:id', guard.verifyJWT, controller.delete)

module.exports = router
