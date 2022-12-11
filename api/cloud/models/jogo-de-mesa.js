const mongoose = require("mongoose");

const jogoDeMesaSchema = new mongoose.Schema({
  nomeUsa: { type: String, required: true },
  nomeBra: { type: String, default: "?" },
  lancamento: { type: Date, required: true },
  sinopse: { type: String, default: "?" },
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categoria",
  },
  subcategoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategoria",
  },
  idioma: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Idioma",
  },
  qualidade: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Qualidade",
  },
  edicao: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Edicao",
  },
  base: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JogoDeMesa",
  },
  expansoes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JogoDeMesa",
    },
  ],

  players: [Number],
  tematicas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tematica",
    },
  ],
  modalidades: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Modalidade",
    },
  ],
  genero: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Genero",
  },
  movimentacao: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movimentacao",
  },

  franquias: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Franquia",
    },
  ],

  adquirido: { type: Boolean, default: false },
  finalizado: { type: Boolean, default: false },
  trailer: { type: String, default: "" },
  imagens: [{ nome: String, path: String }],
  anexos: [{ nome: String, path: String }],
});

module.exports = mongoose.model(
  "JogoDeMesa",
  jogoDeMesaSchema,
  "jogosDeMesaCollection"
);
