import React, { useState, useEffect } from "react";
import AdicionarNovoJogo from "./Adicionar";

const JogosDeMesa = () => {
  const [jogosDeMesaLista, setJogosDeMesaLista] = useState([]);

  async function getCollection() {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/jogos-de-mesa`);

    setJogosDeMesaLista(await res.json());
  }

  useEffect(() => {
    getCollection();
  }, []);

  return (
    <details>
      <summary>JOGOS DE MESA</summary>
      <ul>
        <li>
          <details>
            <summary>ADICIONAR</summary>
            <AdicionarNovoJogo />
          </details>
        </li>
        {jogosDeMesaLista.map((jogoDeMesa) => {
          return (
            <li>
              <details>
                <summary>
                  <b>Nome USA: </b>
                  <input type="text" value={jogoDeMesa.nomeUsa} disabled />
                  <button>ALT</button>
                  <button>DEL</button>
                </summary>
                <ul>
                  <li>
                    <b>Nome BRA: </b>
                    <input type="text" value={jogoDeMesa.nomeBra} disabled />
                  </li>
                  <li>
                    <b>Lancamento: </b>
                    <input
                      type="date"
                      value={jogoDeMesa.lancamento.slice(0, 10)}
                      disabled
                    />
                  </li>
                  <li>
                    <b>Sinopse: </b>
                    <textarea value={jogoDeMesa.sinopse} disabled />
                  </li>
                  <li>
                    <b>Players: </b>
                    <br />
                    Min:
                    <input
                      type="number"
                      value={jogoDeMesa.players[0]}
                      disabled
                    />
                    Max:
                    <input
                      type="number"
                      value={jogoDeMesa.players[jogoDeMesa.players.length - 1]}
                      disabled
                    />
                  </li>
                  <li>
                    <b>Imagens: </b>
                    {jogoDeMesa.imagens.map((imagem) => (
                      <img
                        width="300"
                        height="300"
                        src={process.env.REACT_APP_API_URL + imagem.path}
                        alt={imagem.nome}
                      />
                    ))}
                  </li>
                  <li>
                    <b>Trailer: </b>
                    <video
                      width="300"
                      height="300"
                      controls
                      autoPlay={true}
                      muted={true}
                    >
                      <source
                        src={process.env.REACT_APP_API_URL + jogoDeMesa.trailer}
                      />
                    </video>
                  </li>
                  <li>
                    <b>Categoria: </b>
                    <select disabled>
                      <option>{jogoDeMesa.categoria.nome}</option>
                    </select>
                  </li>
                  <li>
                    <b>Subcategoria: </b>
                    <select disabled>
                      <option>{jogoDeMesa.subcategoria.nome}</option>
                    </select>
                  </li>
                  <li>
                    <b>Idioma: </b>
                    <select disabled>
                      <option>{jogoDeMesa.idioma.nome}</option>
                    </select>
                  </li>
                  <li>
                    <b>Edição: </b>
                    <select disabled>
                      <option>{jogoDeMesa.edicao.nome}</option>
                    </select>
                  </li>
                  <li>
                    <b>Base: </b>
                    <select disabled>
                      <option>
                        {jogoDeMesa.base.nomeUsa} (
                        {jogoDeMesa.base.lancamento.slice(0, 4)})
                      </option>
                    </select>
                  </li>
                  <li>
                    <b>Expansões: </b>
                    <ul>
                      {jogoDeMesa.expansoes.map((expansao) => {
                        return (
                          <li>
                            <select disabled>
                              <option>
                                {expansao.nomeUsa} (
                                {expansao.lancamento.slice(0, 4)})
                              </option>
                            </select>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                  <li>
                    <b>Genero: </b>
                    <select disabled>
                      <option>{jogoDeMesa.genero?.nome}</option>
                    </select>
                  </li>{" "}
                  <li>
                    <b>Movimentação: </b>
                    <select disabled>
                      <option>{jogoDeMesa.movimentacao?.nome}</option>
                    </select>
                  </li>
                  <li>
                    <b>Franquias: </b>

                    {jogoDeMesa.franquia.map((franquia) => (
                      <>
                        <select disabled>
                          <option>{franquia.nome}</option>
                        </select>
                        {" > "}
                      </>
                    ))}
                  </li>
                  <li>
                    <b>Elementos: </b>
                    <ul>
                      {jogoDeMesa.tematicas.map((tematica) => (
                        <li>
                          <select disabled>
                            <option>{tematica.nome}</option>
                          </select>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li>
                    <b>Anexos: </b>
                    <ul>
                      {jogoDeMesa.anexos.map((anexo) => (
                        <li>
                          <a href={anexo.path}>{anexo.nome}</a>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li>
                    <b>Adquirido: </b>
                    <select disabled>
                      <option>{jogoDeMesa.adquirido ? "SIM" : "NÃO"}</option>
                    </select>
                  </li>
                  <li>
                    <b>Finalizado: </b>
                    <select disabled>
                      <option>{jogoDeMesa.finalizado ? "SIM" : "NÃO"}</option>
                    </select>
                  </li>
                </ul>
                <br />
              </details>
            </li>
          );
        })}
      </ul>
    </details>
  );
};

export default JogosDeMesa;
