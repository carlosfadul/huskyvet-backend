const express = require('express');
const router = express.Router();
const aliadoController = require('../controllers/aliado.controller');

router.post('/', aliadoController.createAliado);
router.get('/', aliadoController.getAliados);
router.get('/:id', aliadoController.getAliadoById);
router.put('/:id', aliadoController.updateAliado);
router.delete('/:id', aliadoController.deleteAliado);

module.exports = router;
