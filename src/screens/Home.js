import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authFetch from "../helpers/authFetch.js";
import "../styles/Home.css";
import loading from "../img/logo.png";
import isAuth from "../helpers/authOkay.js";
import AddBtn from "../components/AddBtn.js";
import ListRecipes from "../components/ListRecipes.js";

const Home = () => {
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [favoritas, setFavorites] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const isLogged = isAuth();
    if (isLogged === false) {
      navigate("/login");
    }

    const fetchRecipes = async () => {
      try {
        const result = await authFetch(
          "https://backcooking.onrender.com/recipes",
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
          navigate
        );
        const data = await result.json();
        if (data.recipe) {
          setRecipes(data.recipe);
          setFilteredRecipes(data.recipe);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchFavorites = async () => {
      try {
        const result = await authFetch(
          "https://backcooking.onrender.com/favorite",
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
          navigate
        );
        const data = await result.json();
        if (data.favorite) {
          setFavorites(data.favorite);
          const promises = data.favorite.map(async (favorite) => {
            try {
              const result = await authFetch(
                `https://backcooking.onrender.com/recipe/${favorite.recipeId}`,
                {},
                navigate
              );
              const recipeData = await result.json();
              return recipeData.recipe;
            } catch (error) {
              console.error(error);
              return null;
            }
          });
          const fetchedRecipes = await Promise.all(promises);
          setFavoriteRecipes(
            fetchedRecipes.filter((recipe) => recipe !== null)
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
    fetchFavorites();
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);
    if (text === "") {
      setFilteredRecipes(recipes);
    } else {
      const filtereds = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredRecipes(filtereds);
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

  if (recipes.length === 0) {
    return (
      <div className="containerSplash">
        <h1 className="titulo-home">Suas receitas</h1>
        <p className="splash">Você ainda não criou nenhuma receita.</p>
        <AddBtn
          title={"Criar"}
          onClick={() => navigate("/create-recipe")}
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
      {filteredRecipes.length > 0 ? (
        <ListRecipes recipes={filteredRecipes} />
      ) : (
        <ListRecipes recipes={recipes} />
      )}
      <h1 id="receitasFav" className="tituloFav">
        Receitas favoritas
      </h1>
      <ListRecipes recipes={favoriteRecipes} />
    </div>
  );
};

export default Home;
