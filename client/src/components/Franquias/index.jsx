import React, { useState, useEffect } from "react";

const Franquias = () => {
  const [FranquiasLista, setFranquiasLista] = useState([]);
  const [novaSubfranquia, setNovaSubfranquia] = useState({
    paiId: "",
    nome: "",
    subfranquias: [],
  });

  async function updateCollection() {
    const collectionFetch = await fetch(
      `${process.env.REACT_APP_API_URL}/franquias`
    );

    setFranquiasLista(await collectionFetch.json());
  }

  useEffect(() => {
    updateCollection();
  }, []);

  const handleSubmit = async (e, subSubfranquia) => {
    e.preventDefault();

    const confirm = window.confirm("Deseja salvar?");

    if (!confirm) return;

    const serverResponse = await fetch(
      `${process.env.REACT_APP_API_URL}/franquias,
      {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(
          e.target.name === "franquia" ? novaSubfranquia : subSubfranquia
        ),
      }
    );

    window.alert(await serverResponse.json());

    e.target.reset();

    updateCollection();
  };

  const Subfranquia = ({ subfranquia }) => {
    const [subSubfranquia, setNovaSubfranquia] = useState({
      nome: "",
      subfranquias: [],
    });

    return (
      <li>
        <details>
          <summary>
            <b>Nome: </b>
            {subfranquia.nome}
          </summary>
          <ul>
            <li>
              <details>
                <summary>
                  <i>Subfranquias</i>
                </summary>
                <ul>
                  <li>
                    <form onSubmit={(e) => handleSubmit(e, subSubfranquia)}>
                      <input
                        type="text"
                        value={subSubfranquia.nome}
                        onChange={(e) => {
                          setNovaSubfranquia({
                            paiId: subfranquia._id,
                            nome: e.target.value,
                            subfranquias: [],
                          });
                        }}
                      />
                      <button>OK</button>
                    </form>
                  </li>
                  {subfranquia.subfranquias &&
                    subfranquia.subfranquias.map((subfranquia) => (
                      <Subfranquia
                        key={subfranquia._id}
                        subfranquia={subfranquia}
                      />
                    ))}
                </ul>
              </details>
            </li>
          </ul>
        </details>
      </li>
    );
  };

  return (
    <details>
      <summary>FRANQUIAS</summary>
      <ul>
        <li>
          <form onSubmit={handleSubmit} name="franquia">
            <input
              type="text"
              onChange={(e) => {
                setNovaSubfranquia({
                  nome: e.target.value,
                  subfranquias: [],
                });
              }}
            />
            <button>OK</button>
          </form>
        </li>
        <li>
          <details>
            <summary>
              <i>Subfranquias</i>
            </summary>
            <ul>
              {FranquiasLista.map((franquia) => {
                return <Subfranquia subfranquia={franquia} />;
              })}
            </ul>
          </details>
        </li>
      </ul>
    </details>
  );
};

export default Franquias;
