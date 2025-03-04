import { useState, useEffect } from "react";
import "./favoritos.css";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Favoritos() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const minhaLista = localStorage.getItem("@primeflix");
    setFilmes(JSON.parse(minhaLista) || []);
  }, []);

  function excluirFilme(id) {
    let filtroFilmes = filmes.filter((item) => {
      return item.id !== id;
    });

    setFilmes(filtroFilmes);

    localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes));
    toast.success("Filme removido com Sucesso");
  }

  return (
    <div className="meus-filmes">
      <h1>Meus Filmes</h1>

      {filmes.length === 0 && <span>Você não Possui Filmes na Lista :( </span>}

      <ul>
        {filmes.map((item) => {
          return (
            <li key={item.id}>
              <span>{item.title}</span>

              <div>
                <Link to={`/filme/${item.id}`}>Ver Detalhes</Link>
                <button onClick={() => excluirFilme(item.id)}>Excluir</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Favoritos;
