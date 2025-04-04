// src/routes/servicioAliado.routes.js
const express = require('express');
const router = express.Router();
const servicioAliadoController = require('../controllers/servicioAliado.controller');

router.post('/', servicioAliadoController.createServicioAliado);
router.get('/', servicioAliadoController.getServiciosAliado);
router.get('/:id', servicioAliadoController.getServicioAliadoById);
router.put('/:id', servicioAliadoController.updateServicioAliado);
router.delete('/:id', servicioAliadoController.deleteServicioAliado);

module.exports = router;
