const fs = require("fs");

function salvarInstrutor() {
  const json = JSON.stringify(listaDeInstrutores, null, 2);
  fs.writeFileSync("dados.json", json);
}

let listaDeInstrutores;

try {
  listaDeInstrutores = JSON.parse(fs.readFileSync("dados.json").toString());
} catch {
  listaDeInstrutores = [
    {
      id: 1,
      nome: "Felipe",
      idade: 28,
      areaDeAtuacao: "FullStack",
    },
    {
      id: 2,
      nome: "Natália",
      idade: 29,
      areaDeAtuacao: "Ux/Ui Design",
    },
    {
      id: 3,
      nome: "Gabriel",
      idade: 19,
      areaDeAtuacao: "FrontEnd",
    },
  ];
}

module.exports = { listaDeInstrutores, salvarInstrutor };
