const express = require('express');
const controller = require('../controller/user');

const router = express.Router();

router.get('/users/:id', controller.findByPk);
router.get('/users', controller.findAll);
router.post('/users', controller.create);
router.put('/users/:id', controller.update);
router.delete('/users/:id', controller.delete);

module.exports = router;
