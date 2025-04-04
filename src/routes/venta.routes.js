const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/venta.controller');

// Rutas del CRUD de venta
router.post('/', ventaController.createVenta);
router.get('/', ventaController.getVentas);
router.get('/:id', ventaController.getVentaById);
router.put('/:id', ventaController.updateVenta);
router.delete('/:id', ventaController.deleteVenta);

module.exports = router;
