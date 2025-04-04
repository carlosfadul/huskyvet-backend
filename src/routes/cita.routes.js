const express = require('express');
const router = express.Router();
const citaController = require('../controllers/cita.controller');

// Crear cita
router.post('/', citaController.createCita);

// Obtener todas las citas
router.get('/', citaController.getCitas);

// Obtener una cita por ID
router.get('/:id', citaController.getCitaById);

// Actualizar una cita
router.put('/:id', citaController.updateCita);

// Eliminar una cita
router.delete('/:id', citaController.deleteCita);

module.exports = router;
