const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const mascotaController = require('../controllers/mascota.controller');

router.post('/', upload.single('mascota_foto'), mascotaController.createMascota);
router.get('/', mascotaController.getMascotas);
router.get('/:id', mascotaController.getMascotaById);
router.put('/:id', upload.single('mascota_foto'), mascotaController.updateMascota);
router.delete('/:id', mascotaController.deleteMascota);

module.exports = router;
