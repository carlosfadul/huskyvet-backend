const express = require('express');
const router = express.Router();
const sucursalController = require('../controllers/sucursal.controller');

router.get('/', sucursalController.getSucursales);
router.get('/:id', sucursalController.getSucursalById);
router.post('/', sucursalController.createSucursal);
router.put('/:id', sucursalController.updateSucursal);
router.delete('/:id', sucursalController.deleteSucursal);

module.exports = router;
