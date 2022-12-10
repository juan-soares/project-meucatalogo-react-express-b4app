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
    .populate("modalidade")
    .populate("franquia", "nome")
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
  /*   try {
    await novajogoDeMesa.save();
    res.json("Salvo com Sucesso!");
  } catch (error) {
    res.json("Não foi possivel salvar: " + error);
  } */
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
