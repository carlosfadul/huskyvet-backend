const express = require('express');
const router = express.Router();
const aplicacionVacunaController = require('../controllers/aplicacionVacuna.controller');

router.get('/', aplicacionVacunaController.getAplicacionesVacuna);
router.get('/:id', aplicacionVacunaController.getAplicacionVacunaById);
router.post('/', aplicacionVacunaController.createAplicacionVacuna);
router.put('/:id', aplicacionVacunaController.updateAplicacionVacuna);
router.delete('/:id', aplicacionVacunaController.deleteAplicacionVacuna);

module.exports = router;
