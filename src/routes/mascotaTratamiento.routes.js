const express = require('express');
const router = express.Router();
const controller = require('../controllers/mascotaTratamiento.controller');

router.post('/', controller.createMascotaTratamiento);
router.get('/', controller.getMascotaTratamientos);
router.get('/:id', controller.getMascotaTratamientoById);
router.put('/:id', controller.updateMascotaTratamiento);
router.delete('/:id', controller.deleteMascotaTratamiento);

module.exports = router;
