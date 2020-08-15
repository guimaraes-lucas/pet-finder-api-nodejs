const express = require('express');
const controller = require('../controller/pet');

const router = express.Router();

router.get('/pets/:id', controller.findByPk);
router.get('/pets', controller.findAll);
router.post('/pets', controller.create);
router.put('/pets/:id', controller.update);
router.delete('/pets/:id', controller.delete);

module.exports = router;
