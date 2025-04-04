const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

const atencionController = require('../controllers/atencion.controller');

router.post('/', upload.single('atencion_archivoAdjunto'), atencionController.createAtencion);
router.get('/', atencionController.getAtenciones);
router.get('/:id', atencionController.getAtencionById);
router.put('/:id', upload.single('atencion_archivoAdjunto'), atencionController.updateAtencion);
router.delete('/:id', atencionController.deleteAtencion);

module.exports = router;
