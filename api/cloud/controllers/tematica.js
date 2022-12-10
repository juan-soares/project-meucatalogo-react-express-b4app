const Tematica = require("../models/tematica");

async function getTematicas(req, res) {
  const tematicasCollection = await Tematica.find({});

  res.json(tematicasCollection);
}

async function getTematica(req, res) {
  const tematicaDoc = await Tematica.findById({ _id: req.body.id });

  if (tematicaDoc === null) {
    res.json("Não encontrado!");
  } else {
    res.json(tematicaDoc);
  }
}

async function postTematica(req, res) {
  if (!req.body.elemento) {
    const novaTematica = new Tematica({ nome: req.body.nome });
    try {
      await novaTematica.save();
      res.json("Salvo com Sucesso!");
    } catch (error) {
      res.json("Não foi possível salvar. Erro: " + error);
    }
  } else {
    try {
      const tematicaDoc = await Tematica.findById(req.body.elemento.tematicaId);
      tematicaDoc.elementos.push({ nome: req.body.elemento.nome });
      await tematicaDoc.save();

      res.json("Salvo com Sucesso!");
    } catch (error) {
      res.json("Não foi possível salvar. Erro: " + error);
    }
  }
}

async function deleteTematica(req, res) {
  if (req.body.elementoId !== "") {
    try {
      const tematicaDoc = await Tematica.findById(req.body.tematicaId);

      tematicaDoc.elementos.id(req.body.elementoId).remove();

      await tematicaDoc.save();
      res.json("Deletado com Sucesso!");
    } catch (error) {
      res.json(error);
    }
  }
}

module.exports = {
  getTematicas,
  getTematica,
  postTematica,
  deleteTematica,
};
