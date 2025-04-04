const express = require('express');
const router = express.Router();
const multer = require('multer');
const usuarioController = require('../controllers/usuario.controller');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', usuarioController.getUsuarios);
router.get('/:id', usuarioController.getUsuarioById);
router.post('/', upload.single('usuario_foto'), usuarioController.createUsuario);
router.put('/:id', upload.single('usuario_foto'), usuarioController.updateUsuario);
router.delete('/:id', usuarioController.deleteUsuario);

module.exports = router;
