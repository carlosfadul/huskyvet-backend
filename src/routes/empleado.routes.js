const express = require('express');
const router = express.Router();
const multer = require('multer');
const empleadoController = require('../controllers/empleado.controller');

// Configurar multer para subir la foto del empleado
const storage = multer.memoryStorage();
const upload = multer({ storage });

// CRUD básico
router.get('/sucursal/:sucursalId', empleadoController.getEmpleadosPorSucursal);
router.get('/:id', empleadoController.getEmpleadoById);
router.post('/', upload.single('empleado_foto'), empleadoController.createEmpleado);
router.put('/:id', upload.single('empleado_foto'), empleadoController.updateEmpleado);
router.delete('/:id', empleadoController.deleteEmpleado);

// Obtener empleados sin usuario de una sucursal
router.get('/sucursal/:sucursalId/sin-usuario', empleadoController.getEmpleadosSinUsuarioPorSucursal);

module.exports = router;
