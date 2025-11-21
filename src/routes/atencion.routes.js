const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const atencionController = require('../controllers/atencion.controller');

// Crear atención (con archivo adjunto opcional)
// El campo de archivo que espera el backend es "archivo"
router.post(
  '/',
  upload.single('archivo'),
  atencionController.createAtencion
);

// Obtener TODAS las atenciones
router.get('/', atencionController.getAtenciones);

// Obtener atenciones por mascota
router.get('/mascota/:mascotaId', atencionController.getAtencionesByMascota);

// Obtener una atención por ID
router.get('/:id', atencionController.getAtencionById);

// Actualizar atención (con archivo adjunto opcional)
router.put(
  '/:id',
  upload.single('archivo'),
  atencionController.updateAtencion
);

// Eliminar atención
router.delete('/:id', atencionController.deleteAtencion);

module.exports = router;
