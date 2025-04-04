const express = require('express');
const router = express.Router();
const multer = require('multer');
const empleadoController = require('../controllers/empleado.controller');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', upload.single('empleado_foto'), empleadoController.createEmpleado);
router.get('/', empleadoController.getEmpleados);
router.get('/:id', empleadoController.getEmpleadoById);
router.put('/:id', upload.single('empleado_foto'), empleadoController.updateEmpleado);
router.delete('/:id', empleadoController.deleteEmpleado);

module.exports = router;
