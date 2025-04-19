const express = require('express');
const router = express.Router();
const servicioController = require('../controllers/servicio.controller');

router.get('/', servicioController.getServicios);
router.get('/:id', servicioController.getServicioById);
router.post('/', servicioController.createServicio);
router.put('/:id', servicioController.updateServicio);
router.delete('/:id', servicioController.deleteServicio);

module.exports = router;

