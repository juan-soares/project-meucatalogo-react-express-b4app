import React, { useState, useEffect } from "react";

const Tematicas = () => {
  const [tematicasLista, setTematicasLista] = useState([]);
  const [novaTematica, setNovaTematica] = useState({ nome: "" });
  const [novoElemento, setNovoElemento] = useState({
    elemento: { nome: "", tematicaId: "" },
  });

  async function updateCollection() {
    const collectionFetch = await fetch(
      `${process.env.REACT_APP_API_URL}/tematicas`
    );

    setTematicasLista(await collectionFetch.json());
  }

  useEffect(() => {
    updateCollection();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirm = window.confirm("Deseja salvar?");

    if (!confirm) return;

    const serverResponse = await fetch(
      `${process.env.REACT_APP_API_URL}/tematicas`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(
          e.target.name === "tematica" ? novaTematica : novoElemento
        ),
      }
    );

    window.alert(await serverResponse.json());

    e.target.reset();

    updateCollection();
  };

  return (
    <details>
      <summary>TEMÁTICAS</summary>
      <ul>
        <li>
          <form name="tematica" onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              onChange={(e) => setNovaTematica({ nome: e.target.value })}
              required
            />
            <button>OK</button>
          </form>
        </li>
        {tematicasLista.map((tematica) => {
          return (
            <details key={tematica._id}>
              <summary>Nome: {tematica.nome}</summary>
              <ul>
                <details>
                  <summary>Elementos</summary>
                  <ul>
                    <li>
                      <form name="elementos" onSubmit={(e) => handleSubmit(e)}>
                        <input
                          type="text"
                          onChange={(e) =>
                            setNovoElemento({
                              elemento: {
                                nome: e.target.value,
                                tematicaId: tematica._id,
                              },
                            })
                          }
                          required
                        />
                        <button>OK</button>
                      </form>
                    </li>

                    {tematica.elementos.map((elemento) => {
                      return (
                        <li key={elemento._id}>
                          <input
                            type="text"
                            value={elemento.nome}
                            disabled={true}
                          />
                          <button
                            onClick={async () => {
                              const confirm = window.confirm(
                                "Deseja realmente excluir?"
                              );

                              if (!confirm) return;

                              const serverResponse = await fetch(
                                `${process.env.REACT_APP_API_URL}/tematicas/`,
                                {
                                  method: "DELETE",
                                  headers: {
                                    "Content-Type":
                                      "application/json; charset=utf-8",
                                  },
                                  body: JSON.stringify({
                                    tematicaId: tematica._id,
                                    elementoId: elemento._id,
                                  }),
                                }
                              );

                              window.alert(await serverResponse.json());
                              updateCollection();
                            }}
                          >
                            DEL
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </details>
              </ul>
            </details>
          );
        })}
      </ul>
    </details>
  );
};

export default Tematicas;
