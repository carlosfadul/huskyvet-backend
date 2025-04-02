const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const sucursalController = require('../controllers/sucursalController');

// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.post('/', upload.single('sucursal_logo'), sucursalController.createSucursal);
router.get('/', sucursalController.getSucursales);
router.get('/:id', sucursalController.getSucursalById);
module.exports = router;
