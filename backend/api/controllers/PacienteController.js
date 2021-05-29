const Database = require('better-sqlite3');
const db = new Database('database.db', {verbose: console.log});

exports.listar = function(req, res) {
    const pacientes = db.prepare('SELECT * FROM paciente').get();


    res.json(pacientes)
};