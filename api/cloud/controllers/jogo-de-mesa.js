const JogoDeMesa = require("../models/jogo-de-mesa");

async function getJogosDeMesa(req, res) {
  const JogosDeMesaCollection = await JogoDeMesa.find({})
    .populate("categoria", "nome")
    .populate("subcategoria", "nome")
    .populate("idioma", "nome")
    .populate("edicao", "nome")
    .populate("base")
    .populate("expansoes")
    .populate("genero")
    .populate("movimentacao")
    .populate("modalidades")
    .populate("franquias", "nome")
    .populate({
      path: "tematicas",
      populate: { path: "elementos", select: "nome" },
    });

  res.json(JogosDeMesaCollection);
}

async function getJogoDeMesa(req, res) {
  const jogoDeMesaDoc = await JogoDeMesa.findById({ _id: req.body.id });

  if (jogoDeMesaDoc === null) {
    res.json("Não encontrado!");
  } else {
    res.json(jogoDeMesaDoc);
  }
}

async function postJogoDeMesa(req, res) {
  console.log(req.body);
  const novoJogo = new JogoDeMesa({
    nomeUsa: req.body.nomeUsa,
    nomeBra: req.body.nomeBra,
    lancamento: req.body.lancamento,
    sinopse: req.body.sinopse,
    players: req.body.players,
    modalidades: req.body.modalidades,
    categoria: req.body.categoria,
    subcategoria: req.body.subcategoria,
    idioma: req.body.idioma,
    edicao: req.body.edicao,
    expansoes: req.body.expansoes,
    genero: req.body.genero,
    movimentacao: req.body.movimentacao,
    tematicas: req.body.tematicas,
    adquirido: req.body.adquirido,
    finalizado: req.body.finalizado,
    franquias: req.body.franquias,
  });

  if (req.body.base === "") {
    baseId = novoJogo._id;
    novoJogo.base = baseId;
  }
  if (req.body.imagens.length > 0) {
    req.body.imagens.map((imagem, index) =>
      novoJogo.imagens.push({
        nome: imagem.replace(".jpeg", ""),
        path:
          process.env.API_URL +
          "/assets/jogos-de-mesa/" +
          novoJogo.nomeUsa
            .replaceAll(": ", "-")
            .replaceAll(" - ", "-")
            .replaceAll(" ", "-") +
          "/imagens/" +
          index +
          ".jpeg",
      })
    );
  } else {
    novoJogo.imagens.push({
      nome: "Sem imagem",
      path: process.env.API_URL + "/assets/shared/imagens/sem-imagem.jpeg",
    });
  }
  novoJogo.trailer =
    process.env.API_URL +
    "/assets/jogos-de-mesa/" +
    novoJogo.nomeUsa
      .replaceAll(": ", "-")
      .replaceAll(" - ", "-")
      .replaceAll(" ", "-") +
    "/trailer/00.mp4";
  if (req.body.anexos.length > 0) {
    req.body.anexos.map((anexo) =>
      novoJogo.anexos.push({
        nome: anexo.replace(".pdf", ""),
        path:
          process.env.API_URL +
          "/assets/jogos-de-mesa/" +
          novoJogo.nomeUsa
            .toLowerCase()
            .replaceAll(": ", "-")
            .replaceAll(" - ", "-")
            .replaceAll(" ", "-") +
          "/anexos/" +
          anexo.replaceAll(" - ", "_").replaceAll(" ", "_"),
      })
    );
  }

  console.log(novoJogo);
  try {
    await novoJogo.save();
    res.json("Salvo com Sucesso!");
  } catch (error) {
    res.json("Não foi possivel salvar: " + error);
  }
}

async function deleteJogoDeMesa(req, res) {
  try {
    await JogoDeMesa.findByIdAndDelete(req.body.id);
    res.json("Deletado com Sucesso!");
  } catch (error) {
    res.json(error);
  }
}

module.exports = {
  getJogosDeMesa,
  getJogoDeMesa,
  postJogoDeMesa,
  deleteJogoDeMesa,
};
