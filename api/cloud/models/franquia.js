const mongoose = require("mongoose");

const franquiaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  tipo: String,
  subfranquias: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Franquia",
    },
  ],
});

module.exports = mongoose.model(
  "Franquia",
  franquiaSchema,
  "franquiasCollection"
);
