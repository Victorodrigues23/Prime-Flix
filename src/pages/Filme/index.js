import { useEffect, useState } from "react"; // Importa hooks do React
import { useParams, useNavigate } from "react-router-dom"; // Importa funções para manipulação de rotas
import "./filme-info.css"; // Importa o arquivo de estilos CSS
import api from "../../service/api"; // Importa a instância de API configurada

function Filme() {
  const { id } = useParams(); // Obtém o parâmetro da URL (id do filme)
  const navigate = useNavigate(); // Hook para navegação entre páginas
  const [filme, setFilme] = useState({}); // Estado para armazenar os detalhes do filme
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento dos dados

  useEffect(() => {
    async function loadfilmes() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "8ff4f5e673f6817f1aa7e904f06a3ffb", // Chave da API do TMDB
            language: "pt-BR", // Define o idioma como português do Brasil
          },
        })
        .then((response) => {
          setFilme(response.data); // Atualiza o estado com os dados do filme
          setLoading(false); // Define o carregamento como concluído
        })
        .catch(() => {
          console.log("Filme não encontrado"); // Log de erro
          navigate("/", { replace: true }); // Redireciona para a página inicial caso o filme não seja encontrado
          return;
        });
    }

    loadfilmes(); // Chama a função para carregar os detalhes do filme

    return () => {
      console.log("COMPONENTE FOI DESMONTADO"); // Mensagem ao desmontar o componente
    };
  }, [navigate, id]); // O array vazio indica que o efeito roda apenas uma vez, quando o componente é montado

  function salvarFilme() {
    const minhaLista = localStorage.getItem("@primeflix");

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some(
      (filmeSalvo) => filmeSalvo.id === filme.id
    );

    if (hasFilme) {
      alert("ESSE FILME JÁ ESTÁ NA LISTA");
      return;
    }
    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    alert("FILME SALVO COM SUCESSO ");
  }

  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando Detalhes do Filme</h1>
      </div>
    ); // Exibe uma mensagem de carregamento enquanto os dados estão sendo buscados
  }

  return (
    <div className="filme-info">
      <h1>{filme.title}</h1> {/* Exibe o título do filme */}
      <img
        src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
        alt={filme.title} // Adiciona atributo alt para acessibilidade
      />
      <h3>Sinopse</h3>
      <span>{filme.overview}</span> {/* Exibe a sinopse do filme */}
      <strong>Avaliação : {filme.vote_average} / 10 </strong>{" "}
      {/* Exibe a avaliação do filme */}
      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>{" "}
        {/* Botão para salvar o filme (ainda não implementado) */}
        <button>
          <a
            target="_blank"
            rel="external"
            href={`https://youtube.com/results?search_query=${filme.title}`}
          >
            Trailer
          </a>{" "}
          {/* Link para assistir ao trailer (ainda não implementado) */}
        </button>
      </div>
    </div>
  );
}

export default Filme; // Exporta o componente para ser utilizado em outras partes do projeto
