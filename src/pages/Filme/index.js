import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../service/api";

function Filme() {
  const { id } = useParams();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadfilmes() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "8ff4f5e673f6817f1aa7e904f06a3ffb",
            language: "pt-BR",
          },
        })
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })

        .catch(() => {
          console.log("Filme não encontrado");
        });
    }

    loadfilmes();

    return () => {
      console.log("COMPONENTE FOI DESMONTADO");
    };
  }, []);

  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando Detalhes do Filme</h1>
      </div>
    );
  }

  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
      ></img>
      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>Avaliação : {filme.vote_average} / 10 </strong>
    </div>
  );
}

export default Filme;
