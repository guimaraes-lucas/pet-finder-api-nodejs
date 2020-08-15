const express = require('express');
const controller = require('../controller/kind');

const router = express.Router();

router.get('/kinds/:id', controller.findByPk);
router.get('/kinds', controller.findAll);
router.post('/kinds', controller.create);
router.put('/kinds/:id', controller.update);
router.delete('/kinds/:id', controller.delete);

module.exports = router;
