const Database = require('better-sqlite3');
const db = new Database('database.db', {verbose: console.log});

exports.listar = function(req, res) {
    const pacientes = db.prepare('SELECT * FROM paciente').all();


    res.json(pacientes)
};

exports.cadastrar = function(req, res) {
    const { nome, sexo, idade, resultado } = req.body

    console.log(nome)
    console.log(sexo)
    console.log(idade)
    console.log(resultado)

    const currentdate = new Date(); 

    const data = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1) + "/"
                + currentdate.getFullYear()

    const paciente = db.prepare('INSERT INTO paciente (data, nome, idade, sexo, resultado) VALUES (?, ?, ?, ?, ?)');
    const execute = paciente.run(data, nome, idade, sexo, resultado);

    console.log(execute.changes);

    res.json({"status": "OK"})
}