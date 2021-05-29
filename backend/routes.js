var express = require('express')
var pacienteController = require('./api/controllers/PacienteController');

const router = express.Router();

router.get("/pacientes", pacienteController.listar)

module.exports = router;