import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ListaReceitas from "../components/ListaReceitas.js"; 
import AdicionarBtn from "../components/AdicionarBtn.js"; 
import authFetch from "../helpers/authFetch.js";
import "../styles/Home.css"; 
import loading from '../img/logo.png'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [receitas, setReceitas] = useState([]);
  const [receitasFavoritas, setReceitasFavoritas] = useState([]);
  const [favoritas, setFavoritas] = useState([]);

  const navigate = useNavigate();
 
  useEffect(() => {
    const fetchReceitas = async () => {
      try {
        const result = await authFetch("https://backcooking.onrender.com/receita", {
          headers: {
            "Content-Type": "application/json",
          },
        },
      navigate
    );
        const data = await result.json();
        if (data.receita) {
          setReceitas(data.receita);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchFavoritas = async () => {
      try {
        const result = await authFetch("https://backcooking.onrender.com/favorito", {
          headers: {
            "Content-Type": "application/json",
          },
        },
      navigate
    );
        const data = await result.json();
        if (data.favorito) {
          setFavoritas(data.favorito);
          const promises = data.favorito.map(async (favorita) => {
            try {
              const result = await authFetch(`https://backcooking.onrender.com/receita/${favorita.receitaId}`, {}, navigate);
              const receitaData = await result.json();
              return receitaData.receita;
            } catch (error) {
              console.error(error);
              return null;
            }
          });
          const receitasFetched = await Promise.all(promises);
          setReceitasFavoritas(receitasFetched.filter(receita => receita !== null));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReceitas();
    fetchFavoritas();
  }, []);

  if (isLoading) {
    return (
      
      <div className="container-splash">
      <img src={loading}/>
      <p>Carregando...</p>
    </div>
      
    );
  }

  if (receitas.length === 0) {
    return (
      <div className="containerSplash">
        <h1 className="titulo-home">Suas receitas</h1>
        <p className="splash">Você ainda não criou nenhuma receita.</p>
        <AdicionarBtn title={"Criar"} onClick={() => navigate("/criar-receita")} /> 
      </div>
    );
  }

  return (
    <div className="container-home">
      <h1 className="titulo-home">Suas receitas</h1>
      <ListaReceitas receitas={receitas} />
      <h1 id="receitasFav" className="tituloFav">Receitas favoritas</h1>
      <ListaReceitas receitas={receitasFavoritas} />
    </div>
  );
};

export default Home;
