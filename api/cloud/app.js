//Comentar Linha1 até Linha7 quando for fazer deploy p/ b4pp
/* const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.static("public"));
app.use(cors()); */

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./config/mongoose");

// ROTAS *CATEGORIAS*
const {
  getCategorias,
  getCategoria,
  postCategoria,
  deleteCategoria,
} = require("./controllers/categoria");

app.get("/categorias", getCategorias);
app.get("/categoria/id", getCategoria);
app.post("/categoria", postCategoria);
app.delete("/categoria", deleteCategoria);

// ROTAS *FRANQUIAS*
const {
  getFranquias,
  getFranquia,
  postFranquia,
  putFranquia,
  deleteFranquia,
} = require("./controllers/franquia");

app.get("/franquias", getFranquias);
app.get("/franquia/id", getFranquia);
app.post("/franquia", postFranquia);
app.put("/franquia", putFranquia);
app.delete("/franquia", deleteFranquia);

// ROTAS *TEMATICAS*
const {
  getTematicas,
  getTematica,
  postTematica,
  deleteTematica,
} = require("./controllers/tematica");

app.get("/tematicas", getTematicas);
app.get("/tematica/id", getTematica);
app.post("/tematica", postTematica);
app.delete("/tematica", deleteTematica);

// ROTAS *JOGOS-DE-MESA*
const {
  getJogosDeMesa,
  getJogoDeMesa,
  postJogoDeMesa,
  deleteJogoDeMesa,
} = require("./controllers/jogo-de-mesa");

app.get("/jogos-de-mesa", getJogosDeMesa);
app.get("/jogo-de-mesaid", getJogoDeMesa);
app.post("/jogo-de-mesa", postJogoDeMesa);
app.delete("/jogo-de-mesa", deleteJogoDeMesa);

module.exports = app;
