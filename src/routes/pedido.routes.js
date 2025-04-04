const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedido.controller');

// Rutas CRUD básicas
router.get('/', pedidoController.getPedidos); // Obtener todos los pedidos
router.get('/:id', pedidoController.getPedidoById); // Obtener pedido por ID
router.post('/', pedidoController.createPedido); // Crear nuevo pedido
router.put('/:id', pedidoController.updatePedido); // Actualizar pedido
router.delete('/:id', pedidoController.deletePedido); // Eliminar pedido

// Ruta adicional: Obtener pedidos por proveedor_id
router.get('/proveedor/:proveedor_id', pedidoController.getPedidosByProveedorId);

module.exports = router;
