const express = require('express');
const router = express.Router();
const nominaController = require('../controllers/nomina.controller');

// Crear nueva nómina
router.post('/', nominaController.createNomina);

// Obtener todas las nóminas
router.get('/', nominaController.getAllNominas);

// Obtener nómina por ID
router.get('/:id', nominaController.getNominaById);

// Actualizar nómina por ID
router.put('/:id', nominaController.updateNomina);

// Eliminar nómina por ID
router.delete('/:id', nominaController.deleteNomina);

module.exports = router;
