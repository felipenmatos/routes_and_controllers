const listaDeInstrutores = require("../dados/instrutores");

const areasDeAtuacaoValida = [
  "Lógica",
  "Back-end",
  "FullStack",
  "Front-end",
  "Flutter",
  "UI/UX",
];

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
  if (!req.body.nome) {
    res.status(400);
    res.json({ erro: "O campo 'nome' é obrigatório" });
    return;
  }

  if (!req.body.idade) {
    res.status(400);
    res.json({ erro: "O campo 'idade' é obrigatório" });
    return;
  }

  if (!req.body.areaDeAtuacao) {
    res.status(400);
    res.json({ erro: "O campo 'areaDeAtuacao' é obrigatório" });
    return;
  }

  if (typeof req.body.nome !== "string") {
    res.status(400);
    res.json({ erro: "O campo nome deve ser preenchido como um texto" });
    return;
  }

  if (typeof req.body.idade !== "number") {
    res.status(400);
    res.json({ erro: "O campo idade deve ser preenchido como um número" });
    return;
  }

  if (typeof req.body.areaDeAtuacao !== "string") {
    res.status(400);
    res.json({
      erro: "O campo areaDeAtuacao deve ser preenchido como um texto",
    });
    return;
  }

  if (typeof req.body.areaDeAtuacao !== "string") {
    res.status(400);
    res.json({
      erro: "O campo areaDeAtuacao deve ser preenchido como um texto",
    });
    return;
  }

  if (req.body.idade < 18) {
    res.status(400);
    res.json({
      erro: "O instrutor deve ser maior de idade.",
    });
    return;
  }

  if (!areasDeAtuacaoValida.includes(req.body.areaDeAtuacao)) {
    res.status(400);
    res.json({
      erro: "Área de atuação formada é invalida.",
    });
    return;
  }

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
