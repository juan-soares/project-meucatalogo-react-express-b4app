import React from "react";
import "./App.css";
import Categorias from "./components/Categorias";
import Franquias from "./components/Franquias";
import JogosDeMesa from "./components/JogosDeMesa";
import Tematicas from "./components/Tematicas";

const App = () => {

  return (
    <div className="App">
      <h1> HOME </h1>
      <Categorias />
      <Tematicas />
      <Franquias />
      <JogosDeMesa />
    </div>
  );
};

export default App;
