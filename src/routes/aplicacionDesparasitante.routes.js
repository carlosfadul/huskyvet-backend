// src/routes/aplicacionDesparasitante.routes.js
const express = require('express');
const router = express.Router();
const aplicacionController = require('../controllers/aplicacionDesparasitante.controller');

router.post('/', aplicacionController.createAplicacion);
router.get('/', aplicacionController.getAplicaciones);
router.get('/:id', aplicacionController.getAplicacionById);
router.put('/:id', aplicacionController.updateAplicacion);
router.delete('/:id', aplicacionController.deleteAplicacion);

module.exports = router;
