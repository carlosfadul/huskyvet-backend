const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const veterinariaController = require('../controllers/veterinaria.controller');

//router.post('/veterinarias', upload.single('veterinaria_logo'), veterinariaController.createVeterinaria);
router.get('/', veterinariaController.getVeterinarias);
router.get('/:id', veterinariaController.getVeterinariaById);
router.delete('/:id', veterinariaController.deleteVeterinaria);
router.put('/:id', upload.single('veterinaria_logo'), veterinariaController.updateVeterinaria);
router.post('/', upload.single('veterinaria_logo'), veterinariaController.createVeterinaria);


module.exports = router;

