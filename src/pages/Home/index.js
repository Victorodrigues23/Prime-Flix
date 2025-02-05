import { useEffect, useState } from "react"; // Importa os hooks useEffect e useState do React
import api from "./../../service/api"; // Importa a instância de API configurada para chamadas HTTP
import { Link } from "react-router-dom"; // Importa o Link para navegação entre páginas
import "./home.css"; // Importa o arquivo de estilos CSS

function Home() {
  const [filmes, setFilmes] = useState([]); // Estado para armazenar a lista de filmes
  const [loading, setLoading] = useState(true); // Estado para indicar o carregamento dos dados

  useEffect(() => {
    async function loadfilmes() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "8ff4f5e673f6817f1aa7e904f06a3ffb", // Chave da API do TMDB
          language: "pt-BR", // Define o idioma como português do Brasil
          page: 1, // Define a página da listagem
        },
      });

      setFilmes(response.data.results.slice(0, 10)); // Armazena apenas os 10 primeiros filmes da resposta
      setLoading(false); // Define que o carregamento terminou
    }

    loadfilmes();
  }, []); // O array vazio garante que o efeito será executado apenas uma vez ao montar o componente

  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando filme...</h2>{" "}
        {/* Exibe mensagem enquanto os filmes estão sendo carregados */}
      </div>
    );
  }

  return (
    <div className="container">
      <div className="lista-filmes">
        {filmes.map((filme) => {
          return (
            <article key={filme.id}>
              <strong>{filme.title}</strong> {/* Exibe o título do filme */}
              <img
                src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} // Exibe o pôster do filme
                alt={filme.title}
              ></img>
              <Link to={`/filme/${filme.id}`}>Acessar</Link>{" "}
              {/* Link para página de detalhes do filme */}
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default Home; // Exporta o componente para ser usado em outras partes do projeto
