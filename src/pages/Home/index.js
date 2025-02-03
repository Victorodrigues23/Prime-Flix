import { useEffect, useState } from "react";
import api from "./../../service/api";
import { Link } from "react-router-dom";
import "./home.css";
// /movie/550?api_key=8ff4f5e673f6817f1aa7e904f06a3ffb&language="pt-BR"
function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadfilmes() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "8ff4f5e673f6817f1aa7e904f06a3ffb",
          language: "pt-BR",
          page: 1,
        },
      });

      setFilmes(response.data.results.slice(0, 10));
      setLoading(false);
    }

    loadfilmes();
  });

  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando filme...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="lista-filmes">
        {filmes.map((filme) => {
          return (
            <article key={filme.id}>
              <strong>{filme.title}</strong>
              <img
                src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                alt={filme.title}
              ></img>

              <Link to={`/filme/${filme.id}`}>Acessar</Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
