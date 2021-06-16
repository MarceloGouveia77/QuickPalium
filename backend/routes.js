var express = require('express')
var pacienteController = require('./api/controllers/PacienteController');

const router = express.Router();

router.get("/pacientes", pacienteController.listar);
router.post("/pacientes", pacienteController.cadastrar);
router.delete("/pacientes", pacienteController.remover);

module.exports = router;