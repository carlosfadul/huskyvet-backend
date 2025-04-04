const express = require('express');
const router = express.Router();
const tratamientoController = require('../controllers/tratamiento.controller');

router.post('/', tratamientoController.createTratamiento);
router.get('/', tratamientoController.getAllTratamientos);
router.get('/:id', tratamientoController.getTratamientoById);
router.put('/:id', tratamientoController.updateTratamiento);
router.delete('/:id', tratamientoController.deleteTratamiento);

module.exports = router;
