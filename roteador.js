const express = require("express");

const instrutores = require("./controladores/instrutores");

const roteador = express();

roteador.get("/instrutores", instrutores.consultarTodosOsInstrutores);
roteador.get("/instrutores/:idFilter", instrutores.consultarUmInstrutor);
roteador.post("/instrutores", instrutores.consultarUmInstrutor);
roteador.patch("/instrutores/:idFilter", instrutores.editarInstrutor);
roteador.put("/instrutores/:idFilter", instrutores.substituirInstrutor);
roteador.delete("/instrutores/:idFilter", instrutores.deletarInstrutor);

module.exports = roteador;
