import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authFetch from "../helpers/authFetch.js";
import "../styles/Home.css";
import loading from "../img/logo.png";
import isAuth from "../helpers/authOkay.js";
import AddBtn from "../components/AddBtn.js";
import ListRecipes from "../components/ListRecipes.js";

const Home = () => {
  const [receitasFiltradas, setReceitasFiltradas] = useState([]); // Para receitas filtradas
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [receitas, setReceitas] = useState([]);
  const [receitasFavoritas, setReceitasFavoritas] = useState([]);
  const [favoritas, setFavoritas] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const isLogged = isAuth();
    if (isLogged === false) {
      navigate("/login");
    }

    const fetchReceitas = async () => {
      try {
        const result = await authFetch(
          "https://backcooking.onrender.com/receita",
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
          navigate
        );
        const data = await result.json();
        if (data.receita) {
          setReceitas(data.receita);
          setReceitasFiltradas(data.receita);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchFavoritas = async () => {
      try {
        const result = await authFetch(
          "https://backcooking.onrender.com/favorito",
          {
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
              const result = await authFetch(
                `https://backcooking.onrender.com/receita/${favorita.receitaId}`,
                {},
                navigate
              );
              const receitaData = await result.json();
              return receitaData.receita;
            } catch (error) {
              console.error(error);
              return null;
            }
          });
          const receitasFetched = await Promise.all(promises);
          setReceitasFavoritas(
            receitasFetched.filter((receita) => receita !== null)
          );
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

  if (isLoading) {
    return (
      <div className="container-splash">
        <img src={loading} />
        <p>Carregando...</p>
      </div>
    );
  }

  if (receitas.length === 0) {
    return (
      <div className="containerSplash">
        <h1 className="titulo-home">Suas receitas</h1>
        <p className="splash">Você ainda não criou nenhuma receita.</p>
        <AddBtn
          title={"Criar"}
          onClick={() => navigate("/criar-receita")}
        />
      </div>
    );
  }

  return (
    <div className="container-home">
      <h1 className="titulo-home">Suas receitas</h1>
      <input
        type="text"
        placeholder="Pesquisar receitas..."
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
        className="input"
      />
      {receitasFiltradas.length > 0 ? (
        <ListRecipes receitas={receitasFiltradas} />
      ) : (
        <ListRecipes receitas={receitas} />
      )}
      <h1 id="receitasFav" className="tituloFav">
        Receitas favoritas
      </h1>
      <ListRecipes receitas={receitasFavoritas} />
    </div>
  );
};

export default Home;
