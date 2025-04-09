const express = require('express');
const router = express.Router();
const coletorController = require('../controller/coletorController');

router.get('/cadastro', coletorController.mostrarFormulario);
module.exports = router;
