const express = require('express')
const controller = require('../controller/kind')
const guard = require('../guard/auth')

const router = express.Router()

router.get('/kinds/:id', guard.verifyJWT, controller.findByPk)
router.get('/kinds', guard.verifyJWT, controller.findAll)
router.post('/kinds', guard.verifyJWT, controller.create)
router.put('/kinds/:id', guard.verifyJWT, controller.update)
router.delete('/kinds/:id', guard.verifyJWT, controller.delete)

module.exports = router
