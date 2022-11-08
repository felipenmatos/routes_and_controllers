const { listaDeInstrutores, salvarInstrutor } = require("../dados/instrutores");

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

let numberId = listaDeInstrutores[listaDeInstrutores.length - 1].id;
let proximoId = parseInt(numberId.toString()) + 1;

function validarInstrutor(instrutor) {
  if (!instrutor.nome) {
    return "O campo 'nome' é obrigatório";
  }

  if (!instrutor.idade) {
    return "O campo 'idade' é obrigatório";
  }

  if (!instrutor.areaDeAtuacao) {
    return "O campo 'areaDeAtuacao' é obrigatório";
  }

  if (typeof instrutor.nome !== "string") {
    return "O campo nome deve ser preenchido como um texto";
  }

  if (typeof instrutor.idade !== "number") {
    return "O campo idade deve ser preenchido como um número";
  }

  if (typeof instrutor.areaDeAtuacao !== "string") {
    return "O campo areaDeAtuacao deve ser preenchido como um texto";
  }

  if (typeof instrutor.areaDeAtuacao !== "string") {
    return "O campo areaDeAtuacao deve ser preenchido como um texto";
  }

  if (instrutor.idade < 18) {
    return "O instrutor deve ser maior de idade.";
  }

  if (!areasDeAtuacaoValida.includes(instrutor.areaDeAtuacao)) {
    return "Área de atuação formada é invalida.";
  }
}

function criarUmInstrutor(req, res) {
  const erro = validarInstrutor(req.body);

  if (erro) {
    res.status(400);
    res.json({ erro });
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
  salvarInstrutor();

  proximoId += 1;

  res.json(novoInstrutor);
}

function editarInstrutor(req, res) {
  const instrutor = listaDeInstrutores.find(
    (instrutor) => instrutor.id === Number(req.params.idFilter)
  );

  if (!instrutor) {
    res.status(404);
    res.json({ erro: "instrutor(a) " + req.params.idFilter + " não existe" });
    return;
  }

  const erro = validarInstrutor({
    nome: req.body.nome ?? instrutor.nome,
    idade: req.body.idade ?? instrutor.idade,
    areaDeAtuacao: req.body.areaDeAtuacao ?? instrutor.areaDeAtuacao,
  });

  if (erro) {
    res.status(400);
    res.json({ erro });
    return;
  }

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
  salvarInstrutor();
}

function substituirInstrutor(req, res) {
  const erro = validarInstrutor(req.body);

  if (erro) {
    res.status(400);
    res.json({ erro });
    return;
  }

  if (req.body.id !== Number(req.params.idFilter)) {
    res.status(400);
    res.json({
      erro: "O campo 'id' deve ser igual na rota e no campo de requisição",
    });
    return;
  }

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
  salvarInstrutor();
}

function deletarInstrutor(req, res) {
  const instrutor = listaDeInstrutores.find(
    (instrutor) => instrutor.id === Number(req.params.idFilter)
  );

  //posicao que esta dentro da lista

  if (!instrutor) {
    res.status(404);
    res.json({ erro: "instrutor(a) " + req.params.idFilter + " não existe" });
    return;
  }

  const indice = listaDeInstrutores.indexOf(instrutor);

  //remocao da lista

  listaDeInstrutores.splice(indice);

  //no express deve sempre resposponder uma requisicao
  res.json(instrutor);
  salvarInstrutor();
}

module.exports = {
  consultarTodosOsInstrutores,
  consultarUmInstrutor,
  criarUmInstrutor,
  editarInstrutor,
  substituirInstrutor,
  deletarInstrutor,
};
