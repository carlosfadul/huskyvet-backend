const express = require('express');
const router = express.Router();
const veterinariaController = require('../controllers/veterinaria.controller');

router.get('/', veterinariaController.getVeterinarias);
router.get('/:id', veterinariaController.getVeterinariaById);
router.post('/', veterinariaController.createVeterinaria);
router.put('/:id', veterinariaController.updateVeterinaria);
router.delete('/:id', veterinariaController.deleteVeterinaria);

module.exports = router;

