import React, { useEffect } from "react";
import { useState } from "react";

const AdicionarNovoJogo = ({ getCollection }) => {
  const [categoriasCollection, setCategoriasCollection] = useState([]);
  const [jogosDeMesaPropriedades, setJogosDeMesaPropriedades] = useState([]);
  const [jogosDeMesaCollection, setJogosDeMesaCollection] = useState([]);
  const [tematicasCollection, setTematicasCollection] = useState([]);
  const [franquiasCollection, setFranquiasCollection] = useState([]);
  const [modalidades, setModalidades] = useState([]);
  const [expansoes, setExpansoes] = useState([]);
  const [tematicas, setTematicas] = useState([]);
  const [franquias, setFranquias] = useState([]);

  const [novoJogo, setNovoJogo] = useState({
    nomeUsa: "",
    nomeBra: "?",
    lancamento: "",
    sinopse: "?",
    playerMin: "",
    playerMax: "",
    players: [],
    modalidades: [],
    imagens: [],
    trailer: "",
    categoria: "",
    subcategoria: "",
    idioma: "",
    edicao: "",
    base: "",
    expansoes: [],
    genero: "",
    movimentacao: "",
    tematicas: [],
    anexos: [],
    adquirido: false,
    finalizado: false,
    franquias: [],
  });

  useEffect(() => {
    async function getCollection() {
      const categoriasGet = await fetch(
        process.env.REACT_APP_API_URL + "/categorias"
      );
      const categorias = await categoriasGet.json();
      setCategoriasCollection(categorias);

      setJogosDeMesaPropriedades(
        categorias.find((categoria) => categoria.nome === "Jogos de Mesa")
      );

      const jogosDeMesaGet = await fetch(
        process.env.REACT_APP_API_URL + "/jogos-de-mesa"
      );
      const jogosDeMesa = await jogosDeMesaGet.json();

      setJogosDeMesaCollection(jogosDeMesa);

      const tematicasGet = await fetch(
        process.env.REACT_APP_API_URL + "/tematicas"
      );
      const tematicas = await tematicasGet.json();

      setTematicasCollection(tematicas);

      const franquiasGet = await fetch(
        process.env.REACT_APP_API_URL + "/franquias"
      );
      const franquias = await franquiasGet.json();

      setFranquiasCollection(franquias);
    }

    getCollection();
  }, []);

  const handleChange = (e) => {
    novoJogo[e.target.name] = e.target.value;
    let imagens = [];
    let anexos = [];

    if (e.target.name === "modalidades" && e.target.checked) {
      setModalidades((prev) => [...prev, e.target.value]);
    } else if (e.target.name === "expansoes" && e.target.checked) {
      setExpansoes((prev) => [...prev, e.target.value]);
    } else if (e.target.name === "tematicas" && e.target.checked) {
      setTematicas((prev) => [...prev, e.target.value]);
    } else if (e.target.name === "franquias" && e.target.checked) {
      setFranquias([...franquias, e.target.value]);
    } else if (e.target.name === "trailer") {
      novoJogo.trailer = e.target.files[0].name;
    } else if (e.target.name === "imagens") {
      for (let i = 0; i < e.target.files.length; i++) {
        imagens.push(e.target.files.item(i).name);
      }
      novoJogo.imagens = imagens;
    } else if (e.target.name === "anexos") {
      for (let i = 0; i < e.target.files.length; i++) {
        anexos.push(
          e.target.files.item(i).name.replaceAll(" ", "_").replaceAll("-", "_")
        );
      }
      novoJogo.anexos = anexos;
    }

    novoJogo.modalidades = modalidades;
    novoJogo.expansoes = expansoes;
    novoJogo.tematicas = tematicas;
    novoJogo.franquias = franquias;

    console.log(novoJogo);
    setNovoJogo(novoJogo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirm = window.confirm("Deseja salvar?");

    if (!confirm) return;

    for (let i = Number(novoJogo.playerMin); i <= novoJogo.playerMax; i++) {
      novoJogo.players.push(i);
    }

    setNovoJogo(novoJogo);

    const response = await fetch(
      process.env.REACT_APP_API_URL + "/jogo-de-mesa",
      {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(novoJogo),
      }
    );

    window.alert(await response.json());

    getCollection();
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label>Nome Usa: </label>
      <input type="text" name="nomeUsa" onChange={handleChange} required />
      <br />
      <label>Nome BRA: </label>
      <input type="text" name="nomeBra" onChange={handleChange} />
      <br />
      <label>Lançamento: </label>
      <input type="date" name="lancamento" onChange={handleChange} required />
      <br />
      <label>Sinopse: </label>
      <textarea name="sinopse" onChange={handleChange}></textarea>
      <br />
      <label>Players: </label>
      Min:{" "}
      <input
        type="number"
        min="1"
        name="playerMin"
        onChange={handleChange}
        required
      />
      Max:{" "}
      <input type="number" name="playerMax" onChange={handleChange} required />
      <br />
      <details>
        <summary>Modalidades:</summary>
        <ul>
          {jogosDeMesaPropriedades.modalidades?.map((modalidade) => {
            return (
              <li key={modalidade._id}>
                <input
                  type="checkbox"
                  name="modalidades"
                  value={modalidade._id}
                  onChange={handleChange}
                />{" "}
                <label>{modalidade.nome}</label>
              </li>
            );
          })}
        </ul>
      </details>
      <label>Imagens: </label>
      <input type="file" multiple name="imagens" onChange={handleChange} />
      <br />
      <label>Trailer: </label>
      <input type="file" name="trailer" onChange={handleChange} required />
      <br />
      <label>Categoria: </label>
      <select name="categoria" onChange={handleChange} required>
        <option hidden>Selecione...</option>
        {categoriasCollection.map((categoria) => (
          <option value={categoria._id}>{categoria.nome}</option>
        ))}
      </select>
      <br />
      <label>Subcategoria: </label>
      <select name="subcategoria" onChange={handleChange} required>
        <option hidden>Selecione...</option>
        {jogosDeMesaPropriedades.subcategorias?.map((subcategoria) => (
          <option value={subcategoria._id}>{subcategoria.nome}</option>
        ))}
      </select>
      <br />
      <label>Idioma: </label>
      <select name="idioma" onChange={handleChange} required>
        <option hidden>Selecione...</option>
        {jogosDeMesaPropriedades.idiomas?.map((idioma) => (
          <option value={idioma._id}>{idioma.nome}</option>
        ))}
      </select>
      <br />
      <label>Edição: </label>
      <select name="edicao" onChange={handleChange}>
        <option hidden>Selecione...</option>
        {jogosDeMesaPropriedades.edicoes?.map((edicao) => (
          <option value={edicao._id}>{edicao.nome}</option>
        ))}
      </select>
      <br />
      <label>Base: </label>
      <select name="base" onChange={handleChange}>
        <option hidden>Selecione...</option>
        {jogosDeMesaCollection.map((jogoDeMesa) => (
          <option value={jogoDeMesa._id}>{jogoDeMesa.nomeUsa}</option>
        ))}
      </select>
      <br />
      <details>
        <summary>Expansões:</summary>
        <ul>
          {jogosDeMesaCollection.map((jogoDeMesa) => {
            return (
              <li key={jogoDeMesa._id}>
                <input
                  type="checkbox"
                  name="expansoes"
                  value={jogoDeMesa._id}
                  onChange={handleChange}
                />{" "}
                <label>{jogoDeMesa.nomeUsa}</label>
              </li>
            );
          })}
        </ul>
      </details>
      <label>Gênero: </label>
      <select name="genero" onChange={handleChange}>
        <option hidden>Selecione...</option>
        {jogosDeMesaPropriedades.generos?.map((genero) => (
          <option value={genero._id}>{genero.nome}</option>
        ))}
      </select>
      <br />
      <label>Movimentação: </label>
      <select name="movimentacao" onChange={handleChange}>
        <option hidden>Selecione...</option>
        {jogosDeMesaPropriedades.movimentacoes?.map((movimentacao) => (
          <option value={movimentacao._id}>{movimentacao.nome}</option>
        ))}
      </select>
      <br />
      <details>
        <summary>Temáticas:</summary>
        <ul>
          {tematicasCollection.map((tematica) => {
            return (
              <li key={tematica._id}>
                <input
                  type="checkbox"
                  name="tematicas"
                  value={tematica._id}
                  onChange={handleChange}
                />{" "}
                <label>{tematica.nome}</label>
              </li>
            );
          })}
        </ul>
      </details>
      <details>
        <summary>Franquias:</summary>
        <ul>
          {franquiasCollection.map((franquia) => {
            return (
              <li key={franquia._id}>
                <input
                  type="checkbox"
                  name="franquias"
                  value={franquia._id}
                  onChange={handleChange}
                />{" "}
                <label>{franquia.nome}</label>
              </li>
            );
          })}
        </ul>
      </details>
      <label>Anexos: </label>
      <input type="file" multiple name="anexos" onChange={handleChange} />
      <br />
      <label>Adquirido: </label>
      <input
        type="radio"
        name="adquirido"
        value={false}
        checked
        onChange={handleChange}
      />
      <label> NAO </label>
      <input
        type="radio"
        name="adquirido"
        value={true}
        onChange={handleChange}
      />
      <label> SIM </label>
      <br />
      <label>Finalizado: </label>
      <input
        type="radio"
        name="finalizado"
        value={false}
        checked
        onChange={handleChange}
      />
      <label> NAO </label>
      <input
        type="radio"
        name="finalizado"
        value={true}
        onChange={handleChange}
      />
      <label> SIM </label>
      <br />
      <br />
      <button>OK</button>
      <br />
      <br />
    </form>
  );
};

export default AdicionarNovoJogo;
