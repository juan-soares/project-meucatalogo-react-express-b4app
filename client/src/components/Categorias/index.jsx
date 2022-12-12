import React, { useState, useEffect } from "react";

const Categorias = () => {
  const [categoriasLista, setCategoriasLista] = useState([]);
  const [novaCategoria, setNovaCategoria] = useState({
    categoria: { nome: "" },
  });
  const [novaPropriedade, setNovaPropriedade] = useState({
    propriedade: { propriedade: "", nome: "", categoriaId: "" },
  });

  async function updateCollection() {
    const collectionFetch = await fetch(
      `${process.env.REACT_APP_API_URL}/categorias`
    );

    setCategoriasLista(await collectionFetch.json());
  }

  useEffect(() => {
    updateCollection();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirm = window.confirm("Deseja salvar?");

    if (!confirm) return;

    const serverResponse = await fetch(
      `${process.env.REACT_APP_API_URL}/categoria`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(
          e.target.name === "categoria" ? novaCategoria : novaPropriedade
        ),
      }
    );

    window.alert(await serverResponse.json());

    e.target.reset();

    updateCollection();
  };

  return (
    <details>
      <summary>CATEGORIAS</summary>
      <ul>
        <li>
          <form name="categoria" onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              onChange={(e) =>
                setNovaCategoria({ categoria: { nome: e.target.value } })
              }
              required
            />
            <button>OK</button>
          </form>
        </li>
        {categoriasLista.map((categoria) => {
          return (
            <details key={categoria._id}>
              <summary>Nome: {categoria.nome}</summary>
              <ul>
                {Object.keys(categoria).map((propriedade) => {
                  if (
                    (propriedade === "nome") |
                    (propriedade === "_id") |
                    (propriedade === "__v")
                  )
                    return null;

                  return (
                    <details key={propriedade}>
                      <summary>
                        {propriedade[0].toUpperCase() +
                          propriedade.substring(1)}
                      </summary>
                      <ul>
                        <li>
                          <form
                            name={propriedade}
                            onSubmit={(e) => handleSubmit(e)}
                          >
                            <input
                              type="text"
                              name={propriedade}
                              onChange={(e) =>
                                setNovaPropriedade({
                                  propriedade: e.target.name,
                                  nome: e.target.value,
                                  categoriaId: categoria._id,
                                })
                              }
                              required
                            />
                            <button>OK</button>
                          </form>
                        </li>

                        {categoria[propriedade].map((propriedadeValor) => {
                          return (
                            <li key={propriedadeValor._id}>
                              <input
                                type="text"
                                value={propriedadeValor.nome}
                                disabled={true}
                              />
                              <button
                                onClick={async () => {
                                  const confirm = window.confirm(
                                    "Deseja realmente excluir?"
                                  );

                                  if (!confirm) return;

                                  const serverResponse = await fetch(
                                    `${process.env.REACT_APP_API_URL}/categorias/`,
                                    {
                                      method: "DELETE",
                                      headers: {
                                        "Content-Type":
                                          "application/json; charset=utf-8",
                                      },
                                      body: JSON.stringify({
                                        categoriaId: categoria._id,
                                        propriedadeId: propriedadeValor._id,
                                        propriedade: propriedade,
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
                  );
                })}
              </ul>
            </details>
          );
        })}
      </ul>
    </details>
  );
};

export default Categorias;
