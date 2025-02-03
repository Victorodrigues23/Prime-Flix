import { Link } from "react-router-dom";
import "./erro.css";

function Erro() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h1>PÁGINA NÃO ENCONTRADA ! </h1>
      <Link to="/">Veja Todos os Filmes !</Link>
    </div>
  );
}

export default Erro;
