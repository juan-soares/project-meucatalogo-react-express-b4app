const {
  Categoria,
  Subcategoria,
  Idioma,
  Qualidade,
  Edicao,
  Genero,
  Modalidade,
  Movimentacao,
} = require("../models/categoria");

async function getCategorias(req, res) {
  const categoriasCollection = await Categoria.find({})
    .populate("subcategorias")
    .populate("idiomas")
    .populate("qualidades")
    .populate("edicoes")
    .populate("generos")
    .populate("modalidades")
    .populate("movimentacoes");

  res.json(categoriasCollection);
}

async function getCategoria(req, res) {
  const categoriaDoc = await Categoria.findById(req.body.id);

  if (categoriaDoc === null) {
    res.json("Não encontrado!");
  } else {
    res.json(categoriaDoc);
  }
}

async function postCategoria(req, res) {
  if (req.body.categoria) {
    const novaCategoria = new Categoria({ nome: req.body.categoria.nome });
    try {
      await novaCategoria.save();
      res.json("Salvo com sucesso!");
    } catch (error) {
      res.json("Não foi possivel salvar. Erro: " + error);
    }
  } else {
    const propriedadesCollections = {
      subcategorias: Subcategoria,
      idiomas: Idioma,
      qualidades: Qualidade,
      edicoes: Edicao,
      generos: Genero,
      modalidades: Modalidade,
      movimentacoes: Movimentacao,
    };

    const checkExists = await propriedadesCollections[
      req.body.propriedade
    ].find({ nome: req.body.nome });

    let propriedadeId = "";

    if (checkExists.length === 0) {
      const propriedadeNovoValor = new propriedadesCollections[
        req.body.propriedade
      ]({ nome: req.body.nome });
      const { _id } = await propriedadeNovoValor.save();
      propriedadeId = _id;
    } else {
      propriedadeId = checkExists[0]._id;
    }

    const categoriaDoc = await Categoria.findById(req.body.categoriaId);

    if (categoriaDoc[req.body.propriedade].indexOf(propriedadeId) !== 0) {
      categoriaDoc[req.body.propriedade].push(propriedadeId);
      await categoriaDoc.save();
      res.json("Salvo com sucesso!");
    } else {
      res.json("Registro já existente!");
    }
  }
}

async function deleteCategoria(req, res) {
  const categoriaDoc = await Categoria.findById(req.body.categoriaId);
  console.log(categoriaDoc);

  categoriaDoc[req.body.propriedade].splice(
    categoriaDoc[req.body.propriedade].indexOf(req.body.propriedadeId),
    1
  );
  await categoriaDoc.save();
  res.json("Removido com Sucesso!");
}

module.exports = {
  getCategorias,
  getCategoria,
  postCategoria,
  deleteCategoria,
};
