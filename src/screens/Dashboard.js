import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ListaReceitas from "../components/ListaReceitas.js";
import "../styles/Dashboard.css";
import Button from "../components/Button.js";
import SignBtn from "../components/SignBtn.js";

const Dashboard = () => {
  const [receitasFiltradas, setReceitasFiltradas] = useState([]); // Para receitas filtradas
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [receitas, setReceitas] = useState([]);
  const [receitasFavoritas, setReceitasFavoritas] = useState([]);
  const [favoritas, setFavoritas] = useState([]);

  const navigate = useNavigate();

  
  const handleSearch = (text) => {
    setSearchText(text);
    if (text === "") {
      setReceitasFiltradas(receitas); // Exibe todas as receitas se o campo estiver vazio
    } else {
      const filtradas = receitas.filter((receita) =>
        receita.name.toLowerCase().includes(text.toLowerCase())
      );
      setReceitasFiltradas(filtradas);
    }
  };

//   if (isLoading) {
//     return (
//       <div className="container-splash">
//         <img src={loading} />
//         <p>Carregando...</p>
//       </div>
//     );
//   }

//   if (receitas.length === 0) {
//     return (
//       <div className="containerSplash">
//         <h1 className="titulo-home">Suas receitas</h1>
//         <p className="splash">Você ainda não criou nenhuma receita.</p>
//         <AdicionarBtn
//           title={"Criar"}
//           onClick={() => navigate("/criar-receita")}
//         />
//       </div>
//     );
//   }

  return (
    <div className="container-dash">
      <h1 className="titulo-home">Pedidos</h1>
      <div className="botoesContainer">
      <SignBtn title="Lançar pedido"></SignBtn>
      <Button title="Marketing"></Button>
      <Button title="Cardápio"></Button>

      </div>
     
    
      <input
        type="text"
        placeholder="Pesquisar pedido..."
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
        className="input-dash"
      />
      {receitasFiltradas.length > 0 ? (
        <ListaReceitas receitas={receitasFiltradas} />
      ) : (
        <ListaReceitas receitas={receitas} />
      )}
    <div className="container-cliente">
        <div className="header-cliente"><p className="titulo-container-cliente">Cliente</p></div>
    <p>Tipo de pedido</p>
    </div>
    </div>
  );
};

export default Dashboard;
