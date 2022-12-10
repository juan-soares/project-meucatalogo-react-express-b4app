const mongoose = require("mongoose");

const tematicaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  elementos: [new mongoose.Schema({ nome: String })],
});

module.exports = mongoose.model(
  "Tematica",
  tematicaSchema,
  "tematicasCollection"
);
