const Franquia = require("../models/franquia");

async function getFranquias(req, res) {
  const franquiasCollection = await Franquia.find({
    tipo: "franquia",
  }).populate({
    path: "subfranquias",
    populate: { path: "subfranquias" },
  });

  if (franquiasCollection.length === 0) {
    res.json("Sem registros!");
  } else {
    res.json(franquiasCollection);
  }
}

async function getFranquia(req, res) {
  const franquiaDoc = await Franquia.findById({ _id: req.body.id });

  if (franquiaDoc === null) {
    res.json("Não encontrado!");
  } else {
    res.json(franquiaDoc);
  }
}

async function postFranquia(req, res) {
  const novaFranquia = new Franquia();

  if (!req.body.paiId) {
    const checkFranquiaExiste = await Franquia.find({ nome: req.body.nome });

    if (checkFranquiaExiste.length) return res.json("Registro existente!");

    novaFranquia.nome = req.body.nome;
    novaFranquia.tipo = "franquia";

    try {
      await novaFranquia.save();
      res.json("Salvo com sucesso!");
    } catch (error) {
      res.json("Não foi possivel salvar: " + error);
    }
  } else {
    const checkFranquiaExiste = await Franquia.find({ nome: req.body.nome });

    let subfranquiaId = "";

    if (!checkFranquiaExiste.length) {
      novaFranquia.nome = req.body.nome;
      novaFranquia.tipo = "subfranquia";
      const { _id } = await novaFranquia.save();
      subfranquiaId = _id;
    } else {
      subfranquiaId = checkFranquiaExiste[0]._id;
    }

    const franquiaPai = await Franquia.findById(req.body.paiId);

    if (!franquiaPai.subfranquias.includes(subfranquiaId)) {
      franquiaPai.subfranquias.push(subfranquiaId);

      try {
        await franquiaPai.save();
        res.json("Salvo com sucesso!");
      } catch (error) {
        res.json("Não foi possivel salvar: " + error);
      }
    } else {
      res.json("Registro já existente!");
    }
  }
}

async function putFranquia(req, res) {
  const franquia = await Franquia.findById(req.body.idFranquia);

  franquia.subfranquias.push({ nome: req.body.nome, subfranquias: [] });

  try {
    await franquia.save();
    res.json("Salvo com Sucesso!");
  } catch (error) {
    res.json("Não foi possivel salvar: " + error);
  }
}

async function deleteFranquia(req, res) {
  try {
    await Franquia.findByIdAndDelete(req.body.id);
    res.json("Deletado com Sucesso!");
  } catch (error) {
    res.json(error);
  }
}

module.exports = {
  getFranquias,
  getFranquia,
  postFranquia,
  putFranquia,
  deleteFranquia,
};
