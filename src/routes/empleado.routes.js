// src/routes/empleado.routes.js

const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleado.controller');
const multer = require('multer');

// Usamos almacenamiento en memoria para recibir fotos
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Rutas básicas del CRUD
router.get('/sucursal/:sucursalId', empleadoController.getEmpleadosPorSucursal);
router.get('/:id', empleadoController.getEmpleadoById);
router.post('/', upload.single('empleado_foto'), empleadoController.createEmpleado);
router.put('/:id', upload.single('empleado_foto'), empleadoController.updateEmpleado);
router.delete('/:id', empleadoController.deleteEmpleado);

module.exports = router;
