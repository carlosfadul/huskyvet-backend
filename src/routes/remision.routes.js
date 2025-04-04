const express = require('express');
const router = express.Router();
const remisionController = require('../controllers/remision.controller');

router.get('/', remisionController.getAllRemisiones);
router.get('/:id', remisionController.getRemisionById);
router.post('/', remisionController.createRemision);
router.put('/:id', remisionController.updateRemision);
router.delete('/:id', remisionController.deleteRemision);

module.exports = router;
