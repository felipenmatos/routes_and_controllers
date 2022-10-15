const listaDeInstrutores = require("../dados/instrutores");

function consultarTodosOsInstrutores(req, res) {
  res.json(listaDeInstrutores);
}

function consultarUmInstrutor(req, res) {
  const instrutor = listaDeInstrutores.find(
    (instrutor) => instrutor.id === Number(req.params.idFilter)
  );

  if (!instrutor) {
    res.status(404);
    res.json({ erro: "instrutor(a) " + req.params.idFilter + " não existe" });
    return;
  }

  res.json(instrutor);
}

let proximoId = 4;

function criarUmInstrutor(req, res) {
  console.log(req.body);

  const novoInstrutor = {
    id: proximoId,
    nome: req.body.nome,
    idade: req.body.idade,
    areaDeAtuacao: req.body.areaDeAtuacao,
  };

  //adicionando o recurso através do método push que adiciona um item no final da lista

  listaDeInstrutores.push(novoInstrutor);

  proximoId += 1;

  res.json(novoInstrutor);
}

function editarInstrutor(req, res) {
  const instrutor = listaDeInstrutores.find(
    (instrutor) => instrutor.id === Number(req.params.idFilter)
  );

  if (req.body.nome !== undefined) {
    instrutor.nome = req.body.nome;
  }

  if (req.body.idade !== undefined) {
    instrutor.idade = req.body.idade;
  }

  if (req.body.areaDeAtuacao !== undefined) {
    instrutor.areaDeAtuacao = req.body.areaDeAtuacao;
  }

  res.json(instrutor);
}

function substituirInstrutor(req, res) {
  const instrutor = listaDeInstrutores.find(
    (instrutor) => instrutor.id === Number(req.params.idFilter)
  );

  if (instrutor) {
    //substituir
    instrutor.nome = req.body.nome;
    instrutor.idade = req.body.idade;
    instrutor.areaDeAtuacao = req.body.areaDeAtuacao;
    res.json(instrutor);
  } else {
    //inserir caso não aja.
    const novoInstrutor = req.body;
    listaDeInstrutores.push(novoInstrutor);
    res.json(novoInstrutor);
  }
}

function deletarInstrutor(req, res) {
  const instrutor = listaDeInstrutores.find(
    (instrutor) => instrutor.id === Number(req.params.idFilter)
  );

  //posicao que esta dentro da lista

  const indice = listaDeInstrutores.indexOf(instrutor);

  //remocao da lista

  listaDeInstrutores.splice(indice);

  //no express deve sempre resposponder uma requisicao
  res.json(instrutor);
}

module.exports = {
  consultarTodosOsInstrutores,
  consultarUmInstrutor,
  criarUmInstrutor,
  editarInstrutor,
  substituirInstrutor,
  deletarInstrutor,
};
