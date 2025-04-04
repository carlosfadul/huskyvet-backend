const express = require('express');
const router = express.Router();
const detalleNominaController = require('../controllers/detalleNomina.controller');

router.get('/', detalleNominaController.getAllDetallesNomina);
router.get('/:id', detalleNominaController.getDetalleNominaById);
router.post('/', detalleNominaController.createDetalleNomina);
router.put('/:id', detalleNominaController.updateDetalleNomina);
router.delete('/:id', detalleNominaController.deleteDetalleNomina);

module.exports = router;
