const Database = require('better-sqlite3');
const db = new Database('database.db', {verbose: console.log});

exports.listar = function(req, res) {
    const pacientes = db.prepare('SELECT * FROM paciente').all();


    res.json(pacientes)
};

exports.cadastrar = function(req, res) {
    const { nome, sexo, idade, resultado } = req.body
    const currentdate = new Date(); 

    const data = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1) + "/"
                + currentdate.getFullYear()

    const paciente = db.prepare('INSERT INTO paciente (data, nome, idade, sexo, resultado) VALUES (?, ?, ?, ?, ?)');
    const execute = paciente.run(data, nome, idade, sexo, resultado);

    console.log(execute.lastInsertRowid);

    res.json({"atendimento": execute.lastInsertRowid});
};

exports.sugestao = function(req, res) {
    const { medico, sugestao } = req.body;

    const sugestaoDB = db.prepare('INSERT INTO sugestao (medico, sugestao) VALUES (?, ?)');
    const execute = sugestaoDB.run(medico, sugestao);

    res.json({"msg": "Sugestão enviada com sucesso"});

};

exports.listarSugestoes  = function(req, res){
    const sugestoes = db.prepare('SELECT * FROM sugestao').all();

    res.json(sugestoes);
}

exports.removerSugestao = function(req, res){
    const { id } = req.body;
    
    const sugestao = db.prepare('DELETE FROM sugestao WHERE id=?');
    const execute = sugestao.run(id);

    res.json({"status": execute.status});
}

exports.remover = function(req, res) {
    const { id } = req.body;

    const paciente = db.prepare('DELETE FROM paciente WHERE id=?');
    const execute = paciente.run(id);

    res.json({"status": execute.status});
}
