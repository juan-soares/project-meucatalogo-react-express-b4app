const mongoose = require("mongoose");

const subCategoriaSchema = new mongoose.Schema({
  nome: { type: String, required: true, unique: true },
});

const Subcategoria = mongoose.model(
  "Subcategoria",
  subCategoriaSchema,
  "categoriaSubcategoriasCollection"
);

const idiomaSchema = new mongoose.Schema({
  nome: { type: String, required: true, unique: true },
});

const Idioma = mongoose.model(
  "Idioma",
  idiomaSchema,
  "categoriaIdiomasCollection"
);

const qualidadeSchema = new mongoose.Schema({
  nome: { type: String, required: true, unique: true },
});

const Qualidade = mongoose.model(
  "Qualidade",
  qualidadeSchema,
  "categoriaQualidadesCollection"
);

const edicaoSchema = new mongoose.Schema({
  nome: { type: String, required: true, unique: true },
});

const Edicao = mongoose.model(
  "Edicao",
  edicaoSchema,
  "categoriaEdicoesCollection"
);

const generoSchema = new mongoose.Schema({
  nome: { type: String, required: true, unique: true },
});

const Genero = mongoose.model(
  "Genero",
  generoSchema,
  "categoriaGenerosCollection"
);

const modalidadeSchema = new mongoose.Schema({
  nome: { type: String, required: true, unique: true },
});

const Modalidade = mongoose.model(
  "Modalidade",
  modalidadeSchema,
  "categoriaModalidadesCollection"
);

const movimentacaoSchema = new mongoose.Schema({
  nome: { type: String, required: true, unique: true },
});

const Movimentacao = mongoose.model(
  "Movimentacao",
  movimentacaoSchema,
  "categoriaMovimentacoesCollection"
);

const categoriaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  subcategorias: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Subcategoria" },
  ],
  idiomas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Idioma" }],
  qualidades: [{ type: mongoose.Schema.Types.ObjectId, ref: "Qualidade" }],
  edicoes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Edicao" }],
  generos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Genero" }],
  modalidades: [{ type: mongoose.Schema.Types.ObjectId, ref: "Modalidade" }],
  movimentacoes: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Movimentacao" },
  ],
});

const Categoria = mongoose.model(
  "Categoria",
  categoriaSchema,
  "categoriasCollection"
);

module.exports = {
  Categoria,
  Subcategoria,
  Idioma,
  Qualidade,
  Edicao,
  Genero,
  Modalidade,
  Movimentacao,
};
