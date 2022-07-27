var express = require('express')
var pacienteController = require('./api/controllers/PacienteController');

const router = express.Router();

router.get("/pacientes", pacienteController.listar);
router.post("/pacientes", pacienteController.cadastrar);
router.delete("/pacientes", pacienteController.remover);

router.delete("/sugestao", pacienteController.removerSugestao);
router.post("/sugestao", pacienteController.sugestao);
router.get("/sugestoes", pacienteController.listarSugestoes);


module.exports = router;
