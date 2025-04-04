const express = require('express');
const router = express.Router();
const detalleVentaController = require('../controllers/detalleVenta.controller');

// Rutas CRUD para DetalleVenta
router.get('/', detalleVentaController.getAllDetallesVenta);
router.get('/:id', detalleVentaController.getDetalleVentaById);
router.post('/', detalleVentaController.createDetalleVenta);
router.put('/:id', detalleVentaController.updateDetalleVenta);
router.delete('/:id', detalleVentaController.deleteDetalleVenta);

module.exports = router;
